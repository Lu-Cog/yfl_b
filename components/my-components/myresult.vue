<template name="myresult">
	<!-- 提交结果组件 -->
	<view class="result_body flex-center">
		<image :src="imgSrc" mode="widthFix" />
		<text class="result">{{result}}</text>
		<text class="else">{{text}}</text>
		<button type="default" class="flex-center" hover-class="none">{{btntext}}</button>
	</view>
</template>

<script>
	export default {
		name: "myresult",
		data() {
			return {

			}
		},
		props: {
			result: {
				type: String,
				default: 'result'
			},
			text: {
				type: String,
				default: 'text'
			},
			imgSrc: {
				type: String,
				default: 'imgSrc'
			},
			btntext: {
				type: String,
				default: 'btntext'
			},
		},
		methods: {

		},
		mounted() {

		},

	}
</script>

<style lang="less" scoped>
	.result_body {
		flex-direction: column;
		margin-top: 286px/2;

		image {
			width: 100px/2;
		}

		.result {
			margin-top: 40px/2;
			margin-bottom: 36px/2;
			font-size: 36px/2;
			font-weight: bold;
			color: #000000;
		}

		.else {
			width: 589px/2;
			font-size: 24px/2;
			color: #999999;
			line-height: 40px/2;
			text-align: center;
			margin-bottom: 76px/2;
		}

		button {
			width: 691px/2;
			height: 91px/2;
			background: #1698AE;
			border-radius: 10px/2;
			font-size: 32px/2;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
</style>
