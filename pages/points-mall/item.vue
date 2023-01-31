<template>
	<!-- 积分商城-积分商品详情 -->
	<view class="page points-mall_item">
		<image class="banner" src="http://imgxcx.yifulai.com/index_banner.jpg" mode="widthFix"></image>
		<view class="block top_block">
			<view class="price">1500<text>积分</text></view>
			<view class="title clamp2">翌芙莱正品芦荟胶破皮止痒多效活性益 肤凝胶益肤膏</view>
			<text class="times">每人限购兑换2次</text>
		</view>
		
		<view class="block rich_body">
			<view class="title">商品详情</view>
			<image src="/static/img/rich.png" mode="widthFix"></image>
		</view>
		<view class="fiexd_botton flex-bt">
			<view class="left">
				<view class="zhifu">
					支付：<text class="red">1500</text><text class="ccc">积分</text>
				</view>
				<view class="all">您的总积分：3524积分</view>
			</view>
			<button hover-class="none" type="default" class="btn flex-center" @click="open">立即兑换</button>
		</view>
			<uni-popup ref="popup" type="center">
				<view class="popup_content">
					<image src="/static/img/tk2.png" mode="widthFix"></image>
					<view class="text_block flex-center">
						<text class="min_title">系统提示</text>
						<text class="title">是否确认兑换？</text>
						<view class="content">当前账户剩余<text class="red">3524</text>积分</view>
						<view class="button_block flex-center">
							<button hover-class="none" type="default" class="flex-center" @click="close()">再等等</button>
							<button hover-class="none" type="default" class="flex-center yes" @click="submint(),close()">立即兑换</button>
						</view>
					</view>
					<image class="del-i" src="/static/img/del2.png" mode="widthFix" @click="close()"></image>
				</view>
			</uni-popup>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {}
		},
		mounted() {

		},

		methods: {
			submint() {
				uni.showToast({
					title: '兑换成功',
					icon: 'none',
					duration: 2000
				});
			},
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			}
		},
	}
</script>

<style lang="less" scoped>
	.points-mall_item {
		.banner {
			width: 100%;
		}

		.block {
			background: #FFFFFF;
			padding: 20px 22px;
		}

		.top_block {
			position: relative;

			.price {
				font-size: 52px/2;
				font-weight: 500;
				color: #FF2A2A;

				text {
					font-size: 12px;
					color: #999999;
				}
			}

			.title {
				height: 48px;
				font-size: 30px/2;
				font-weight: 500;
				color: #000000;
				line-height: 48px/2;
				margin-top: 10px;
			}

			.times {
				font-size: 12px;
				color: #999999;
				position: absolute;
				right: 30px/2;
				top: 37px/2;
			}
		}

		.mid_block {
			margin: 10px 0;

			.title {
				font-size: 15px;
				font-weight: 500;
				color: #000000;
				margin-bottom: 10px;
			}

			.content {
				font-size: 12px;
				color: #999999;
			}
		}

		.rich_body {
			margin-top: 20rpx;
			.title {
				font-size: 15px;
				font-weight: 500;
				color: #000000;
				text-align: center;
				position: relative;
				width: 130px;
				margin: auto;
				margin-bottom: 24px;

				&::after,
				&::before {
					content: ' ';
					position: absolute;
					top: 0;
					bottom: 0;
					margin: auto;
					width: 25px;
					height: 1px;
					background: #BFBFBF;
				}

				&::after {
					right: 0;
				}

				&::before {
					left: 0;
				}
			}
		}

		.fiexd_botton {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 108px/2;
			background: #fff;

			.left {
				padding-left: 32px/2;

				.zhifu {
					font-size: 15px;
					font-weight: bold;
					color: #333333;

					.red {
						color: #FF2C2C;
						margin-left: 5px;
					}

					.ccc {
						color: #ccc;
						font-size: 12px;
					}
				}

				.all {
					font-size: 12px;
					color: #1698AE;
				}
			}

			.btn {
				flex-basis: 327px/2;
				flex-grow: 0;
				flex-shrink: 0;
				height: 100%;
				background: #1698AE;
				font-size: 18px;
				font-weight: 500;
				color: #FFFFFF;
				border-radius: 0;
			}
		}

		.popup_content {
					width: 490px/2;
					// height: 531px/2;
					padding: 0;
					border-radius: 0;
					background: none;
		
					position: relative;
		
					image {
						// position: absolute;
						// left: 0;
						// top: 0;
						width: 100%;
						height: 531px/2;
					}
		
					.text_block {
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						flex-direction: column;
						justify-content: flex-start;
		
						.min_title {
							font-size: 12px;
							font-weight: 500;
							color: #FFFFFF;
							margin-top: 86px/2;
						}
		
						.title {
							font-size: 18px;
							font-weight: bold;
							color: #FFFFFF;
							margin: 8px 0 128px/2;
						}
		
						.content {
							font-size: 14px;
							font-weight: 500;
							color: #666666;
							margin-bottom: 71px/2;
		
							.red {
								color: #FF2A2A;
							}
						}
		
						.button_block {
							button {
								width: 165px/2;
								height: 58px/2;
								border: 1px solid #1698AE;
								border-radius: 5px;
								font-size: 14px;
								font-weight: 500;
								color: #1698AE;
								background: none;
								margin-left: 0;
		
								&.yes {
									background: linear-gradient(-90deg, #1E9FB4, #5ED8ED);
									box-shadow: 0px 3px/2 8px/2 0px rgba(49, 185, 203, 0.46);
									color: #fff;
									border: none;
									margin-left: 85px/2;
								}
							}
						}
		
					}
		
					.del-i {
						position: absolute;
						bottom: -45px;
						left: 0;
						right: 0;
						margin: auto;
						width: 24px;
						height: 24px;
					}
				}
		
		padding-bottom: 108px;
	}
</style>
