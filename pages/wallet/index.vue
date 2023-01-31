<template>
	<!-- 钱包-首页 -->
	<view class="page page_wallet">
		<view class="headder_body">
			<view class="header_bg">钱包
				<view class="flex-row flex-bt">
					<view class="user_box flex-center">
						<!-- <image class="user-img" :src="userInfo.avatar" mode="widthFix"></image> -->
						<!-- <text class="name clamp">{{userInfo.nickname}}</text> -->
						<image class="user-img" :src="mer_avatar?mer_avatar:image" mode="aspectFill"></image>
						<text class="name clamp">{{mer_name}}</text>
					</view>

					<image class="setup" src="/static/img/shezhi.png" mode="widthFix" @click="toConfig()"></image>
				</view>
			</view>
		</view>
		<view class="assets_body" :style="{height:openHeight+'rpx'}">
			<view class="assets_bg">
				<view class="bg_ bg_1"></view>
				<view class="bg_ bg_2"></view>
				<view class="bg_ bg_3"></view>
				<view class="bg_ text_box">
					<image class="i-hanbao" src="/static/img/hanbao.png" mode="widthFix" @click="open(state)"></image>
					<view class="text_row flex-center" @click="toList(0)">
						<text class="number">{{$util.moneyAct(item.allMoney)?$util.moneyAct(item.allMoney):0}}</text>
						<text class="title">总资产（元）</text>
					</view>
					<view class="top_hr hr"></view>
					<view class="text_list flex-bt">
						<view class="text_row flex-center" @click="toList(2)">
							<text
								class="number">{{$util.moneyAct(item.first_batch.value)?$util.moneyAct(item.first_batch.value):0}}</text>
							<text class="title">首批款（元）</text>
						</view>
						<view class="left_hr hr"></view>
						<view class="text_row flex-center" @click="toList(3)">
							<text
								class="number">{{$util.moneyAct(item.now_money.value)?$util.moneyAct(item.now_money.value):0}}</text>
							<text class="title">现金账户（元）</text>
						</view>
					</view>
					<view class="row_block" v-if="state==true">
						<view class="top_hr hr"></view>
						<view class="text_list flex-bt">
							<view class="text_row flex-center" @click="toList(4)">
								<text
									class="number">{{$util.moneyAct(item.activity_principal.value)?$util.moneyAct(item.activity_principal.value):0}}</text>
								<text class="title">活动现金（元）</text>
							</view>
							<view class="left_hr hr"></view>
							<view class="text_row flex-center" @click="toList(5)">
								<text
									class="number">{{$util.moneyAct(item.activity_bonus.value)?$util.moneyAct(item.activity_bonus.value):0}}</text>
								<text class="title">返点账户（元）</text>
							</view>
						</view>

						<view class="top_hr hr"></view>
						<view class="text_list flex-bt">
							<view class="text_row flex-center" @click="toList(6)">
								<text
									class="number">{{$util.moneyAct(item.reward_account.value)?$util.moneyAct(item.reward_account.value):0}}</text>
								<text class="title">奖励账户（元）</text>
							</view>
							<view class="left_hr hr"></view>
							<view class="text_row flex-center" @click="toList(10)">
								<image src="/static/img/w.png" mode="widthFix"></image>
								<text class="title">账户说明</text>
							</view>
						</view>

						<view class="top_hr hr"></view>
						<view class="text_list flex-bt" v-if="acconut_ybk_old!=0">
							<view class="text_row flex-center" @click="toList(8)" v-if="acconut_ybk_old==1 || acconut_ybk_old==3">
								<text
									class="number">{{$util.moneyAct(item.ybk.value)?$util.moneyAct(item.ybk.value):0}}</text>
								<text class="title">YBK转款账户（元）</text>
							</view>
							<view class="left_hr hr" v-if="acconut_ybk_old==1 || acconut_ybk_old==3"></view>
							<view class="text_row flex-center" @click="toList(7)" v-if="acconut_ybk_old==2 || acconut_ybk_old==3">
								<text
									class="number">{{$util.moneyAct(item.especially.value)?$util.moneyAct(item.especially.value):0}}</text>
								<text class="title">老代理账户（元）</text>
							</view>
						</view>

						<!-- <view class="top_hr hr"></view> -->
						<!-- <view class="text_list flex-bt">
							<view class="text_row flex-center" @click="toList(1)">
								<text class="number">{{$util.moneyAct(item.margin.value)?$util.moneyAct(item.margin.value):0}}</text>
								<text class="title">保证金（元）</text>
							</view>
							<view class="left_hr hr"></view>
							<view class="text_row flex-center" @click="toList(9)" v-if="false">
								<text class="number">{{$util.moneyAct(item.brokerage_price.value)}}</text>
								<text class="title">佣金账户（元）</text>
							</view>
						</view> -->

					</view>
				</view>
			</view>
		</view>
		<view class="container">
			<view class="title flex-bt">
				<text>账户管理</text>
				<!-- <view class="right flex-center">更多<image src="/static/img/right_jiantou.png" mode="widthFix"></image></view> -->

			</view>
			<view class="content_list">
				<navigator class="list_item flex-center" url="/pages/users/recharge/index" hover-class="none">
					<!-- <view class="badge flex-center">2</view> -->
					<view class="img_box flex-center">
						<image src="/static/img/q_1.png" mode="aspectFit"></image>
					</view>
					<text>充值</text>
				</navigator>
				<navigator class="list_item flex-center" url="/pages/users/recharge/logs" hover-class="none">
					<view class="img_box flex-center">
						<image src="/static/img/q_3.png" mode="aspectFit"></image>
						<!-- <image src="/static/img/q_2.png" mode="aspectFit"></image> -->
					</view>
					<text>充值记录</text>
				</navigator>
				<view class="list_item flex-center" @click="toList(0)">
					<view class="img_box flex-center">
						<image src="/static/img/q_3.png" mode="aspectFit"></image>
					</view>
					<text>账单明细</text>
				</view>
			</view>
		</view>

		<view class="container">
			<view class="title flex-bt" @click="goOrderList(-2)">
				<text>订货单</text>
				<!-- <view class="right flex-center">更多<image src="/static/img/right_jiantou.png" mode="widthFix"></image> </view>-->

			</view>
			<view class="content_list">
				<navigator class="list_item flex-center" url="/pages/users/order_list/index?status=-1"
					hover-class="none">
					<!-- <view class="badge flex-center">2</view> -->
					<view class="img_box flex-center">
						<image src="/static/img/q_4.png" mode="aspectFit"></image>
					</view>
					<text>待支付</text>
				</navigator>
				<navigator class="list_item flex-center" url="/pages/users/order_list/index?status=0"
					hover-class="none">
					<view class="img_box flex-center">
						<image src="/static/img/q_5.png" mode="aspectFit"></image>
					</view>
					<text>待发货</text>
				</navigator>
				<navigator class="list_item flex-center" url="/pages/users/order_list/index?status=-2"
					hover-class="none">
					<view class="img_box flex-center">
						<image src="/static/img/q_6.png" mode="aspectFit"></image>
					</view>
					<text>全部订单</text>
				</navigator>
			</view>
		</view>

		<view class="container">
			<view class="title flex-bt" @click="goOrderList(-2,1)">
				<text>发货单</text>
				<!-- <view class="right flex-center">更多<image src="/static/img/right_jiantou.png" mode="widthFix"></image> </view>-->

			</view>
			<view class="content_list">
				<navigator class="list_item flex-center" url="/pages/users/order_list/index?status=-1&deliver=1"
					hover-class="none">
					<!-- <view class="badge flex-center">2</view> -->
					<view class="img_box flex-center">
						<image src="/static/img/q_4.png" mode="aspectFit"></image>
					</view>
					<text>待支付</text>
				</navigator>
				<navigator class="list_item flex-center" url="/pages/users/order_list/index?status=0&deliver=1"
					hover-class="none">
					<view class="img_box flex-center">
						<image src="/static/img/q_5.png" mode="aspectFit"></image>
					</view>
					<text>待发货</text>
				</navigator>
				<navigator class="list_item flex-center" url="/pages/users/order_list/index?status=-2&deliver=1"
					hover-class="none">
					<view class="img_box flex-center">
						<image src="/static/img/q_6.png" mode="aspectFit"></image>
					</view>
					<text>全部订单</text>
				</navigator>
			</view>
		</view>

		<view class="container container2">
			<view class="title flex-bt">
				<text>我的工具</text>
				<!-- <view class="right flex-center">更多<image src="/static/img/right_jiantou.png" mode="widthFix"></image></view> -->

			</view>
			<view class="content_list">
				<navigator class="list_item flex-center" url="/pages/points-mall/qiandao" hover-class="none">
					<!-- <view class="badge flex-center">2</view> -->
					<view class="img_box flex-center">
						<image src="/static/img/q_7.png" mode="aspectFit"></image>
					</view>
					<text>每日签到</text>
				</navigator>
				<navigator class="list_item flex-center" url="/pages/points-mall/luck" hover-class="none">
					<view class="img_box flex-center">
						<image src="/static/img/q_8.png" mode="aspectFit"></image>
					</view>
					<text>每日抽奖</text>
				</navigator>
				<navigator class="list_item flex-center" url="/pages/points-mall/index" hover-class="none">
					<view class="img_box flex-center">
						<image src="/static/img/q_9.png" mode="aspectFit"></image>
					</view>
					<text>积分商城</text>
				</navigator>
				<!-- <navigator class="list_item flex-center" url="/pages/wallet-pack/coupon/index" hover-class="none"> -->
				<navigator class="list_item flex-center" url="/pages/users/user_coupon/index" hover-class="none">
					<!-- <view class="badge flex-center">2</view> -->
					<view class="img_box flex-center">
						<image src="/static/img/q_10.png" mode="aspectFit"></image>
					</view>
					<text>优惠券</text>
				</navigator>
				<navigator class="list_item flex-center" url="/pages/wallet-pack/set-up/help-center" hover-class="none">
					<view class="img_box flex-center">
						<image src="/static/img/q_11.png" mode="aspectFit"></image>
					</view>
					<text>新手帮助</text>
				</navigator>
				<navigator class="list_item flex-center" url="/pages/users/user_address_list/index" hover-class="none">
					<view class="img_box flex-center">
						<image src="/static/img/q_12.png" mode="aspectFit"></image>
					</view>
					<text>收货地址</text>
				</navigator>
				<navigator class="list_item flex-center" url="/pages/users/bank/index" hover-class="none">
					<view class="img_box flex-center">
						<image src="/static/img/q_13.png" mode="aspectFit"></image>
					</view>
					<text>绑定银行卡</text>
				</navigator>
				<navigator class="list_item flex-center" :url="'/pages/wallet-pack/set-up/index?phone='+phone"
					hover-class="none">
					<view class="img_box flex-center">
						<image src="/static/img/q_14.png" mode="aspectFit"></image>
					</view>
					<text>设置</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	import {
		getUserInfo
	} from '@/api/user.js';
	import {
		getWxLoginOpenId
	} from '@/api/public.js';
	import {
		mapGetters
	} from "vuex";
	import Routine from '@/libs/routine';
	export default {

		computed: mapGetters(['isLogin', 'uid']),

		data() {
			return {
				userInfo: {},
				item: {
					allMoney: "",
					margin: "",
					first_batch: "",
					now_money: "",
					activity_principal: "",
					activity_bonus: "",
					reward_account: "",
					especially: "",
					ybk: "",
					brokerage_price: ""
				},
				state: false,
				openHeight: 360,
				mer_name: '',
				mer_avatar: '',
				image: "http://imgxcx.yifulai.com/25daf202103051426232787.png",
				phone: '',
				acconut_ybk_old:0
			}
		},
		onLoad(options) {

		},
		//上拉刷新
		onPullDownRefresh() {
			this.getUserInfo();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 400);
		},
		onShow() {
			// if(app.globalData.act_11==1){
			// 	uni.navigateTo({
			// 		url:'/pages/index/new'
			// 	})
			// }
			console.log("---isLogin=" + this.isLogin);
			if (!app.globalData.openid) {
				this.setUserInfoAutoUpdateOpenId()
			}
			if (!this.isLogin) {
				uni.navigateTo({
					url: '/pages/index/first'
				})
			}
			this.getUserInfo();
		},
		onHide() {
			//切换后，页面自动收回
			this.state && this.open(this.state);
		},
		methods: {
			setUserInfoAutoUpdateOpenId() {
				let that = this;
				//1调用wx.login 获取code
				Routine.getCode().then(res => {
					getWxLoginOpenId({
						"xcx_type": 1,
						"code": res,
						"spid": this.uid
					}).then(res => {
						app.globalData.openid = res.data.openid
					})
				})
			},
			goOrderList(status, deliver) {
				if (deliver) {
					uni.navigateTo({
						url: '/pages/users/order_list/index?status=' + status + '&deliver=' + deliver
					})
				}
				uni.navigateTo({
					url: '/pages/users/order_list/index?status=' + status
				})
			},
			toConfig() {
				uni.navigateTo({
					url: '/pages/wallet-pack/set-up/index?phone=' + this.phone
				})
			},
			/**
			 * 获取商家信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.userInfo = res.data;
					that.acconut_ybk_old = that.userInfo.acconut_ybk_old
					that.item = that.userInfo.acconut_info;
					that.mer_name = that.userInfo.merchant.mer_name
					that.mer_avatar = that.userInfo.merchant.mer_avatar
					that.phone = that.userInfo.phone
					let bind_tip = res.data.bind_tip
					if (res.data.card_status != 1) {
						uni.showModal({
							content: bind_tip,
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/users/bank/index'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
					}
					//计算总金额
					let allMoney = 0;
					for (let val in that.item) {
						allMoney += parseFloat(that.item[val].value);
					}
					that.$set(that.item, 'allMoney', allMoney);
				});
			},

			open(e) {
				let state = e;
				var that = this;
				this.state = !state;

				if (that.state === true) {
					if(that.acconut_ybk_old==0){
						that.openHeight = 680;
					}else{
						that.openHeight = 820;
					}
				} else {
					that.openHeight = 360;
				}
			},
			toList(id) {
				if (id == 10) {
					//账户说明
					uni.navigateTo({
						url: '/pages/wallet/show'
					})
				} else {
					uni.navigateTo({
						url: '/pages/wallet/list?type=' + id
					})
				}
			},
		}
	}
</script>

<style lang="less">
	.page_wallet {
		.headder_body {
			width: 100%;

			.header_bg {
				width: 100%;
				height: 410rpx;
				background: linear-gradient(4deg, #5ED8ED, #1698AE);

				padding-top: 66rpx;
				text-align: center;
				font-size: 36rpx;
				// font-weight: bold;
				color: #FFFFFF;

				.flex-row {
					padding: 0 30rpx;
					margin-top: 58rpx;

					.user_box {
						.user-img {
							width: 56rpx;
							height: 56rpx !important;
							border-radius: 50%;
						}

						.name {
							width: 540rpx;
							margin-left: 21rpx;
							font-size: 28rpx;
							font-weight: 500;
							color: #FFFFFF;
							text-align: left;
						}
					}

					.setup {
						width: 34rpx;
						height: 34rpx;
					}
				}
			}


		}

		.assets_body {
			width: 690rpx;
			height: 360rpx;
			background: #FFFFFF;
			box-shadow: 0px 7rpx 10rpx 0rpx rgba(33, 162, 184, 0.07);
			border-radius: 10rpx;
			margin: auto;
			margin-top: -116rpx;
			position: relative;

			.i-hanbao {
				position: absolute;
				right: 18rpx;
				top: 23rpx;
				width: 37rpx;
				padding: 20rpx;
			}

			.bg_ {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				height: 100%;
				background: #FFFFFF;
				box-shadow: 0px 7rpx 10rpx 0rpx rgba(33, 162, 184, 0.07);
				border-radius: 10rpx;
			}

			.bg_1 {
				bottom: 0;
				width: 690rpx;
				z-index: 20;
			}

			.bg_2 {
				bottom: 17rpx;
				width: 650rpx;
				opacity: 0.65;
				z-index: 18;
			}

			.bg_3 {
				bottom: 34rpx;
				width: 595rpx;
				opacity: 0.4;
				z-index: 16;
			}

			.text_box {
				z-index: 30;
				padding: 0 28rpx;
				padding-top: 40rpx;

				.text_row {
					flex-direction: column;

					.number {
						font-size: 65rpx;
						font-weight: bold;
						color: #333333;
						margin-bottom: 10rpx;
					}

					.title {
						font-size: 28rpx;
						color: #999999;
					}
				}

				.top_hr {
					width: 100%;
					height: 2rpx;
					margin: 15rpx 0 28rpx;
				}

				.left_hr {
					width: 2rpx;
					height: 112rpx;
				}

				.text_list {
					flex-wrap: wrap;

					.text_row {
						width: 48%;

						.number {
							font-size: 46rpx;
						}

						image {
							width: 50rpx;
							height: 50rpx !important;
							margin-bottom: 10rpx;
						}
					}
				}
			}
		}

		.container {
			background: #fff;
			border-radius: 10rpx;
			padding: 26rpx;
			margin: 28rpx;
			padding-bottom: 0;

			.title {
				font-size: 30rpx;
				font-weight: bold;
				color: #333333;

				.right {
					font-size: 24rpx;
					color: #333333;
					font-weight: 400;

					image {
						width: 14rpx;
						margin-left: 15rpx;
					}
				}
			}

			&.container2 {
				.content_list {
					.list_item {
						width: 25%;
					}
				}
			}

			.content_list {
				flex-wrap: wrap;
				display: flex;
				align-items: flex-start;

				.list_item {
					position: relative;
					flex-direction: column;
					width: 33.3%;
					padding: 32rpx 0;

					.badge {
						position: absolute;
						top: 0;
						right: 0;
						left: 40rpx;
						bottom: 80rpx;
						margin: auto;
						width: 34rpx;
						height: 30rpx;
						background: #FF0000;
						border-radius: 20rpx;
						font-size: 20rpx;
						font-weight: 500;
						color: #FFFFFF;
						z-index: 30;
					}

					.img_box {
						width: 50rpx;
						height: 50rpx;

						image {
							width: 50rpx;
							height: 50rpx;
						}
					}

					text {
						font-size: 24rpx;
						font-weight: 500;
						color: #333333;
						margin-top: 10rpx;
					}
				}
			}
		}
	}
</style>
