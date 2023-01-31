<template>
	<!-- 钱包 设置-账户说明-->
	<view class="page set-up_account">
		<myhead :title="'账户说明'" :imgSrc="'/static/img/account.png'"></myhead>
		<view class="main_body">
			<view class="title">商家端钱包</view>
			<view class="shadow_block">
				<view class="flex-row">总资产：所有账户总和；</view>
				<view class="flex-row">现金账户：日常充值的余额；</view>
				<view class="flex-row">活动现金：活动充值本金；</view>
				<view class="flex-row">返点账户：活动充值赠送余额；</view>
				<view class="flex-row">奖励账户：后台发放奖励，不能参加活动；</view>
			</view>
			<view class="shadow_block">
				<view class="flex-row">保证金：不能用于付款；</view>
				<view class="flex-row">首批款：加盟首批款，不能参加活动；</view>
			</view>
			<view class="shadow_block">
				<view class="flex-row">老代理账户：老代理转入；</view>
				<view class="flex-row">YBK转款账户：YBK转入，不能参加活动；</view>
			</view>
			<view class="title">用户端钱包</view>
			<view class="shadow_block">
				<view class="flex-row">我的钱包：用户充值；</view>
				<view class="flex-row">佣金账户：推荐返佣账户；</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myhead from "../../../components/my-components/myhead2.vue"
	export default {
		components: {
			myhead
		},
		data() {
			return {
				title: '',
				imgSrc: '',
			}
		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.set-up_account {
		.main_body {
			padding: 15px;
			padding-top: 234px;

			.title {
				font-size: 36px/2;
				line-height: 18px;
				font-weight: bold;
				color: #000000;
				padding: 42px/2;
				padding-left: 14px/2;
				position: relative;

				&::after {
					content: ' ';
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					margin: auto;
					width: 6px/2;
					height: 37px/2;
					background: #1698AE;
				}
			}

			.shadow_block {
				padding: 30px/2 42px/2;
				box-shadow: 0px 5px/2 6px/2 0px rgba(193, 227, 255, 0.24);
margin-bottom: 10px;
				.flex-row {
					font-size: 28px/2;
					font-weight: 500;
					color: #333333;
					line-height: 60px/2;
					padding-left: 42px/2;
					position: relative;

					&::after {
						content: ' ';
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						margin: auto;
						width: 10px/2;
						height: 10px/2;
						background: #1698AE;
						border-radius: 50%;
					}
				}
			}
		}
	}
</style>
