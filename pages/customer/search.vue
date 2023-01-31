<template>
	<!-- 客户-客户搜索 -->
	<view class="page page_customer">
		<view class="search-bg flex-bt">
			<view class="search_body flex-center">
				<image src="/static/img/search.png" mode="widthFix"></image>
				<input type="text" v-model="keyword" placeholder="输入手机号或姓名搜索" />
			</view>
			<button hover-class="none"  @click="search()" >搜索</button>
		</view>
		<view class="title_block flex-bt">
			<text>搜索记录</text>
			<image src="/static/img/del.png" @click="clearSearch()" mode="widthFix"></image>
		</view>
		<view class="block_list">
			<view class="block_item flex-center hr_shadow" v-for="(item,index) in searchList" :key="index" @click="searchClick(item.keyword)">
				<!-- <image :src="item.img" mode="aspectFill"></image> -->
				<text class="clamp">{{item.keyword}}</text>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		getSearchList,
		clearSearch
	} from '@/api/user.js';
	
	export default {

		data() {
			return {
				keyword:"",
				searchList: [ ]
			}
		},
		onLoad(){
			this.getSearchList();
		},
		methods: {
			getSearchList(){
				let that = this
				getSearchList().then(res => {
					that.searchList = res.data;
				})
			},
			clearSearch(){
				let that = this
				clearSearch().then(res => {
					uni.showToast({
						title: '成功清除历史记录',
						icon:'none',
						duration: 600
					});
				})
			},
			
			searchClick(keyword) {
				uni.switchTab({
					url: '/pages/customer/index?keyword='+keyword
				})
			},
			search() {
				if(this.keyword == ""){
					return false;
				}
				uni.switchTab({
					url: '/pages/customer/index?keyword='+this.keyword
				})
			}
		}
	}
</script>

<style lang="less">
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
					color: #B5B5B5;
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

		.title_block {
			padding: 29rpx;

			text {
				font-size: 26rpx;
				font-weight: 500;
				color: #333333;
			}

			image {
				width: 24rpx;
				height: 24rpx;
			}
		}

		.block_list {

			.block_item {
				padding: 20rpx 30rpx;
				justify-content: flex-start;
				background: #fff;

				image {
					flex-basis: 54rpx;
					flex-grow: 0;
					flex-shrink: 0;
					height: 54rpx;
					border-radius: 50%;
				}

				text {
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
					margin-left: 14rpx;
				}


			}

			.hr_shadow::after {
				right: 0;
				margin: auto;
				width: 90%;
			}
		}
	}
</style>
