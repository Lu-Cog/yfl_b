<template>
	<!-- 分享推广-推广商品 -->
	<view class="page share_goods">
		<view class="page-section">
			<swiper class="swiper" :style="{height:windowHeight+'px'}" circular="true" :indicator-dots="indicatorDots"
				:autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in imgurl" :key='index' @click="checkShow(index)">
					<image class="swiper-item banner" :src="item.pic" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		getMerQrcode
	} from '@/api/api.js'
	export default {
		components: {},
		data() {
			return {
				imgurl: [],
				mer_id: 1734,
				index: '',
				qdd: 0,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				windowHeight: '',
				room_id:''
			}
		},
		onLoad(option) {
			this.mer_id = getApp().globalData.mer_id
			this.room_id = option.room_id?option.room_id:0
			this.getMerQrcode()
		},
		mounted() {
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight;
				}
			});
		},
		methods: {
			checkShow(index) {
				this.index = index
				let imgUrlS = [];
				this.imgurl.forEach(v=>{
					imgUrlS.push(v.pic)
				})
				uni.previewImage({
					urls: imgUrlS,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '识别图中二维码'],
						success: function(res) {
							console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						},
						fail: function(res) {
							console.log(res.errMsg);
						}
					}
				});
			},
			getMerQrcode() {
				let that = this
				let data = {
					room_id : this.room_id,
					type : 'room'
				}
				uni.showLoading({
					mask:true,
					title: '加载中'
				})
				getMerQrcode(that.mer_id, data).then(res => {
					that.imgurl = res.data
					uni.hideLoading();
				})
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>
<style lang="less" scoped>
	.footer {
		position: absolute;
		bottom: 0rpx;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #fff;
		text-align: center;
		box-shadow: 4rpx 0 7rpx 7rpx rgba(0, 0, 0, .13);

		image {
			width: 44rpx;
			height: 44rpx;
			margin-right: 10rpx;
		}

		.left {
			display: flex;
			align-items: center;
			padding: 30rpx 0;
			justify-content: center;
			flex: 1;
			background-color: #fff;
			// border-radius: 40rpx;
			// box-shadow: 0 0 7rpx 7rpx rgba(0, 0, 0, .13);
		}

		.right {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 30rpx 0;
			background-color: #fff;
			flex: 1;
			// border-radius: 40rpx;
			// box-shadow: 0 0 7rpx 7rpx rgba(0, 0, 0, .13);
		}
	}

	.swiper {
		min-height: 100vh
	}

	.page-section {

		.swiper-item {
			z-index: 1;
			height: 100%;
			margin: auto;
			width: 100%;
			display: block;
		}
	}

	.page-bg {
		width: 100%;
		// height: 100%;
		z-index: 1;
	}

	.login-btn {
		font-size: 30rpx;
		font-weight: 500;
		color: #FFFFFF;
		width: 350rpx;
		height: 102rpx;
		background: #1698AE;
		border-radius: 51rpx;
		z-index: 10;
		position: absolute;
		left: 0;
		right: 0;
		top: 60%;
		margin: auto;
	}

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

	.share_goods {
		// padding: 10px 15px;

		.add-btn {
			width: 205.3rpx;
			height: 62rpx;
			position: fixed;
			right: 0;
			bottom: 43rpx;
		}

		.card_block {
			.flex-row {
				padding: 14px 0;
			}

			.banner-img {
				image {
					border-radius: 5px 5px 0px 0px;
					// width: 690rpx;
					height: 290rpx;
				}
			}

			.card_content {
				padding: 10px;
				position: relative;

				.title {}

				.price_block {
					font-size: 24rpx;
					color: #666666;

					.old-price {
						font-size: 30rpx;
						text-decoration: line-through;
						margin-left: 20px;
					}
				}

				.card_right {
					position: absolute;
					right: 26rpx;
					bottom: 55rpx;
					width: 160rpx;
					height: 60rpx;
					background: linear-gradient(0deg, #43C2D7, #1698AE);
					box-shadow: 0px 2rpx 20rpx 0px rgba(118, 224, 241, 0.5);
					border-radius: 30rpx;
					font-size: 30rpx;
					font-weight: bold;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
