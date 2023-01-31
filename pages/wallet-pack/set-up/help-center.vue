<template>
	<!-- 钱包 设置-帮助中心-->
	<view class="page set-up_help">
		<uni-list class="uni_list">
			<uni-list-item link to="">
				<template slot="header">
					<view class="header">
						<text class="title">如何登录账户</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item link to="">
				<template slot="header">
					<view class="header">
						<text class="title">如何实名认证</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item link to="">
				<template slot="header">
					<view class="header">
						<text class="title">如何采购下单</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item link to="/pages/wallet-pack/set-up/about">
				<template slot="header">
					<view class="header">
						<text class="title">如何提现</text>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {}
	}
</script>

<style lang="less">
	.set-up_help {
		.uni_list {
			margin: 10px 15px;
			border-radius: 10px/2;
			padding: 33px/2;
			padding-bottom: 114px/2;
			.header{
				.title{
					font-size: 28px/2;
					font-weight: 500;
					color: #888888;
				}
			}
		}
	}
</style>
