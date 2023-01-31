<template>
	<!-- 客户-首页 -->
	<view class="page page_customer">
		<view class="search-bg flex-bt">
			<view class="search_body flex-center">
				<image src="/static/img/search.png" mode="widthFix"></image>
				<input type="text" v-model="keyword" placeholder="输入手机号或姓名搜索" />
			</view>
			<button hover-class="none" @click="search()">搜索</button>
		</view>
		<view class="numbox">
			<view>
				<text>0</text>
				<text>总用户数</text>
			</view>
			<view>
				<text>0</text>
				<text>今日推荐用户数</text>
			</view>
		</view>
		<view class="customer_list" v-if="userList.length!=0">
			<view class="list_item flex-bt" v-for="(item,index) in userList" :key="index">
				<image @click="toItem(item.uid)" class="item_user"
					:src="item.avatar?item.avatar:'http://imgxcx.yifulai.com/25daf202103051426232787.png'"
					mode="aspectFill"></image>
				<view @click="toItem(item.uid)" class="item_mid flex-center">
					<text class="name clamp">{{item.real_name!=null?item.real_name:"暂未设置"}}</text>
					<text class="phone">{{item.phone_star}}</text>
					<!-- 客户状态：普通：""、vip: grade-vip、重要客户：grade-important-->
					<text class="grade grade-vip">{{item.group_name}}</text>
				</view>
				<image class="item_call" src="/static/img/cus_call.png" @click="phoneCall(item.phone)"></image>
			</view>

		</view>
		<view v-else style="text-align: center; margin-top: 100rpx; color: rgb(153, 153, 153);">
			暂无客户
		</view>
	</view>

</template>

<script>
	let app = getApp();
	import {
		getUserList
	} from '@/api/user.js';
	export default {
		data() {
			return {
				userList: [],
				keyword: "",
				page: 1,
				limit: 10
			}
		},
		onLoad(options) {
			console.log(options);
			if (options.hasOwnProperty('keyword')) {
				this.keyword = options.keyword;
				this.page = 1;
			}
		},
		onShow() {
			this.getUserList(true);
		},
		//顶部刷新
		onPullDownRefresh() {
			this.getUserList(true);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 600);
		},
		//底部刷新
		onReachBottom: function() {
			console.log("-----到底了-----");
			this.getUserList(false);
		},
		methods: {
			search() {
				this.getUserList(true)
			},
			phoneCall(tel) {
				if (!tel) {
					uni.showToast({
						title: '用户暂未绑定手机',
						icon: 'none',
						duration: 1000
					});
					return;
				}
				uni.makePhoneCall({
					phoneNumber: tel //仅为示例
				});
			},
			toItem(id) {
				uni.navigateTo({
					url: '/pages/customer/item?id=' + id
				})
			},
			getUserList(isUpdate = false) {
				let that = this
				//是否初始化
				if (isUpdate) {
					console.log("所有参数重设");
					that.page = 1;
					that.userList = [];
				}

				let limit = that.limit;
				let page = that.page;
				let keyword = that.keyword;
				let userList = that.userList;

				let parm = {
					"keyword": keyword,
					"page": page,
					"limit": limit
				}
				getUserList(parm).then(res => {

					let listNew = [];
					let retCount = res.data.count; //获取总数

					if (res.data.list.length > 0) {
						listNew = userList.concat(res.data.list);
						that.$set(that, 'userList', listNew);
						that.page++;
					} else {
						uni.showToast({
							title: '没有内容了',
							icon: 'none',
							duration: 1000
						});
					}

				})
			}
		}
	}
</script>

<style lang="less">
	.numbox {
		position: fixed;
		transform: translateX(-50%);
		left: 50%;
		width: 90%;
		box-shadow: 0 0 4rpx 2rpx rgba(0, 0, 0, .09);
		margin: 10rpx auto;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
		justify-content: space-between;

		view {
			flex: 1;
			padding: 10rpx 0;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;

			text {
				font-size: 30rpx;
				&:last-child {
					font-size: 28rpx;
					color: #999999;
				}
			}
		}
	}
	.customer_list{
		margin-top: 110rpx;
	}
	.page_customer {
		.search-bg {
			background: #FFFFFF;
			padding: 20rpx 30rpx;

			.search_body {
				width: 600rpx;
				height: 60rpx;
				background: #F5F5F5;
				border-radius: 10rpx;
				justify-content: flex-start;
				padding: 0 24rpx;

				image {
					width: 26rpx;
					margin-right: 16rpx;
				}

				input {
					font-size: 28rpx;
					width: 100%;
					// color: #B5B5B5;
				}

			}

			button {
				flex-basis: 80rpx;
				flex-grow: 0;
				flex-shrink: 0;
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
			}
		}
	}

	.item_call {
		margin-left: 10rpx;
	}
</style>
