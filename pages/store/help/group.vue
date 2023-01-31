<template>
	<!-- 助力活动-助力拼团 -->
	<view class="page help_group">
		<view class="top_body">
			<myhead :title="'抢多多'" :imgSrc="'http://imgxcx.yifulai.com/help-bg.jpg'"></myhead>
			<view class="top_content flex-center">
				<view class="title">{{tip.title}}</view>
				<view class="subtitle">{{tip.desc}}</view>
				<view class="fixed_bolck flex-center" @click="goto('/pages/points-mall/rule')">规则</view>
			</view>
		</view>
		<view class="tabs_body">
			<!-- <view class="tab_body flex-bt" style="top: 0;">
				<view class="tab_item flex-center" @click="changetabs(1)" :class="{active:active==1}">分享给客户</view>
				<view class="tab_item flex-center" @click="changetabs(2)" :class="{active:active==2}">我的抢多多</view>
				<view class="tab_item flex-center" @click="changetabs(3)" :class="{active:active==3}">抢多多订单</view>
			</view> -->
			<view class="content_body">
				<view class="no" v-if="cardList.length == 0">
					暂无抢多多活动
				</view>
				<view class="content_list" v-else>
					<!-- <mynull :imgSrc="'/static/img/null.png'" :text="'暂无消息'" v-if="contentList==''"></mynull> -->
					<view class="card_block" v-for="(item,index) in cardList" :key='index' @click="goInfo(item.product_assist_id)">
						<view class="banner-img">
							<image :src="item.img" mode="widthFix"></image>
							<view class="mask_box flex-center" v-if="item.status === 2">
								<text>抢光了</text>
							</view>
						</view>
						<view class="card_content">
							<view class="title clamp2">{{item.title}}</view>
							<view class="flex-row flex-bt">
								<view class="price_block">
									<text class="price">当前已分配 <text>{{item.group_total}}</text> 个团，<text>{{item.group_user}}</text>人成团</text>
									<text class="badge">已开团 <text>{{item.group_num}}</text> 个，还可分享
										<text>{{item.group_total-item.group_num}}</text> 个</text>
									<text class="badge">已成团 <text>{{item.group_num_ok}}</text> 个，拼团成功
										<text>{{item.group_user_ok}}</text> 人</text>
								</view>
								<!-- 按钮状态 抢光了：no  去拼团:'' -->
								<view class="right">
									<button hover-class="none" class="flex-center"
										@click.stop="listenerActionSheet(item.product_assist_id,item.status)"
										:class="item.status === 2?'no':''">{{item.status === 2?'抢光了':'去分享'}}</button>
								</view>

							</view>

						</view>
					</view>
				</view>
			</view>

		</view>
		<uni-popup ref="popup" type="center">
			<view class="popup_content">
				<image :src="image" mode="widthFix" show-menu-by-longpress @click="previewImage()"></image>
				<image class="del-i" src="http://imgxcx.yifulai.com/del2.png" mode="widthFix"
					@click="listenerActionClose()">
				</image>
			</view>
		</uni-popup>
		<!-- 分享按钮 -->
		<!-- <view class="generate-posters acea-row row-middle" :class="posters ? 'on' : ''">
			
			<button class="item" hover-class='none' @click="goPoster">
				<view class="iconfont icon-haibao"></view>
				<view class="">生成海报</view>
			</button>
		</view> -->
		<!-- <view class="mask" v-if="posters" @click="listenerActionClose"></view> -->


	</view>
</template>

<script>
	import {
		getAssistList,
		getAssistQrcode
	} from '@/api/store.js'
	import myhead from "../../../components/my-components/myhead2.vue"
	// import mynull from "../../../components/my-components/mynull.vue"
	export default {
		components: {
			myhead
		},
		data() {
			return {
				posters: false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				title: '',
				imgSrc: '',
				active: 1,
				cardList: [],
				store_id: 0,
				page: 1,
				limit: 10,
				image: '',
				tip:''
			}
		},
		onLoad(option) {
			this.store_id = option.store_id
		},
		onShow() {
			this.getAssistList()
		},
		mounted() {},
		methods: {
			goInfo(id){
				uni.navigateTo({
					url:'/pages/store/help/groupInfo?id='+id
				})
			},
			previewImage() {
				uni.previewImage({
					urls: [this.image],
					longPressActions: {
						itemList: ['保存图片'],
						success: function(data) {
							//data.tapIndex按钮下标 ，data.index图片下标
							if (data.tapIndex == 0) {
								uni.saveImageToPhotosAlbum({
									filePath: this.image,
									success: function() {
										uni.showToast({
											title: '保存成功'
										})
									}
								});
							}
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				})
			},
			getAssistList() {
				let data = {
					"page": this.page,
					'limit': this.limit,
					"store_id": this.store_id
				}
				getAssistList(data).then(res => {
					this.cardList = res.data.list
					this.tip = res.data.tip
				})
			},
			changetabs(active) {
				this.active = active;
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},

			// 跳转拼团详情页
			toItem(id) {
				// uni.navigateTo({
				// 	url: '/pages/store/help/order-item?id=' + id
				// });
			},
			listenerActionSheet: function(id, status) {
				if (this.isLogin === false) {
					// #ifdef H5 || APP-PLUS
					toLogin();
					// #endif
					// #ifdef MP
					this.$set(this, 'isAuto', true);
					this.$set(this, 'isShowAuth', true);
					// #endif
				} else if (status != 2) {
					uni.navigateTo({
						// url:'/pages/store/share/share-goods?id='+id
						url: '/pages/store/share/share-goods?mer_id=' + this.store_id+'&qdd='+id
					})
					// getAssistQrcode(this.store_id, id).then(res => {
					// 	this.image = res.data.url
					// 	this.$refs.popup.open()
					// }).catch(res => {
					// 	uni.showToast({
					// 		title: res,
					// 		icon: 'none',
					// 	})
					// })
				} else {
					return
				}
			},
			// 分享关闭
			listenerActionClose: function() {
				this.$refs.popup.close()
			},


		}
	}
</script>

<style lang="less" scoped>
	.help_group {
		.popup_content {
			width: 490rpx;
			// height: 531rpx;
			padding: 0;
			border-radius: 0;
			background: none;
			position: relative;

			image {
				width: 100%;
			}

			.del-i {
				position: absolute;
				bottom: -90rpx;
				left: 0;
				right: 0;
				margin: auto;
				width: 48rpx;
				height: 48rpx !important;
			}
		}

		.top_body {
			height: 200px;

			/deep/ .header-bg {
				height: 200px;
			}

			.top_content {
				flex-direction: column;

				.title {
					margin-top: 200px/2;
					font-size: 68px/2;
					font-family: AliHYAiHei-Beta;
					color: #FFFFFF;
					text-shadow: 0px 6px 6px rgba(99, 216, 235, 0.46);
					z-index: 10;
				}

				.subtitle {
					margin: 20px/2 auto 30px/2;
					font-size: 36px/2;
					font-weight: bold;
					color: #FFFFFF;
					text-shadow: 0px 6px 6px rgba(99, 216, 235, 0.46);
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

				.fixed_bolck {
					position: absolute;
					top: 138rpx;
					right: 0;
					width: 135rpx;
					height: 57rpx;
					background: linear-gradient(76deg, rgba(123, 220, 235, 0.22) 0%, rgba(255, 255, 255, 0.22) 100%);
					// opacity: 0.22/2;
					border-radius: 100rpx*2 0rpx*2 0rpx*2 100rpx*2;
					font-size: 12rpx*2;
					font-weight: bold;
					color: #FFFFFF;
					z-index: 10;
				}
			}
		}

		.tabs_body {
			.content_body {
				padding: 21px/2;

				.no {
					text-align: center;
					margin-top: 100rpx;
				}

				.flex-row {
					padding: 10px 0 25px;
				}

				.title {
					height: auto;
				}
			}

			.right {
				button {
					height: 25px;
					margin-bottom: 20rpx;
				}
			}

			.price_block {
				display: flex;
				flex-direction: column;



				.price {
					font-size: 26rpx;
					color: #333;

					text {
						color: #FF002B;
					}
				}

				.badge {
					margin-top: 10rpx;
					display: inline-block;
					height: 18px;
					padding: 0;
					background: #FFF;
					border-radius: 9px;
					font-size: 26rpx;
					font-weight: bold;
					color: #333;
					line-height: 18px;

					text {
						color: #FF002B;
					}
				}
			}
		}

		.generate-posters {
			width: 100%;
			height: 170rpx;
			background-color: #fff;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 388;
			transform: translate3d(0, 100%, 0);
			transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
			border-top: 1rpx solid #eee;
		}

		.generate-posters.on {
			transform: translate3d(0, 0, 0);
		}

		.generate-posters .item {
			flex: 50%;
			text-align: center;
			font-size: 30rpx;
		}

		.generate-posters .item .iconfont {
			font-size: 80rpx;
			color: #5eae72;
		}

		.generate-posters .item .iconfont.icon-haibao {
			color: #5391f1;
		}

		.poster-pop {
			width: 450rpx;
			height: 714rpx;
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			z-index: 399;
			top: 50%;
			margin-top: -357rpx;
		}

		.poster-pop image {
			width: 100%;
			height: 100%;
			display: block;
		}

		.poster-pop .close {
			width: 46rpx;
			height: 75rpx;
			position: fixed;
			right: 0;
			top: -73rpx;
			display: block;
		}

		.poster-pop .save-poster {
			background-color: #df2d0a;
			font-size: ：22rpx;
			color: #fff;
			text-align: center;
			height: 76rpx;
			line-height: 76rpx;
			width: 100%;
		}

		.poster-pop .keep {
			color: #fff;
			text-align: center;
			font-size: 25rpx;
			margin-top: 10rpx;
		}

		.mask {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.6);
			z-index: 300 !important;
		}

		.canvas {
			z-index: 300;
			width: 750px;
			height: 1190px;
		}

		.share-box {
			z-index: 1000;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
