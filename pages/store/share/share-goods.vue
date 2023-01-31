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
		<view class="footer" v-if="showImg">
			<!-- <view class="left" @click="keepImg()">
				<image src="../../../static/img/xiangce.png" mode="widthFix"></image>
				保存到相册
			</view> -->
			<view class="right" @click="shareImg()">
				<image src="../../../static/img/wx2.png" mode="widthFix"></image>
				微信分享
			</view>
		</view>
		<!-- <view class="card_block shadow_block" v-for="(item,index) in cardList">
			<view class="banner-img">
				<image :src="item.img" mode="aspectFill"></image>
			</view>
			<view class="card_content flex-bt">
				<view class="card_left"> -->
		<!-- 没有标签的时候 加 no-badge -->
		<!-- <view class="title clamp2">{{item.name}}</view>
					<view class="flex-row flex-bt">
						<view class="price_block flex-center">
							<text class="price">¥{{item.price}}</text><text class="old-price">¥260.00</text>
						</view>
					</view>
				</view> -->
		<!-- @click="goto('/pages/users/share/extend')" -->
		<!-- <button hover-class="none" class="flex-center card_right" type="default"
					@click.stop="listenerActionSheet(1)">立即推广</button>
			</view>
		</view> -->
		<!-- @click="goto('/pages/users/share/index')" -->
		<!-- <image class="add-btn" src="/static/img/share2.png" mode="widthFix" @click.stop="listenerActionSheet(1)"></image>
		<uni-popup ref="popup" type="center">
			<view class="popup_content">
				<image :src="image" mode="widthFix" show-menu-by-longpress @click="previewImage()"></image>
				<image class="del-i" src="http://imgxcx.yifulai.com/del2.png" mode="widthFix"
					@click="listenerActionClose()">
				</image>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	import {
		getAssistList,
		getAssistQrcode
	} from '@/api/store.js'
	import {
		getMerQrcode
	} from '@/api/api.js'
	export default {
		components: {},
		data() {
			return {
				showImg: false,
				cardList: [],
				store_id: 1734,
				image: '',
				imgurl: [],
				mer_id: 1734,
				index: '',
				qdd: 0,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				windowHeight: ''
			}
		},
		onLoad(option) {
			this.mer_id = option.mer_id
			this.qdd = Number(option.qdd)?option.qdd:0
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
				// this.showImg = !this.showImg
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
			shareImg() {
				let that = this
				let imgUrlS = [];
				this.imgurl.forEach(v => {
					imgUrlS.push(v.pic)
				})
				setTimeout(function(){
					uni.showToast({
						title: '长按发送给朋友',
						icon: 'none'
					})
				},1000)
				uni.previewImage({
					urls: imgUrlS,
				})
			},
			keepImg() {
				let that = this
				uni.downloadFile({
					url: that.imgurl[that.index].pic,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							});
						} else {
							uni.showToast({
								title: "保存失败，请稍后重试",
								icon: "none"
							});
						}
					},
					fail: (res) => {
						uni.showToast({
							title: res,
							icon: 'none'
						})
					}

				})
			},
			getMerQrcode() {
				let that = this
				let data = {
					type: 'routine',
					qdd: this.qdd
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
			listenerActionSheet: function(id) {
				if (this.isLogin === false) {
					// #ifdef H5 || APP-PLUS
					toLogin();
					// #endif
					// #ifdef MP
					this.$set(this, 'isAuto', true);
					this.$set(this, 'isShowAuth', true);
					// #endif
				} else {
					getAssistQrcode(this.store_id, id).then(res => {
						this.image = res.data.url
						this.$refs.popup.open()
					}).catch(res => {
						uni.showToast({
							title: res,
							icon: 'none',
						})
					})


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
