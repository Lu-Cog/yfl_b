<template>
	<!-- 合伙人 -->
	<view class="page page_customer">
		<view class="search-bg flex-bt">
			<view class="search_body flex-center">
				<image src="/static/img/search.png" mode="widthFix"></image>
				<input type="text" v-model="keyword" placeholder="输入手机号或姓名搜索" />
			</view>
			<button hover-class="none"  @click="search()" >搜索</button>
		</view>
		<view class="customer_list" v-if="userList.length!=0">
			
			<view class="list_item" v-for="(item,index) in userList" :key="index" >
				<view class="flex-bt">
					<image class="item_user" :src="item.avatar?item.avatar:'http://imgxcx.yifulai.com/25daf202103051426232787.png'" mode="aspectFill"></image>
					<view  class="item_mid flex-center">
						<text class="name clamp">{{item.nickname?item.nickname:"暂未设置"}}</text>
						<text class="phone">{{item.phone_star}}</text>
						<!-- 客户状态：普通：""、vip: grade-vip、重要客户：grade-important-->
						<text class="grade grade-vip">总业绩：{{item.order_count}}元</text>
						<text class="grade grade-vip">总佣金：{{item.promoter_count}}元</text>
						<view class="buttontext">
							<!-- 	<navigator :url="'/pages/store/recording/recording?uid='+item.uid+'&rate_product='+item.rate_product+'&rate_project='+item.rate_project">线下录单</navigator> -->
							<navigator :url="'/pages/store/partnerCommission/partnerCommission?type=3&uid='+item.uid">查看业绩</navigator>
							<navigator :url="'/pages/store/commission/commission?uid='+item.uid+'&rate_product='+item.rate_product+'&rate_project='+item.rate_project+'&qdd_num='+item.qdd_num">设置佣金比例</navigator>
						</view>
					</view>
					<image class="item_call" src="/static/img/cus_call.png" @click="phoneCall(item.phone)"></image>
				</view>	
				
			</view>
			
		</view>
		<view v-else style="text-align: center; margin-top: 100rpx; color: rgb(153, 153, 153);">
			暂无合伙人
		</view>
	</view>

</template>

<script>
	let app = getApp();
	import {
		spreadPeople
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
			this.spreadPeople();
		},
		onShow() {
			this.spreadPeople(true);
		},
		//顶部刷新
		onPullDownRefresh() {
			this.spreadPeople(true);
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 600);
		},
		//底部刷新
		onReachBottom: function() {
			console.log("-----到底了-----");
			this.spreadPeople(false);
		},
		methods: {
			search() {
				this.spreadPeople(true)
			},
			phoneCall(tel){
				if(!tel){
					uni.showToast({
						title: '用户暂未绑定手机',
						icon:'none',
						duration: 1000
					});
					return;
				}
				uni.makePhoneCall({
				    phoneNumber: tel //仅为示例
				});
			},
			// toItem(id) {
			// 	uni.navigateTo({
			// 		url: '/pages/customer/item?id='+id
			// 	})
			// },
			spreadPeople(isUpdate=false){
				let that = this
				//是否初始化
				if(isUpdate){
					console.log("所有参数重设");
					that.page = 1;
					that.userList = [];
				}
				
				let limit = that.limit;
				let page = that.page;
				let keyword = that.keyword;
				let userList = that.userList;
				
				let parm = {
					"type":3,
					"page":page,
					"limit":limit,
					"keyword":keyword
				}
				spreadPeople(parm).then(res => {
					
					let listNew = [];
					let retCount = res.data.count;	//获取总数
					
					if(res.data.list.length>0){
						listNew = userList.concat(res.data.list);
						that.$set(that, 'userList', listNew);
						that.page++;
					}else{
						uni.showToast({
							title: '没有内容了',
							icon:'none',
							duration: 1000
						});
					}
					
				})
			}
		}
	}
</script>

<style lang="less">
	.page_customer {
		.buttontext{
			margin-top: 10px;
			width: 100%;
			display: flex;
			align-items: center;
			font-size: 12px;
			navigator{
				margin: 0 10rpx;
				border-radius: 20rpx;
				padding: 4rpx 20rpx;
				background-color: #1698AE;
				color: #fff;
			}
		}
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
	.item_call{margin-left: 10rpx;}
</style>
