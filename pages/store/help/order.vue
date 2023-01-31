<template>
	<!-- 助力活动-邀请拼单 -->
	<view class="page help_order">
		<myhead :title="'邀请拼单'"></myhead>
		<view class="top_body">
			<view class="users_list flex-center">
				<view class="users_item yes">
					<image src="/static/img/user.jpg" mode="aspectFill"></image>
					<text class="badge flex-center">拼主</text>
				</view>
				<view class="users_item yes">
					<image src="/static/img/user.jpg" mode="aspectFill"></image>
					<text class="badge flex-center">拼主</text>
				</view>
				<view class="users_item yes">
					<image src="/static/img/user.jpg" mode="aspectFill"></image>
					<text class="badge flex-center">拼主</text>
				</view>
				<view class="users_item yes">
					<image src="/static/img/order_w.png" mode="aspectFill"></image>
				</view>
				<view class="users_item yes">
					<image src="/static/img/order_add.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="title" v-if="state===0">
				还差<text>2</text>人，赶快去邀请好友拼单吧～
			</view>
			<view class="title" v-if="state===1">
				拼团成功
			</view>
			<view class="title" v-if="state===2">
				很遗憾还差<text>2</text>人拼团成功
			</view>
			<view class="title2">
				距离结束还剩下<text class="time">24:00:56</text>
			</view>
			<button hover-class="none" class="flex-center" type="default" v-if="state===0">
				<image src="/static/img/wx.png" mode="widthFix"></image> 去邀请
			</button>
			<button hover-class="none" class="flex-center" type="default" v-if="state===1">继续逛</button>
			<button hover-class="none" class="flex-center" type="default" v-if="state===2"></button>
		</view>
		<view class="order_block">
			<text class="order_title">订单信息</text>
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

		</view>
	</view>
</template>

<script>
	import myhead from "../../../components/my-components/myhead.vue"
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
<style>
	page {
		background-color: #fff;
	}
</style>
<style lang="less" scoped>
	page {
		background-color: #fff;
	}

	.headder_body {
		// margin-bottom: 185px;
	}

	.help_order {
		position: relative;

		.top_body {
			position: absolute;
			top: 182px/2;
			left: 0;
			right: 0;
			margin: auto;
			width: 690px/2;
			height: 510px/2;
			background: #FFFFFF;
			box-shadow: 0px 3px/2 32px/2 0px rgba(22, 152, 174, 0.34);
			border-radius: 10px/2;
			z-index: 10;

			.users_list {
				padding-top: 22px;
				padding-bottom: 74px/2;

				.users_item {
					width: 83px/2;
					height: 83px/2;
					border-radius: 50%;
					margin: 0 15px/2;
					position: relative;

					&.yes {
						image {
							width: 83px/2;
							height: 83px/2;
							border-radius: 50%;
						}

						.badge {
							width: 51px/2;
							height: 26px/2;
							background: #1698AE;
							border-radius: 13px/2;
							font-size: 20px/2;
							color: #FFFFFF;
							position: absolute;
							left: 11px/2;
							bottom: -11px/2;
						}
					}

					&.no {
						width: 83px/2;
						height: 83px/2;
						line-height: 83px/2;
						text-align: center;
						background: #F3F3F3;
						border: 2px/2 solid #EAD2A2;
						border-radius: 50%;
						z-index: 1;

						text {
							font-size: 28px/2;
							line-height: normal;
							color: #927979;
						}
					}
				}
			}

			.title {
				text-align: center;
				font-size: 32px/2;
				font-weight: 500;
				color: #000000;
				margin-bottom: 30px/2;

				text {
					color: red;
				}
			}

			.title2 {
				text-align: center;
				font-size: 28px/2;
				font-weight: 500;
				color: #A5A5A5;

				.time {
					color: #1698AE;
					margin-left: 10px;
				}
			}

			button {
				width: 382px/2;
				height: 85px/2;
				margin: auto;
				margin-top: 60px/2;
				background: #1698AE;
				border-radius: 43px/2;

				image {
					width: 43px/2;
					height: 43px/2;
					margin-right: 13px/2;
				}

				font-size: 32px/2;
				font-weight: 500;
				color: #FFFFFF;
			}
		}

		.order_block {
			padding: 0 40px/2;
    margin-top: 200px;
			.order_title {
				font-size: 34px/2;
				font-weight: bold;
				color: #333333;
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
