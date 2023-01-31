<template>
	<!-- 进货-确认下单 -->
	<view class="page purchase_confirm-order">
		<uni-list class="top_body flex-center">
			<uni-list-item link to="">
				<template slot="header">
					<view class="header flex-bt">
						<view class="flex-row">
							<text class="badge">默认</text>湖南省长沙市岳麓区，麓谷企业广场F4栋3楼
						</view>
						<view class="flex-row">
							肖先生&nbsp;&nbsp;&nbsp;&nbsp;155****4795
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>

		<view class="order_list">
			<view class="order_block">
				<view class="order_mid hr_shadow">
					<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
					<view class="order_content">
						<view class="name clamp">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
						<view class="price">¥160.00</view>
					</view>
					<text class="number">x3</text>
				</view>
				<view class="order_mid hr_shadow">
					<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
					<view class="order_content">
						<view class="name clamp">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
						<view class="price">¥160.00</view>
					</view>
					<text class="number">x3</text>
				</view>
			</view>

		</view>

		<uni-list class="list_block">
			<uni-list-item title="配送方式" link to="">
				<template slot="footer">
					<view class="flex-center">
						<image src="/static/img/s.png" mode="widthFix"></image><text>快递配送</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item title="优惠券" link to="">
				<template slot="footer">
					<text class="org">满￥30减￥5</text>
				</template>
			</uni-list-item>
		</uni-list>

		<view class="block">
			<view class="flex-bt">
				<text>商品总价</text><text>￥53.60</text>
			</view>
			<view class="flex-bt">
				<text>运费</text><text>￥0.0</text>
			</view>
			<view class="flex-bt">
				<text>订单总价</text><text>￥53.60</text>
			</view>
		</view>
		<view class="dow_block flex-bt">
			<view class="price_block flex-center">
				<view class="price"><text>￥</text>48.6</view>共节约了 30.15 元
			</view>
			<button type="default" class="flex-center" hover-class="none"  @click="goto('/pages/form/cashier')">提交订单</button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数

		},
		data() {
			return {}
		},
		mounted() {},
		methods: {
			goto(url) {
			                uni.navigateTo({
			                    url:url
			                })
			            }
		}
	}
</script>

<style lang="less" scoped>
	.purchase_confirm-order {
		padding-bottom: 60px;
		.top_body {
			height: 163px/2;

			.header {
				flex-direction: column;
				align-items: flex-start;

				.flex-row {
					font-size: 28px/2;
					font-weight: 500;
					color: #000000;
					margin-bottom: 24px/2;

					&:last-child {
						margin-bottom: 0;
						font-size: 24px/2;
					}
				}

				.badge {
					width: 68px/2;
					height: 36px/2;
					line-height: 36px/2;
					background: #1698AE;
					border-radius: 18px/2;
					font-size: 24px/2;
					font-weight: 500;
					color: #FFFFFF;
					margin-right: 7px/2;
				}
			}
		}

		.order_list {
			margin-top: 10px;

			.order_block {
				padding-top: 0;
				padding-bottom: 0;

				.order_mid {
					margin-top: 0;
					padding: 33px/2 0;

					.price {
						margin-top: 37px/2;
						font-size: 36px/2;
						font-weight: bold;
						color: #FF3535;
					}

					.name {
						height: 28px/2;
						font-size: 28px/2;
						font-weight: bold;
						color: #333333;
						margin-top: 8px;
					}

					.number {
						bottom: 52px/2;
					}
				}
			}
		}

		.list_block {
			image {
				width: 12px;
				height: 12px;
				margin-right: 8px;
			}

			text {
				font-size: 24px/2;
				font-weight: 500;
				color: #999999;
			}

			.org {
				font-size: 24px/2;
				font-weight: 500;
				color: #FF643A;
			}
		}

		.block {
			padding: 45px/2 39px/2;
			background: #fff;
			margin-top: 10px;

			.flex-bt {
				margin-bottom: 38px/2;

				&:last-child {
					margin-bottom: 0;
				}

				text {
					font-size: 28px/2;
					font-weight: 500;
					color: #333333;
				}
			}
		}

		.dow_block {
			height: 109px/2;
			background: #FFFFFF;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;

			.price_block {
				padding-left: 46px/2;
				font-size: 24px/2;
				font-weight: 500;
				color: #333333;

				.price {
					font-size: 50px/2;
					font-weight: bold;
					color: #FF002B;
					margin-right: 52px/2;

					text {
						font-size: 24px/2;
					}
				}
			}

			button {
				width: 270px/2;
				height: 100%;
				background: #1698AE;
				font-size: 30px/2;
				font-weight: 500;
				color: #FFFFFF;
				border-radius: 0;
			}
		}
	}
</style>
