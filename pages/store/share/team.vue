<template>
	<!-- 分享推广-我的团队 -->
	<view class="page admin_team">
		<view class="top_body">
			<myhead :title="'我的团队'"></myhead>
			<navigator  url="./list?type=1" class="top_content flex-center">
				<view class="title">{{spreadListTj.order_count}}</view>
				<view class="subtitle">{{spreadListTj.tip_order_count}}（元）</view>
			</navigator>
			<view class="changeitem" @click="changetabs()">
				<image src="../../../static/img/qiehuan.png" mode="widthFix"></image>
				<view class="changeName">
					{{active?text[0]:text[1]}}
				</view>
			</view>
			<navigator class="changeitemH" url="/pages/store/partner/partner">
				<image src="../../../static/img/hhrw.png" mode="widthFix"></image>
				<view class="changeName">
					合伙人
				</view>
			</navigator>
			<view class="tab_body flex-bt" style="top: 0;" v-if="active">
				<!-- <view class="tab_item flex-center" @click="changetabs(1)" :class="{active:active==1}">
					<image :src="active==1?'/static/img/kehu_s.png':'/static/img/kehu.png'" mode="aspectFill"></image>推荐的客户
				</view> -->
				<view class="left tab_item flex-center" @click="spreadPeople(0)">
					<image src="/static/images/shou.png" mode="widthFix"></image>
					一级
				</view>
				<view class="tab_item flex-center">
					<image src="/static/img/kehu_s.png" mode="aspectFill"></image>
					我的客户
				</view>
				<view class="right tab_item flex-center" @click="spreadPeople(last_look_id)">
					<image src="../../../static/images/shang.png" mode="widthFix"></image>
					上一级
				</view>
			</view>
			<view class="tab_body flex-bt" style="top: 0;justify-content: center;" v-else>
				<view class="tab_item flex-center">
					<image src='/static/img/huangguan_s.png' mode="aspectFill"></image>推荐的店铺
				</view>

			</view>

		</view>
		<view class="tabs_body2">
			<view class="content_body">
				<view class="customer_list" v-if="active">
					<view v-if="cardList.length!=0">
						<view class="list_item flex-bt" v-for="(item,index) in cardList" :key="index"
							@click="spreadPeople(item.uid,item.son_num)">
							<image class="item_user" :src="item.avatar?item.avatar:image" mode="aspectFill"></image>
							<view class="item_mid flex-center">
								<view class="name clamp">
									<text style="white-space: nowrap;max-width: 100px;overflow: auto;text-overflow: ellipsis;">
									{{item.nickname!=null?item.nickname:'暂未设置'}}
									</text>
									<text v-if="item.son_num!=0" class="name_team">团队({{item.son_num}}人)</text>
								</view>
								<text class="phone">{{item.phone_star}}</text>
								<text class="grade">注册：{{item.spread_time}}</text>
								<text class="grade">总业绩：{{item.order_count}}</text>
								<text class="grade">总佣金：{{item.promoter_count}}</text>
								<text class="name_team" @click.stop="lookYj(item.uid)">查看业绩</text>
							</view>
							<image class="item_hhr"
								:src="item.is_promoter==1?'/static/img/hhr.png':'/static/img/hhrh.png'" mode="widthFix"
								@click.stop="setHhr(item.uid,item.rate_product,item.rate_project,item.qdd_num)"></image>
							<image class="item_call" src="/static/img/bohao.png" mode=""
								@click.stop="phoneCall(item.phone)"></image>
						</view>
					</view>
					<view v-else style="text-align: center; margin-top: 100rpx; color: rgb(153, 153, 153);">
						<text>暂无用户</text>
					</view>
				</view>

				<view class="customer_list" v-else>
					<view v-if="cardList2.length!=0">
						<view class="list_item flex-bt" v-for="(item,index) in cardList2" :key="index">
							<image class="item_user" :src="item.avatar?item.avatar:image" mode="aspectFill"></image>
							<view class="item_mid flex-center">
								<text class="name clamp">{{item.nickname!=null?item.nickname:'暂未设置'}}</text>
								<text class="phone">{{item.phone_star}}</text>
								<text class="grade">注册：{{item.spread_time}}</text>
							</view>
							<image class="item_call" src="/static/img/cus_call.png" mode=""
								@click="phoneCall(item.phone)"></image>
						</view>
					</view>
					<view v-else style="text-align: center; margin-top: 100rpx; color: rgb(153, 153, 153);">
						<text>暂无店铺</text>
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import myhead from "../../../components/my-components/myhead.vue"
	// import mynull from "../../../components/my-components/mynull.vue"
	import {
		spreadPeople,
		setPromoter,
		getSpreadListTj
	} from '@/api/user.js';
	export default {
		components: {
			myhead
		},
		data() {
			return {
				title: '',
				active: true,
				cardList: [],
				cardList2: [],
				page: 1,
				page2: 1,
				limit: 10,
				retCount: 0,
				brokerage_price: {},
				image: '',
				last_look_id: 0,
				cur_look_id: '',
				length: 0,
				text: ['店铺', '客户'],
				spreadListTj:''
			}
		},
		mounted() {},
		onLoad(options) {
			console.log(options.brokerage_price);
			this.brokerage_price = options.brokerage_price
			this.image = this.$image
			console.log(this.$image);
		},
		onShow() {
			this.clearList()
			this.spreadPeople()
			this.getSpreadListTj()
		},
		onReachBottom: function() {
			console.log("-----到底了-----");
			this.spreadPeople(this.cur_look_id);
		},
		methods: {
			getSpreadListTj(){
				let data={
					pintai:2
				}
				getSpreadListTj(data).then(res=>{
					this.spreadListTj = res.data
				})
			},
			lookYj(uid){
				uni.navigateTo({
					url:"./list?type=2&uid="+uid
				})
			},
			setHhr(uid,pd,pj,num) {
				let that = this
				uni.navigateTo({
					url:'/pages/store/commission/commission?uid='+uid+'&rate_product='+pd+'&rate_project='+pj+'&qdd_num='+num
				})
				// let content = type == 1 ? '是否取消合伙人？' : '是否设置为合伙人？'
				// uni.showModal({
				// 	title: '提示',
				// 	content: content,
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			let _type;
				// 			if (type == 1) {
				// 				_type = 0
				// 			} else if (type == 0) {
				// 				_type = 1
				// 			}
				// 			setPromoter({
				// 				uid: uid,
				// 				type: _type
				// 			}).then(res => {
				// 				uni.showToast({
				// 					title: '设置成功',
				// 					icon: 'none'
				// 				})
				// 				that.clearList();
				// 			}).catch(res => {
				// 				uni.showToast({
				// 					title: '设置失败',
				// 					icon: 'none'
				// 				})
				// 			})
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
			},
			phoneCall(tel) {
				if (!tel) {
					uni.showToast({
						title: '用户暂未绑定手机',
						icon: 'none',
						duration: 1000
					});
					return;
				}
				uni.makePhoneCall({
					phoneNumber: tel //仅为示例
				});
			},
			changetabs() {
				this.active = !this.active;
				this.clearList()
				this.spreadPeople()
			},
			clearList(){
				this.cardList = []
				this.length = 0
				this.cardList2 = []
				this.page = 1
				this.page2 = 1
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			
			spreadPeople(id,num) {
				console.log(num);
				if(num!=undefined && num<=0){
					return
				}
				let that = this
				let ids = id ? id : 0
				if (ids == that.cur_look_id) {
					if (that.length != 0) {
						that.page += 1
					} else {
						that.page = that.page
					}
				} else {
					that.page = 1
				}
				let type = this.active ? 1 : 2
				let page = type == 1 ? this.page : this.page2
				let parm = {
					"pintai":2,
					"page": page,
					"limit": this.limit,
					"type": type,
					"look_id": ids
				}
				spreadPeople(parm).then(res => {
					let listNew = [];
					let retCount = res.data.count; //获取总数
					that.last_look_id = res.data.last_look_id;
					that.length = res.data.list.length
					if (that.length > 0) {
						if (parm.type == 1) {
							if (parm.look_id == that.cur_look_id) {
								listNew = that.cardList.concat(res.data.list);
								that.$set(that, 'cardList', listNew);
								// that.page++
							} else {
								listNew = res.data.list;
								that.$set(that, 'cardList', listNew);
								that.cur_look_id = ids;
								// that.page++
							}
						} else {
							listNew = that.cardList2.concat(res.data.list);
							that.$set(that, 'cardList2', listNew);
							that.page2++;
						}

					} else {
						uni.showToast({
							title: '没有内容了',
							icon: 'none',
							duration: 1000
						});
					}

				})
			},
			// 跳转拼团详情页
			toItem(id) {
				uni.navigateTo({
					url: '/pages/users/help/order-item?id=' + id
				});
			}
		}
	}
</script>


<style lang="less" scoped>
	.customer_list .list_item {
		padding-right: 5px;
	}
	.customer_list .list_item .item_mid{
		width: 178rpx;
	}
	.customer_list .list_item .item_call{
		width: 35px;
		height: 35px;
	}
	.item_hhr {
		width: 40px;
		height: 40px;
		margin: 0 10rpx 0 0;
	}

	.changeitem {
		position: absolute;
		top: 200rpx;
		right: 50rpx;
		color: #fff;
		display: flex;
		font-size: 22rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.changeitemH {
		position: absolute;
		top: 200rpx;
		left: 50rpx;
		color: #fff;
		display: flex;
		font-size: 22rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 60rpx;
			height: 60rpx;
		}
	}

	.name {
		display: flex;
		width: 100%;
		overflow: hidden;
	}

	.name_team {
		background-color: #1698AE;
		color: #fff;
		border-radius: 30rpx;
		font-size: 24rpx;
		padding: 4rpx 10rpx;
		margin-left: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		white-space: nowrap;
	}

	.admin_team {
		.top_body {
			position: relative;
			height: 273px;

			.top_content {
				flex-direction: column;

				.title {
					margin-top: -150px;
					font-size: 65px/2;
					font-weight: bold;
					color: #fff;
					z-index: 10;
				}

				.subtitle {
					margin-top: 16px/2;
					font-size: 28px/2;
					color: #fff;
					z-index: 10;

				}

				.users_list {
					z-index: 10;

					image {
						width: 54px/2;
						height: 54px/2;
						margin: 0 15px/2;
						border-radius: 50%;
					}
				}

				.number {
					z-index: 10;
					margin-top: 13px;
					font-size: 24px/2;
					color: #FFFFFF;
				}
			}

			.tab_body {
				background: #FFFFFF;
				box-shadow: 0px 5px/2 6px/2 0px rgba(193, 227, 255, 0.24);
				border-radius: 10px/2;
				width: 690px/2;
				height: 170px/2;
				position: absolute;
				left: 0;
				right: 0;
				margin: 0 auto;
				margin-top: 177px;

				.tab_item {
					width: 50%;
					flex-direction: column;
					font-size: 30px/2;
					font-weight: 500;
					color: #333333;

					image {
						width: 50px/2;
						height: 46px/2;
						margin-bottom: 17px/2;
					}

					&.active {
						color: #1698AE;
					}
				}

				.left,
				.right {
					font-size: 24rpx;

					image {
						width: 40rpx;
					}
				}
			}

		}

		.tabs_body2 {
			.content_body {
				padding: 0 15px;

				.grade {
					margin-bottom: 5px;
					.red {
						color: #FF2D2D;
					}
				}
			}
		}

	}
</style>
