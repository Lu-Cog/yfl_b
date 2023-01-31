<template name="myhead">
	<!-- 自定义头部 -->
	<view class="headder_body">
		<image class="back" src="/static/img/back.png" mode="widthFix" @click="back()"></image>
		<view class="header_bg">{{title}}</view>
	</view>
</template>

<script>
	export default {
		name: "myhead",
		data() {
			return {

			}
		},
		props: {
			title: {
				type: String,
				default: 'title'
			},
		},
		methods: {
			// 返回上一页
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		mounted() {

		},

	}
</script>

<style lang="less" scoped>
	.headder_body {
		width: 100%;
		position: relative;

		.back {
			position: absolute;
			top: 36px;
			left: 15px;
			z-index: 10;
			width: 18px;
			padding: 10px;
		}

		.header_bg {
			width: 100%;
			height: 410px/2;
			background: linear-gradient(4deg, #5ED8ED, #1698AE);

			padding-top: 43px;
			text-align: center;
			font-size: 36px/2;
			// font-weight: bold;
			color: #FFFFFF;
		}
	}
</style>
