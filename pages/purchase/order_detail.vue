<template>
	<!-- 钱包-进货订单-订单详情 -->
	<view class="page help_order">
		<myhead :title="'订单详情'"></myhead>
		<view class="top_body flex-bt">
			<view class="left_block">
				<view class="name">卖家已发货</view>
				<view class="time">还剩9天17时自动确认</view>
			</view>
			<image class="right_block" src="/static/img/car.png" mode="widthFix"></image>
		</view>

		<uni-list class="uni-list">
			<uni-list-item title="查看物流" thumb="/static/img/order.png" thumb-size="sm" link to=""></uni-list-item>
		</uni-list>

		<view class="order-top flex-bt">
			<image class="icon" src="/static/img/dizhi.png" mode="widthFix"></image>
			<view class="right_blcok">
				<view class="name">
					肖先生<text>155****4795</text>
				</view>
				<view class="adress">湖南省长沙市岳麓区，麓谷企业广场F4栋3楼</view>
			</view>
		</view>

		<view class="order_block">
			<view class="order_mid hr_shadow">
				<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
				<view class="order_content">
					<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
					<view class="price">¥160.00</view>
				</view>
				<text class="number">x3</text>
			</view>
			<view class="order_mid hr_shadow">
				<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
				<view class="order_content">
					<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
					<view class="price">¥160.00</view>
				</view>
				<text class="number">x3</text>
			</view>
			<view class="order_list2 hr_shadow">
				<view class="list_item flex-bt">
					<text class="title">商品总价</text>
					<text class="price">￥53.60</text>
				</view>
				<view class="list_item flex-bt">
					<text class="title">运费</text>
					<text class="price">￥53.60</text>
				</view>
				<view class="list_item flex-bt">
					<text class="title">订单总价</text>
					<text class="price">￥53.60</text>
				</view>
			</view>
		</view>



		<view class="order_block order_block2">
			<view class="order_title flex-bt"><text class="left">订单信息</text>
				<view class="right flex-center">
					<image src="/static/img/info.png" mode="widthFix"></image>客服
				</view>
			</view>
			<view class="order_list">
				<view class="list_item flex-bt">
					<text class="left">订单编号</text>
					<view class="right">DJ2482823351<text>复制</text></view>
				</view>
				<view class="list_item flex-bt">
					<text class="left">下单时间</text>
					<view class="right">2020.03.16 14：00</view>
				</view>
				<view class="list_item flex-bt">
					<text class="left">付款时间</text>
					<view class="right">2020.03.16 14：00</view>
				</view>
				<view class="list_item flex-bt">
					<text class="left">拼单时间</text>
					<view class="right">2020.03.16 14：00</view>
				</view>
			</view>
			<view class="button_block flex-bt">
				<button hover-class="none"  type="default" class="flex-center">付款</button>
				<button hover-class="none"  type="default" class="flex-center">申请售后</button>
			</view>
		</view>
	</view>
</template>

<script>
	import myhead from "../../components/my-components/myhead.vue"
	export default {
		components: {
			myhead
		},
		data() {
			return {
				title: '',
				state: 0, //拼单状态 未邀请：0，成功：1，失败2
			}
		},
		mounted() {

		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	page {
		// background-color: #fff;
	}

	.headder_body {
		/deep/.header_bg {
			height: 342px/2 !important;
		}
	}

	.help_order {
		position: relative;

		.top_body {
			position: absolute;
			top: 195px/2;
			left: 0;
			right: 0;
			margin: auto;
			padding-left: 48px/2;
			padding-right: 56px/2;
			z-index: 10;

			.left_block {
				.name {
					font-size: 34px/2;
					font-weight: bold;
					color: #FFFFFF;
				}

				.time {
					font-size: 24px/2;
					color: #FFFFFF;
					margin-top: 10px;
				}
			}

			.right_block {
				width: 97px/2;
				height: 82px/2;
			}
		}

		.uni-list {
			margin-top: 10px;

			.uni-list-item {
				padding: 5px;
			}
		}




		.order-top {
			padding: 37px/2 20px;
			justify-content: flex-start;
			background: #fff;

			.icon {
				width: 20px;
				height: 20px;
			}

			.right_blcok {
				padding-left: 9px;

				.name {
					font-size: 28px/2;
					font-weight: 500;
					color: #000000;

					text {
						font-size: 24px/2;
						margin-left: 25px;
					}
				}
			}
		}

		.order_block {
			padding: 0 40px/2;

			.order_mid {
				padding: 15px 0;
				margin: 0;

				.price {
					margin-top: 37px/2;
				}

				.order-img {
					flex-basis: 128px/2;
					height: 128px/2;
				}

				.number {
					bottom: 15px;
				}
			}

			.order_list2 {
				padding: 54px/2 6px;

				.list_item {
					margin-bottom: 37px/2;

					.title {
						font-size: 28px/2;
						font-weight: 500;
						color: #333333;
					}

					.price {
						font-size: 24px/2;
						font-weight: 500;
						color: #333333;
					}
				}

			}

		}

		.order_block2 {
			padding-top: 24px;
			padding-bottom: 23px/2;

			.order_title {
				position: relative;
				padding-left: 12px;

				&::before {
					content: " ";
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					margin: auto;
					width: 8px/2;
					height: 42px/2;
					background: #1698AE;
				}

				.left {
					font-size: 34px/2;
					font-weight: bold;
					color: #333333;
				}

				.right {
					font-size: 24px/2;
					height: 21px;
					line-height: 21px;
					font-weight: 500;
					color: #666666;

					image {
						width: 18px;
						height: 18px;
						margin-right: 3px;
					}
				}
			}

			.order_list {
				margin-top: 60px/2;
				padding-left: 12px;

				.list_item {
					margin-bottom: 24px;

					.left {
						font-size: 30px/2;
						font-weight: 500;
						color: #333333;
					}

					.right {
						font-size: 28px/2;
						font-weight: 500;
						color: #999999;

						text {
							font-size: 28px/2;
							font-weight: 500;
							color: #EC632C;
							margin-left: 4px;
						}
					}

				}
			}

		}
	}
</style>
