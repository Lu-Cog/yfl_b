<template>
	<!-- 档案管理-查看 -->
	<view class="page files-see">
		<view class="customer_list">
			<view class="list_item flex-bt hr_shadow" @click="toItem()">
				<image class="item_user" src="/static/img/user.jpg" mode="aspectFill"></image>
				<view class="item_mid flex-center">
					<text class="name clamp">微信昵称（真实姓名）</text>
					<view class="time">更新：2021-01-01</view>
				</view>
			</view>
			<view class="list_item flex-bt hr_shadow">
				<image class="item_user" src="/static/img/user.jpg" mode="aspectFill"></image>
				<view class="item_mid flex-center">
					<text class="name clamp">微信昵称（真实姓名）</text>
					<view class="time">更新：2021-01-01</view>
				</view>
			</view>
			<view class="list_item flex-bt hr_shadow">
				<image class="item_user" src="/static/img/user.jpg" mode="aspectFill"></image>
				<view class="item_mid flex-center">
					<text class="name clamp">微信昵称（真实姓名）</text>
					<view class="time">更新：2021-01-01</view>
				</view>
			</view>
		</view>
		<button hover-class="none"  type="default" class="add-btn flex-center">添加档案</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toItem(){
				uni.navigateTo({
				    url: '/pages/users/files/files-see-item'
				});
			},
			
			goto(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="less">
	.files-see {
margin-top: 10px;
		.customer_list {
			.list_item {
				position: relative;
				margin-bottom: 0;

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

		.add-btn {
			margin: 50px auto;
			width: 452px/2;
			height: 102px/2;
			background: #1698AE;
			border-radius: 10px/2;
			font-size: 32px/2;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
</style>
