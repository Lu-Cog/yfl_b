<template>
	<!-- 钱包-进货订单-账户明细 -->
	<view class="page purchase_detailed">
		<view class="top_body">
			<image class="img-bg" src="http://imgxcx.yifulai.com/bg.jpg" mode="widthFix"></image>
			<view class="calendar_blcok flex-bt">
				<view class="left flex-center" >
					<image class="i-date" src="/static/img/date.png" mode="widthFix"></image>
					<text @click="open" class="date">当前 {{date}}</text>
					<text v-if="date!='请选择'" @click="clearDateSel" class="date clear"> 清除</text>
				</view>
				<uni-calendar ref="calendar" :insert="false" @confirm="dateChange"></uni-calendar>
				<image class="i-left" src="/static/img/jiantou_left2.png" mode="widthFix"></image>
			</view>
			<view class="price_block">
				<view class="flex-col">
					<view class="title">{{tongji.name}}</view>
					<view class="price">{{$util.moneyAct(tongji.allMoney)}} </view>
				</view>
				<view class="flex-row3 flex-bt">
					<view class="col flex-center">
						<view class="title">总业绩(元)</view>
						<view class="price">{{$util.moneyAct(tongji.moneyIn)}} </view>
					</view>
					<view class="col flex-center">
						<view class="title">待支出(元)</view>
						<view class="price">{{$util.moneyAct(tongji.moneyOut)}} </view>
					</view>
					<view class="col flex-center">
						<view class="title">总笔数(笔)</view>
						<view class="price">{{tongji.moneyNum}} </view>
					</view>
				</view>
			</view>
		</view>
		<view class="money_list">
			<view class="list_item hr_shadow" v-for="(item,index) in moneyList" :key="index">
				<view class="row_1 flex-bt">
					<text class="name clamp">{{item.title}}</text><text class="state" :class="item.pm==1?'red':''">{{$util.moneyAct(item.number)}}</text>
				</view>
				<view class="row_2 flex-bt">
					<text class="time">{{item.create_time}}</text><text class="balance">余额 {{$util.moneyAct(item.balance)}}</text>
				</view>
				<view class="row_3 flex-bt" v-if="item.order_sn" >关联订单编号：&nbsp;{{item.order_sn}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	import {
		getMoneyList
	} from '@/api/user.js';
	export default {
		data() {
			return {
				type:0,
				types:0,
				date: '请选择',
				moneyList: [],
				tongji: [],
				page: 1,
				limit: 20,
				home:'',
				uid:''
			}
		},
		onLoad(options) {
			console.log(options);
			this.uid = options.uid
			this.types = options.type
			if (options.hasOwnProperty('keyword')) {
				this.keyword = options.keyword;
				this.page = 1;
			}
			if (options.hasOwnProperty('type')) {
				this.type = options.type;
			}
			console.log("type="+this.type);
			// this.today();
			this.getMoneyList();
		},
	
		//顶部刷新
		onPullDownRefresh() {
			this.getMoneyList(true);
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 600);
		},
		//底部刷新
		onReachBottom: function() {
			console.log("-----到底了-----");
			this.getMoneyList();
		},
 
		methods: {
			open() {
				this.$refs.calendar.open();
			},
			// 当前日期
			today() {
				let myDate = new Date;
				let year = myDate.getFullYear(); //获取当前年
				let mon = myDate.getMonth() + 1; //获取当前月
				let date = myDate.getDate(); //获取当前日
				mon = mon<10?"0"+mon:mon;
				date = date<10?"0"+date:date;
				this.date = year + '-' + mon + '-' + date
			},
			// 日期选择
			dateChange(e) {
				this.date = e.fulldate
				this.page = 1;
				this.moneyList = [];
				this.getMoneyList();
			},
			// 清除日期选择
			clearDateSel() {
				this.date = "请选择";
				this.page = 1;
				this.moneyList = [];
				this.getMoneyList();
			},
			getMoneyList(isUpdate=false){
				let that = this
				//是否初始化
				if(isUpdate){
					console.log("所有参数重设");
					that.page = 1;
					that.moneyList = [];
				}
				
				let type =  that.type == 0?"":app.globalData.accountAll[that.type-1];
				let date = that.date;
				if(date == "请选择"){
					date = "";
				}
				let limit = that.limit;
				let page = that.page;
				let moneyList = that.moneyList;
				
				let parm = {
					"to_uid":that.uid,
					"type":that.types,
					"account":'',
					"date":date,
					"page":page,
					"limit":limit
				}
				getMoneyList(parm).then(res => {
					
					let listNew = [];
					let retCount = res.data.count;	//获取总数
					that.tongji = res.data.tongji;
					if(res.data.list.length>0){
						listNew = moneyList.concat(res.data.list);
						that.$set(that, 'moneyList', listNew);
						that.page++;
					}else{
						if(that.page == 1){
							//清空数据
							that.$set(that, 'moneyList', []);
						}
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

<style lang="less" scoped>
	.purchase_detailed {
		.top_body {
			position: relative;
			padding: 34rpx;

			.img-bg {
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				height: 428rpx !important;
			}

			.calendar_blcok {
				z-index: 10;
				margin-bottom: 44rpx;

				.left {
					z-index: 10;
					// flex: 1;
					// justify-content: flex-start;

					.i-date {
						width: 33rpx;
						height: 32rpx;
					}

					.date {
						font-size: 24rpx;
						color: #FFFFFF;
						margin-left: 14rpx;
					}
					.clear{
						color: #f5cb01;
					}
				}

				.i-left {
					width: 17rpx;
					height: 27rpx;
				}
			}

			.price_block {

				.flex-row3 {
					.col {
						width: 30%;
						flex-direction: column;

						.title {
							font-size: 24rpx;
							color: #FFFFFF;
							opacity: 0.64;
							z-index: 10;
							margin-bottom: 16rpx;
						}

						.price {
							font-size: 32rpx;
							font-weight: bold;
							color: #FFFFFF;
							z-index: 10;
						}
					}
				}

				.flex-col {
					z-index: 10;
					display: flex;
					flex-direction: column;
					padding-left: 30rpx;
					margin-bottom: 35rpx;

					.title {
						font-size: 24rpx;
						color: #FFFFFF;
						z-index: 10;
						margin-bottom: 26rpx;
					}

					.price {
						font-size: 72rpx;
						font-weight: bold;
						color: #FFFFFF;
						z-index: 10;
					}

				}

			}
		}

		.money_list {
			margin-top: 20rpx;
			background: #fff;
			.list_item {
				padding: 20rpx 18rpx;
				.row_1 {
					margin-bottom: 25rpx;

					.name {
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
					}

					.state {
						font-size: 32rpx;
						font-weight: bold;
						color: #333333;

						&.red {
							color: #FF2A2A;
						}
					}
				}

				.row_2 {
					text {
						font-size:24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
					}
				}
				.row_3{
					margin-top: 25rpx;
						font-size:24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
				}
			}
		}
	}
</style>
