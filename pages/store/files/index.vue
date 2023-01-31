<template>
	<!-- 档案管理-首页 -->
	<view class="page files-index">
		<view class="search-bg">
			<view class="search_body flex-center">
				<image src="/static/img/search.png" mode="widthFix"></image>
				<input type="text" value="" placeholder="输入客户手机号或姓名搜索" />
			</view>
		</view>
		<view class="customer_list">
			<view class="list_item flex-bt">
				<image class="item_user" src="/static/img/user.jpg" mode="aspectFill"></image>
				<view class="item_mid flex-center">
					<text class="name clamp">微信昵称（真实姓名）</text>
					<text class="xinxi">已有 3 条档案信息</text>
					<view class="time">更新：2021-01-01</view>
				</view>
				<view class="button_block flex-bt">
					<button hover-class="none" class="flex-center" @click="goto('/pages/users/files/files-see')">查看</button>
					<button hover-class="none" class="flex-center yes" @click="goto('/pages/form/files-edit')">追加</button>
				</view>
			</view>
			<view class="list_item flex-bt">
				<image class="item_user" src="/static/img/user.jpg" mode="aspectFill"></image>
				<view class="item_mid flex-center">
					<text class="name clamp">微信昵称（真实姓名）</text>
					<text class="xinxi">已有 3 条档案信息</text>
					<view class="time">更新：2021-01-01</view>
				</view>
				<view class="button_block flex-bt">
					<button hover-class="none" class="flex-center">查看</button>
					<button hover-class="none" class="flex-center yes" @click="goto('/pages/form/files-edit')">追加</button>
				</view>
			</view>
			<view class="list_item flex-bt">
				<image class="item_user" src="/static/img/user.jpg" mode="aspectFill"></image>
				<view class="item_mid flex-center">
					<text class="name clamp">微信昵称（真实姓名）</text>
					<text class="xinxi">已有 3 条档案信息</text>
					<view class="time">更新：2021-01-01</view>
				</view>
				<view class="button_block flex-bt">
					<button hover-class="none" class="flex-center">查看</button>
					<button hover-class="none" class="flex-center yes" @click="goto('/pages/form/files-edit')">追加</button>
				</view>
			</view>
		</view>
	<image class="add-btn" src="/static/img/jiahao.png" mode="widthFix"></image>
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
	.files-index {
		.add-btn {
			width: 119px/2;
			height: 119px/2;
			position: fixed;
			right: 5px;
			bottom: 70px;
		}
		.search-bg {
			padding: 13px/2 28px/2;
			background: #ffffff;
		}

		.search_body {
			width: 690px/2;
			height: 60px/2;
			margin: 21px/2 auto;
			background: #f4f4f4;
			border-radius: 10px/2;
			padding: 0 28px/2;
			justify-content: flex-start;

			image {
				width: 26px/2;
				margin-right: 16px/2;
			}

			input {
				font-size: 28px/2;
				color: #B5B5B5;
			}

		}

		.customer_list {
			.list_item {
				box-shadow: 0px 5px/2 6px/2 0px rgba(193, 227, 255, 0.24);

				.item_mid {
					.name {
						margin-bottom: 10px;
					}

					.time {
						margin-top: 10px;
					}
				}

				.button_block {
					flex-direction: column;

					button {
						width: 145px/2;
						border: 1px solid #1698AE;
						color: #1698AE;

						&.yes {
							margin-top: 11px;
							color: #fff;
						}
					}
				}

			}
		}

	}
</style>
