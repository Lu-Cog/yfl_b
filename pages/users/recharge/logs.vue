<template>
	<view class="page points-mall_details">
		<view class="top_body">
			<image class="top-bg" src="http://imgxcx.yifulai.com/jifen.png" mode="widthFix"></image>
			<view class="top_text flex-center">
				<text class="name">充值总金额（元）</text>
				<text class="number">{{$util.moneyAct(allMoney)}}</text>
			</view>
		</view>
		<view class="tabs_body">
			<view class="tab_body flex-bt">
				<view class="tab_item flex-center" style="width: 100%;" >
					<image  src="/static/img/zhi_s.png" ></image>充值记录
				</view>
			</view>
			<view class="content_body">
				<view class="content_list">
					<view class="list_item flex-bt hr_shadow" v-for="(item,index) in moneyList" :key="index">
						<view class="item_left">
							<view :class="item.status == 4 ?'green':''"  class="title clamp">{{getStatus(item.status,item.price_to,item.price)}}</view>
							<view v-if="item.give_price>0"  class="title clamp mini">{{getMoneyName(item.give_type)}}：赠送金额 {{$util.moneyAct(item.give_price)}}</view>
							<view v-if="item.service_mark"  class="title clamp mini red">原因：{{item.service_mark}}</view>
							<view v-if="item.audit_mark"  class="title clamp mini red">原因：{{item.audit_mark}}</view>
							<view class="time">{{item.create_time}}</view>
						</view>
						<view class="item_right" :class="item.price > 0 ?'green':'red'" >{{$util.moneyAct(item.price)}}</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {
		agent_all,
		agent_lst
	} from '@/api/user.js';
	
	export default {
		data() {
			return {
				allMoney: 0,
				moneyList: [],
				page: 1,
				limit: 20
			}
		},
		onLoad(){
			this.agent_all();
			this.agent_lst();
		},
		//底部刷新
		onReachBottom: function() {
			console.log("-----到底了-----");
			this.agent_lst();
		},
		methods: {
			changetabs(active) {
				this.active = active;
			},
			
			getStatus(status,price_to,price=0){
				
				if(price<0){
					return "系统红冲";
				}
				let tip = "";
				switch(status){
					case 0:
						tip = "审核中"; break;
					case 1:
						tip = "审核不通过"; break;
					case 2:
						tip = "初审成功，待放款"; break;
					case 3:
						tip = "放款不通过"; break;
					case 4:
						tip = "充值成功"; break;
				}
				let moneyName = price_to?this.getMoneyName(price_to)+"：":"";
				return moneyName+tip;
			},
			getMoneyName(price_to){
				
				let tip = "";
				switch(price_to){
					case "margin":
						tip = "保证金"; break;
					case "first_batch":
						tip = "首批款"; break;
					case "now_money":
						tip = "现金账户"; break;
					case "activity_principal":
						tip = "活动现金"; break;
					case "activity_bonus":
						tip = "返点账户"; break;
					case "reward_account":
						tip = "奖励账户"; break;
					case "especially":
						tip = "老代理账户"; break;
					case "ybk":
						tip = "YBK转款账户"; break;
					case "brokerage_price":
						tip = "佣金账户"; break;
				
				}
				
				return tip;
			},
			/**
			 * 获取商家信息
			 */
			agent_all: function() {
				let that = this;
				agent_all().then(res => {
					that.allMoney = res.data;
				});
			},
			/**
			 * 获取商家信息
			 */
			agent_lst: function() {
				
				let parm = {
					"page":this.page,
					"limit":this.limit
				}
				
				let that = this;
				
				agent_lst(parm).then(res => {
					
					let listNew = [];
					let retCount = res.data.count;	//获取总数
					if(res.data.list.length>0){
						listNew = that.moneyList.concat(res.data.list);
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
					
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	page {
		background: #fff;
	}

	.points-mall_details {
		.top_body {
			padding: 12rpx 16rpx;
			padding-bottom: 0;
			position: relative;
			background: #f7f7f7;

			.top-bg {
				width: 100%;
			}

			.top_text {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				flex-direction: column;

				.name {
					font-size: 30rpx;
					font-weight: bold;
					color: #FEFEFE;
				}

				.number {
					font-size: 72rpx;
					font-weight: bold;
					color: #FEFEFE;
					margin-top: 30rpx;
				}
			}
		}
	}

	.tabs_body {
		margin-top: -10rpx;

		.tab_body {
			box-shadow: 0px -32rpx 32rpx 2rpx rgba(22, 152, 174, 0.72);

			.tab_item {
				font-size: 30rpx;

				image {
					margin-right: 18rpx;
					width: 30rpx;
					height: 30rpx;
				}
			}
		}

		.content_body {
			.content_list {
				.list_item{
					padding: 20rpx 18rpx;
					margin: 4rpx 0;
					background-color: #fff;
					.title{
						font-size: 32rpx;
						color: #151515;
						margin-bottom: 24rpx;
						
					}
					.mini{
						font-size: 24rpx;
						color: #555555;
					}
					.time{
						font-size: 26rpx;
						color: #999999;
					}
					.item_right{
						font-size: 35rpx;
						font-weight: bold;
						// color: #FF2A2A;
					}
					.red{
						color: #f00;;
					}
					.green{
						color: #1ABB1D;
					}
				}
			}
		}

	}
</style>
