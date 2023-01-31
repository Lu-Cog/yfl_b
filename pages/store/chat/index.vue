<template>
	<!-- 助力活动-助力拼团 -->
	<view class="page chat-index">
		<mynull :imgSrc="'/static/img/null.png'" :text="'敬请期待'"></mynull>
	</view>
	</view>
</template>

<script>
	import mynull from "../../../components/my-components/mynull.vue"
	export default {
		components: {
			mynull
		},
		data() {
			return {
				text: '',
			}
		},
		mounted() {},
		methods: {
			changetabs(active) {
				this.active = active;
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},

			// 跳转拼团详情页
			toItem(id) {
				uni.navigateTo({
					url: '/pages/users/help/order-item?id=' + id
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.chat-index {}
</style>
