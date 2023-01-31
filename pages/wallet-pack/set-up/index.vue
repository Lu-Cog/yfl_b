<template>
	<!-- 钱包 设置-首页-->
	<view class="page set-up_index">
		<!-- <uni-list class="uni_list">
			<uni-list-item link to="/pages/users/user_phone/index">
				<template slot="header" >
					<view class="header">
						<text class="title">切换身份</text><text class="mid">（测试：切换代理商绑定）</text>
					</view>
				</template>
			</uni-list-item>
		</uni-list> -->
		<uni-list class="uni_list">
			<uni-list-item  >
				<template slot="header" style="width: 100%;">
					<view class="header" style="display: flex; justify-content: space-between;">
						<text class="title">手机绑定</text>
						<text>{{phone}}</text>
					</view>
				</template>
			</uni-list-item>
			<!-- <uni-list-item link to="/pages/form/real-name">
				<template slot="header">
					<view class="header">
						<text class="title">实名认证</text>
					</view>
				</template>
			</uni-list-item> -->
			<uni-list-item link to="/pages/wallet-pack/set-up/about">
				<template slot="header">
					<view class="header">
						<text class="title">联系客服</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item link to="/pages/wallet-pack/set-up/about">
				<template slot="header">
					<view class="header">
						<text class="title">关于我们</text>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<button hover-class="none"  @click="loginOut" type="default" class="flex-center">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:''
			}
		},
		onLoad(option) {
			this.phone = option.phone
		},
		methods: {
			
			// 绑定商家
			bindPhone() {
				uni.navigateTo({
					url: '/pages/users/user_phone/index'
				})
			},
			loginOut(){
				this.$store.commit("LOGIN", {
					'token': "",
					'time': ""
				});
				this.$store.commit("SETUID", 0);
				this.$store.commit('UPDATE_USERINFO', "");
				
				uni.navigateTo({
					url: '/pages/index/first'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.set-up_index {
		.uni_list {
			margin-bottom: 20rpx;

			.uni-list-item {
				padding: 6rpx 0 !important;
			}

			.title {
				font-size: 28rpx;
				font-weight: 500;
				color: #121212;
			}

			.mid {
				font-size: 28rpx;
				font-weight: 500;
				color: #999999;
			}
		}


		button {
			margin-top: 40rpx;
			background: #fff;
			height: 120rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #121212;
		}
	}
</style>
