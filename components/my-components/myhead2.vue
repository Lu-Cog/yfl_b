<template name="myhead2">
	<!-- 自定义头部 -->
	<view class="header_body">
		<image class="back" src="/static/img/back.png" mode="widthFix" @click="back()"></image>
		<image class="header-bg" :src="imgSrc" mode="aspectFill" />
		<text>{{title}}</text>
	</view>
</template>

<script>
	export default {
		name: "myhead2",
		data() {
			return {

			}
		},
		props: {
			title: {
				type: String,
				default: 'title'
			},
			imgSrc: {
				type: String,
				default: 'imgSrc'
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
	.header_body {
		width: 100%;
		position: relative;
		.back {
			position: absolute;
			top: 46px;
			left: 25px;
			z-index: 10;
			width: 18px;
		}

		.header-bg {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			// height: auto;
			// z-index: 1;
		}

		text {
			position: absolute;
			top: 43px;
			left: 0;
			right: 0;
			margin: auto;
			z-index: 10;
			font-size: 36px/2;
			color: #FFFFFF;
			text-align: center;
			width: 70%;
		}
	}
</style>
