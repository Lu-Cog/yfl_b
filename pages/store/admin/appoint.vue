<template>
	<!-- 管理功能-预约管理 -->
	<view class="page admin_appoint  tabs_body">
		<view class="tab_body flex-bt">
			<view class="tab_item flex-center" @click="changetabs(0)" :class="{active:active==0}">全部</view>
			<view class="tab_item flex-center" @click="changetabs(1)" :class="{active:active==1}">待确认</view>
			<view class="tab_item flex-center" @click="changetabs(2)" :class="{active:active==2}">待核销</view>
			<view class="tab_item flex-center" @click="changetabs(4)" :class="{active:active==4}">已完成</view>
		</view>
		<view class="content_body">
			<view class="content_list customer_list">
				<view class="no" v-if="yuYList.length==0">
					暂无预约
				</view>
				<view v-else class="list_item" v-for="(item,index) in yuYList" :key="index">
					<view class="flex-bt">
						<image class="item_user" :src="item.user_img" mode="aspectFill"></image>
						<view class="item_mid flex-center">
							<text class="name clamp">{{item.store_name}}</text>
							<text class="phone">定金：{{item.yy_price}}</text>
							<text class="phone">项目金额：{{item.price}}</text>
							<text class="content clamp">{{item.name}}</text>
							<text class="phone">手机：{{item.phone}}</text>
							<text class="phone">预约：{{item.yydate}}</text>
						</view>
						<image class="item_call" src="/static/img/cus_call.png" mode="" @click="call(item.phone)">
						</image>
					</view>
					<view class="hr" style="width: 100%;"></view>
					<view class="flex-around">
						<view class='stip' style="flex: 1;">
							{{item.status_tip}}
						</view>
						<view class="button_block flex-center">
							<button v-if="item.show_price==1" hover-class="none" class="flex-center"
								@click="open(item.order_id)">改价</button>
							<button v-if="item.show_act==1" hover-class="none" class="flex-center"
								@click="check(item.order_id,0)">不同意</button>
							<button v-if="item.show_act==1" hover-class="none" class="flex-center yes"
								@click="check(item.order_id,1)">同意</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popup_content">
				<view class="title">修改价格</view>
				<input type="text" v-model="newPrice" placeholder="输入新价格（元）" />
				<textarea v-model="price_note" placeholder="输入备注信息" />
				<button hover-class="none" type="default" class="flex-center" @click="close()">确认</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getYuAdList,
		getYuAdAct,
		getUpdatePrice,
		adminOrderAct
	} from '@/api/store.js'
	import mynull from "../../../components/my-components/mynull.vue"
	export default {
		components: {
			mynull
		},
		data() {
			return {
				active: 0,
				yuYList: [],
				mer_id: '',
				newPrice: '',
				price_note: '',
				order_id:'',
				page:1,
				count:''
			}
		},
		onLoad() {
			this.mer_id = getApp().globalData.mer_id
			this.getYuAdList()

		},
		mounted() {

		},
		onReachBottom() {
			this.getYuAdList(true)
		},
		methods: {
			open(id) {
				this.order_id = id
				this.$refs.popup.open()
			},
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			check(id,type) {
				let that = this
				let data = {
					type: type,
					sh_note: ''
				}
				adminOrderAct(this.mer_id, id,data).then(res => {
					that.getYuAdList()
					uni.showToast({
						title: '操作成功',
						icon: 'none'
					})
				}).catch(res=>{
					uni.showToast({
						title: res,
						icon: 'none'
					})
				})
			},
			getYuAdList(isClear) {
				if(!isClear){
					this.yuYList = []
					this.page=1
				}
				let that = this
				let data = {
					status: this.active,
					page: this.page,
					limit: 10
				}
				getYuAdList(this.mer_id, data).then(res => {
					let yuYList = this.yuYList
					let list=[]
					this.count = res.data.list.length
					if(this.count!=0){
						list=yuYList.concat(res.data.list)
						that.$set(that, 'yuYList', list);
						that.page++
					}else{
						uni.showToast({
							title: '没有内容了',
							icon:'none',
							duration: 1000
						});
					}
				})
			},
			changetabs(active) {
				this.active = active;
				this.getYuAdList()
			},
			close() {
				let mer_id = getApp().globalData.mer_id
				let data = {
					order_id : this.order_id,
					price: this.newPrice,
					price_note: this.price_note
				}
				getUpdatePrice(mer_id, data).then(res => {
					this.getYuAdList()
					uni.showToast({
						title: '修改成功',
						icon: 'none'
					})
					this.$refs.popup.close()
				}).catch(res => {
					uni.showToast({
						title: '修改失败',
						icon: 'none'
					})
					this.$refs.popup.close()
				})

			}
		}
	}
</script>

<style lang="less" scoped>
	.stip {
		flex: 1;
		font-size: 12px;
		font-weight: 500;
		color: #999999;
	}

	.popup_content {
		padding: 63rpx 76rpx;

		.title {
			text-align: center;
			font-size: 36rpx;
			font-weight: 500;
			color: #1698AE;
			margin-bottom: 55rpx;
		}

		input {
			width: 357rpx;
			height: 75rpx;
			border: 1px solid #BFBFBF;
			font-size: 28rpx;
			font-weight: 500;
			color: #B2B2B2;
			padding: 0 16rpx;
			margin-bottom: 25px;
		}

		textarea {
			width: 528rpx;
			height: 148rpx;
			border: 1px solid #BFBFBF;
			font-size: 28rpx;
			font-weight: 500;
			color: #B2B2B2;
			padding: 0 16rpx;
		}

		button {
			width: 269rpx;
			height: 74rpx;
			margin: auto;
			margin-top: 30px;
			background: #1698AE;
			border-radius: 10rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
		}
	}

	.no {
		text-align: center;
		color: #999;
		margin-top: 100rpx;
	}

	.admin_appoint {
		.tab_body {
			top: 0
		}

		.content_body {
			margin-top: 10px;

			.list_item {
				box-shadow: 0px 5px/2 6px/2 0px rgba(193, 227, 255, 0.24);
				padding-top: 35px/2;
				padding-bottom: 15px/2;
			}

			.content {
				margin: 8px 0 0 0;
			}

			.phone {
				margin: 0;
			}
		}

		.hr {
			margin: 32px/2 0 19px/2;
		}

		.button_block {
			button {
				width: 60px;
			}
		}
	}
</style>
