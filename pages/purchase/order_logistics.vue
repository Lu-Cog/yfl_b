<template>
	<!-- 钱包-进货订单-查看物流 -->
	<view class="page purchase_logistics">
		<myhead :title="'查看物流'"></myhead>
		<view class="top_body flex-bt">
			<view class="left_block">
				<view class="name">卖家已发货</view>
				<view class="time">还剩9天17时自动确认</view>
			</view>
			<image class="right_block" src="/static/img/car.png" mode="widthFix"></image>
		</view>

		<uni-steps :options="options" direction="column" :active="0" active-color="#1698AE"></uni-steps>
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
				options: [{
					title: '快件已由西溪水岸快递服务站49幢2单XXX菜鸟驿站代收，请 及时取件，如有疑问请联系181671XXXXX',
					desc: '2018-11-11'
				}, {
					title: '客户签收人: 邮件收发章 已签收 感谢使用圆通速递，期待再 次为您服务',
					desc: '2018-11-12'
				}, {
					title: '客户签收人: 邮件收发章 已签收 感谢使用圆通速递，期待再 次为您服务',
					desc: '2018-11-13'
				}, {
					title: '客户签收人: 邮件收发章 已签收 感谢使用圆通速递，期待再 次为您服务',
					desc: '2018-11-14'
				}]
			}
		},
		mounted() {

		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #fff;
	}

	.headder_body {
		/deep/.header_bg {
			height: 342px/2 !important;
		}
	}

	.purchase_logistics {
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

		.uni-steps {
			padding: 64px/2 43px/2;

			/deep/ .uni-steps__column-text {
				border: none;
				padding-bottom: 30px;

				/deep/ .uni-steps__column-title {
					font-size: 24px/2;
					font-weight: 500;
					line-height: 36px/2;
					margin-bottom: 19/2px;
				}

				/deep/ .uni-steps__column-desc {
					font-size: 16px/2;
				}
			}

		}
	}
</style>
