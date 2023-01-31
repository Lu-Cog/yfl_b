<template>
	<!-- 商学院-首页 -->
	<view class="page page_school">
		<view class="nav_body">
			<picker @change="cateChange" :range="schoolCate"  :value="cateSelIndex" range-key="title">
				<view class="nav_item flex-center active">{{schoolCate[cateSelIndex].title}}</view>
			</picker>
			<!-- 箭头：正序：up-jiantou，倒序："" -->
			<view @click="actSort(1)" :class="sort1>0?'active':''"  class="nav_item flex-center">按时间排序
			<image v-show="sort1>0" :class="sortClass" src="/static/img/jantou.png" mode="widthFix"></image>
			</view>
			<view @click="actSort(2)" :class="sort2>0?'active':''" class="nav_item flex-center">按人气排序
			<image v-show="sort2>0" :class="sortClass" src="/static/img/jantou.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="cart_list flex-bt">
			
			<view class="cart_item" v-for="(item,index) in schoolList" :key="index"  @click="toItem(item.article_id)">
				<view class="image_block">
					<image :src="item.image_input" mode="aspectFill"></image>
					<view class="mask_box clamp">{{item.category.title}}</view>
				</view>
				<view class="text_block">
					<view class="title clamp2">{{item.title}}</view>
					<text class="tips clamp">观看人数&nbsp;&nbsp;{{item.number}}&nbsp;&nbsp;人</text>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	let app = getApp();
	import {
		getSchoolList,
		getSchoolDetail,
		getSchoolCate
	} from '@/api/store.js';
	export default {
		data() {
			return {
				isFull: true,
				schoolList: [],
				schoolCate: [],
				page: 1,
				limit: 6,
				sort:1,	//当前排序值 1默认
				sort1:0,
				sort2:0,
				sortClass:"",
				cateSelIndex:0,	//当前选中项索引，从0开始
			}
		},
		onLoad(options) {
			this.getSchoolCateAndList();
		},
		//顶部刷新
		onPullDownRefresh() {
			this.getSchoolCateAndList(true);
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 600);
		},
		//底部刷新
		onReachBottom: function() {
			console.log("-----到底了-----");
			this.getSchoolList();
			
		},
		methods: {
			actSort:function(flag){
				if(flag == 1){
					this.sort1 = this.sort1==1?2:1;
					if(this.sort1 == 1){
						this.sortClass = "";
						this.sort = 2;
					}else{
						this.sortClass = "up-jiantou";
						this.sort = 3;
					}
					this.sort2 = 0;
				}else{
					this.sort1 = 0;
					this.sort2 = this.sort2==1?2:1;
					if(this.sort2 == 1){
						this.sortClass = "";
						this.sort = 4;
					}else{
						this.sortClass = "up-jiantou";
						this.sort = 5;
					}
				}
				//仅页码重置
				this.page = 1;
				this.schoolList = [];
				this.getSchoolList();
			},
			cateChange: function(e) {
				//重设索引号
				this.cateSelIndex = e.detail.value;
				//刷新列表数据
				this.getSchoolList(true);
			},
			getSchoolList(isUpdate=false){
				let that = this;
				//是否初始化
				if(isUpdate){
					console.log("所有参数重设");
					that.page = 1;
					that.sort = 1;
					that.sort1 = 0;
					that.sort2 = 0;
					that.schoolList = [];
				}
				//根据当前索引号重新获取分类ID
				let selCateId = that.schoolCate[that.cateSelIndex].category_id;
				
				let limit = that.limit;
				let page = that.page;
				let sort = that.sort;
				let schoolList = that.schoolList;
				
				let parm = {
					"cid":selCateId,
					"sort":sort,
					"page":page,
					"limit":limit
				}
				 
				getSchoolList(parm).then(res => {
					let listNew = [];
					let retCount = res.data.count;	//获取总数
					
					if(res.data.list.length>0){
						listNew = schoolList.concat(res.data.list);
						that.$set(that, 'schoolList', listNew);
						that.page++;
					}else{
						uni.showToast({
							title: '没有内容了',
							icon:'none',
							duration: 1000
						});
					}
					
				})
			},
			//获取分类与列表
			getSchoolCateAndList(isUpdate=false){
				let that = this;
				that.schoolCate = [];
				that.schoolCate.push({"category_id":0,"title":"全部"})
				getSchoolCate().then(res => {
					//重组数据
					for(var item of res.data){
						that.schoolCate.push({"category_id":item.category_id,"title":item.title})
					}
					//调用列表
					that.getSchoolList(isUpdate);
				})
			},
			toItem(id){
				uni.navigateTo({
					url:'/pages/school/item?id='+id
				})
			}
		}
	}
</script>

<style lang="less">
	.page_school {
		// margin-top: 10px;

		.nav_body {
			display: flex;
			background: #fff;
			height: 100rpx;
			top: 0;
			.nav_item {
				width: 124px;
				font-size: 28rpx;
				line-height: 100rpx;
				font-weight: bold;
				color: #333333;

				&.active {
					color: #1698AE;
				}

				image {
					width: 20rpx;
					margin-left: 10rpx;
				}

				.up-jiantou {
					transform: rotate(180deg);
				}
			}
		}

		.cart_list {
			padding: 0 4px;
			flex-wrap: wrap;
			margin-bottom: 25rpx;

			.cart_item {
				width: 49%;
				background-color: #fff;
				margin-top: 20rpx;
				box-shadow: 0px 1px 2px 0px #ded9d9;
				.image_block {
					position: relative;
					width: 100%;
					height: 220rpx;

					image {
						width:  100%;
						height: 220rpx;
					}

					.mask_box {
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						background: rgba(000, 000, 000, 0.4);
						font-size: 22rpx;
						color: #FDFDFF;
						padding-left: 20rpx;
						height: 40rpx;
						line-height: 40rpx;
					}
				}

				.text_block {
					padding: 25rpx 10rpx;

					.title {
						font-size: 28rpx;
						color: #222222;
						line-height: 34rpx;
						height: 68rpx;
					}

					.tips {
						font-size: 24rpx;
						color: #888888;
						padding-top: 34rpx;
					}
				}
			}
		}
	}
</style>
