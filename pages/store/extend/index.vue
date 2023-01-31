<template>
	<!-- 推广文案-首页 -->
	<view class="page extend-index tabs_body">
		<view class="tab_body flex-bt">
			<view class="tab_item flex-center" @click="changetabs(1)" :class="{active:active==1}">图文信息</view>
			<view class="tab_item flex-center" @click="changetabs(2)" :class="{active:active==2}">视频信息</view>
		</view>
		<view class="content_body" v-if="true">
			<view class="no">
				暂无信息
			</view>
		</view>
		<view class="content_body" v-else>
			<view class="content_list" v-if="active==1">
				<view class="order_block" @click="toItem()">
					<view class="order_mid">
						<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
						<view class="order_content flex-bt">
							<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
							<view class="time">2021-01-18</view>
						</view>
					</view>
				</view>
				<view class="order_block">
					<view class="order_mid">
						<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
						<view class="order_content flex-bt">
							<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
							<view class="time">2021-01-18</view>
						</view>
					</view>
				</view>
				<view class="order_block">
					<view class="order_mid">
						<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
						<view class="order_content flex-bt">
							<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
							<view class="time">2021-01-18</view>
						</view>
					</view>
				</view>
			</view>
			<view class="content_list" v-if="active==2">
				<view class="order_block">
					<view class="order_mid">
						<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
						<view class="order_content flex-bt">
							<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
							<view class="time">2021-01-18</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				active: 1,
			}
		},
		mounted() {

		},
		methods: {
			changetabs(active) {
				this.active = active;
			},
			toItem(){
				uni.navigateTo({
					url:"./extend-item"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.no{
		text-align: center;
		color: #999;
		margin-top: 100rpx;
	}
	.extend-index {
		.content_body {
			// padding: 15px;
			padding-top: 10px;

			.order_mid {
				margin-top: 0;

				.order-img {
					width: 172px/2;
					height: 152px/2;
					border-radius: 10px/2;
				}

				.order_content {
					flex-direction: column;
					align-items: flex-start;

					.name {
						font-size: 30px/2;
						color: #333333;
						line-height: 48px/2;
						height: 48px;
					}

					.time {
						// margin-top: 45px/2;
						font-size: 24px/2;
						color: #999999;
					}
				}
			}


		}
	}
</style>
