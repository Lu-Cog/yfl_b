<template>
	<!-- 档案管理-查看详情 -->
	<view class="page files-see-item">
		<view class="flex-bt">
			<text class="title">某某用户</text> <text class="time">2021-01-21</text>
		</view>
		<view>项目：美容、微整形</view>
		<view>费用（元）：<text class="red">￥159</text></view>
		<view class="title">某某用户</view>
		<view class="content">档案描述档案描述档案描述档案描述档案描述档案描述档案描述档案描述档案描述档案描述档案描述档案描述档案描述档案描述档案描述</view>
		<image src="http://imgxcx.yifulai.com/index_banner.jpg" mode="widthFix"></image>
		<image src="http://imgxcx.yifulai.com/index_banner.jpg" mode="widthFix"></image>
		<view class="button_block flex-bt">
			<button hover-class="none" type="default" class="flex-center">返回</button>
			<button hover-class="none" type="default" class="flex-center yes">删除本条档案</button>
		</view>
	</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #fff;
	}

	.files-see-item {
		padding: 38px/2 26px/2;

		view {
			font-size: 28px/2;
			font-weight: 500;
			color: #333333;
			margin-bottom: 27px/2;
		}

		.title {
			font-size: 30px/2;
			font-weight: bold;
			color: #000000;
		}

		.time {
			font-size: 24px/2;
			color: #999999;
		}

		.content {
			font-size: 28px/2;
			color: #666666;
			line-height: 40px/2;
		}

		image {
			width: 100%;
			margin-bottom: 12px;
		}

		.button_block {
			justify-content: space-between;
			padding: 0 4px;
			button{
				margin: 0;
				width: 294px/2;
				height: 102px/2;
				background: #BFBFBF;
				border-radius: 10px/2;
				font-size: 32px/2;
				font-weight: 500;
				color: #FFFFFF;
				&.yes{
					background: #1698AE;
				}
			}
		}
	}
</style>
