<template>
	<!-- 推广文案-详情 -->
	<view class="page extend-item">
		<view class="block">
			<view class="title">推广文案<text class="copy">（点击复制）</text></view>
			<view class="content">方案信息方案信息方案信息方案信息信息方案信息方案信息方方案信息方案信息方案信息方案信息信方案信息方案信息 </view>
		</view>
		<view class="block">
			<view class="title">推广图片<text class="copy">（点击复制）</text></view>
			<view class="img_block flex-bt">
				<image src="/static/img/img.png" mode="aspectFill"></image>
				<image src="/static/img/img.png" mode="aspectFill"></image>
				<image src="/static/img/img.png" mode="aspectFill"></image>
				<image src="/static/img/img.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.extend-item {
		.block{
			margin-top: 9px;
			padding: 45px/2 30px/2;
			background: #FFFFFF;
			.title{
				font-size: 30px/2;
				font-weight: 500;
				color: #000000;
				margin-bottom: 37px/2;
				.copy{
					font-size: 28px/2;
					color: #1698AE;
					margin-left: 15px;
				}
			}
			.content{
				font-size: 28px/2;
				color: #666666;
				line-height: 40px/2;
			}
			.img_block{
				flex-wrap: wrap;
				image{
					width: 326px/2;
					height: 379px/2;
					margin-bottom: 32px/2;
				}
			}
		}
	}
</style>
