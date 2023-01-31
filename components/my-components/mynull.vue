<template name="mynull">
		<view class="null_body flex-center">
			<image :src="imgSrc" mode="widthFix" />
			<text>{{text}}</text>
		</view>
</template>

<script>
	export default {
		name: "mynull",
		data() {
			return {
				
			}
		},
		props: {
			text: {
				type: String,
				default: 'text'
			},
			imgSrc: {
				type: String,
				default: 'imgSrc'
			},
		
		},
		methods: {
			
		},
		mounted() {
			
		},
		
	}
</script>

<style lang="less" scoped>

.null_body{
	flex-direction: column;
	margin-top: 136px/2;
	image{
		width: 447px/2;
		height: 320px/2;
	}
	text{
		margin-top: 85px/2;
		font-size: 30px/2;
		color: #999999;
	}
}

</style>
