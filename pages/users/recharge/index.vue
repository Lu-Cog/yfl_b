<template>
	<!-- 表单-充值-在线充值 -->
	<view class="page recharge_body">
		<form class="form_body">
			<view class="uni-form-item title_block" v-if="rechargeShow">
				<view class="title">报名日期</view>
			</view>
			<view class="text_list2" v-if="rechargeShow">
				{{rechargeLook.active.start_date}}
			</view>
			<view class="uni-form-item title_block" v-if="rechargeShow">
				<view class="title">活动简介</view>
			</view>
			<view class="text_list2" v-if="rechargeShow" v-html="rechargeLook.active.title">
			</view>
			<view v-if="rechargeShow" class="uni-form-item title_block flex-bt hr_shadow">
				<view class="title">报名费用</view>
			</view>
			<view v-else class="uni-form-item title_block flex-bt hr_shadow">
				<view class="title">{{change?'线下充值':'线上充值'}}
				</view>
				<view style="display: flex;">
					<text class="blue" style="margin-right: 20rpx;" @click="changeTab()">{{change?'线上充值':'线下充值'}}</text>
					<navigator url="./logs" hover-class="none">
						<text class="blue">充值记录</text>
					</navigator>
				</view>
			</view>
			<view v-if="rechargeShow" class="uni-form-item hr_shadow flex-frist">
				<text class="money">￥{{moneyAll}}</text>&nbsp;
				<text style="font-size: 50rpx;">/人</text>
			</view>
			<view v-else class="uni-form-item hr_shadow money">
				￥&nbsp;<input type="digit" maxlength="8" placeholder="请输入充值金额" v-model="money"/>
			</view>
			<view class="uni-form-item title_block" v-if="rechargeShow">
				<view class="title">报名人数</view>
			</view>
			<view class="uni-form-item hr_shadow flex-frist" v-if="rechargeShow">
				<button type="default" class="cut" @click="cut()">
					-
				</button>
				<input class="number" type="digit" maxlength="8" placeholder="请输入报名人数" v-model="number" :disabled="rechargeShow"/>
				<button type="default" class="add" @click="add()">
					+
				</button>
			</view>
			<view v-if="!change && rechargeLook.status==1 && !rechargeShow" class="uni-form-item title_block flex-bt hr_shadow">
				<view class="title">赠送金额
				</view>
				<text class="red">{{amount}}</text>
			</view>
			<view v-if="!change && rechargeLook.status==1 && !rechargeShow" class="hr_shadow tip">
				<view class="red" style="font-size: 24rpx;">
					<view>充值活动：{{rechargeLook.title}}</view>
					<view>活动时间：{{rechargeLook.valid_time}}</view>
				</view>
			</view>
			<view class="isCanjia" v-if="!change && rechargeLook.status==1 && !rechargeShow">
				<text>是否参加充值活动</text>
				<switch :checked="isCanjia" @change="changeSwi" color='#1698AE' style="transform:scale(0.7)"/>
			</view>
			<view class="uni-form-item title_block hr_shadow" v-if="change">
				<view class="title">选择充值日期时间</view>
			</view>

			<view class="block radio_block flex-bt" v-if="change">
				<view class="uni-list_body">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							请选择日期
						</view>
						<view class="uni-list-cell-db">
							<picker mode="date" :value="date" :start="startDate" :end="endDate"
								@change="bindDateChange">
								<view class="uni-input">{{date}}</view>
							</picker>
						</view>
					</view>
				</view>

				<view class="uni-list_body" style="display: block;">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							请选择时分
						</view>
						<view class="uni-list-cell-db">
							<picker mode="time" :value="time" start="00:00" end="23:59" @change="bindTimeChange">
								<view class="uni-input">{{time}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>

			<!-- <view class="uni-form-item title_block hr_shadow">
				<view class="title">选择面值</view>
			</view>
			<view class="block radio_block flex-bt">
				<view class="radio_item flex-center active">
					<view class="radio-price">
						<text>1</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>3</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>5</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>10</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>20</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>50</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
			</view>
			<view class="block arrival">实际到账：<text class="blue">1100元</text></view> -->
			<!-- <view class="uni-form-item title_block">
				<view class="title">支付方式</view>
			</view>
			<view class="uni-list_body">
				<uni-list>
					<uni-list-item title="今日订单" thumb="/static/img/z-wx.png" thumb-size="sm">
						<template slot="footer">
							<image class="footer-img" :src="active===1?'/static/img/z-yes.png':'/static/img/z-no.png'" mode="widthFix"
							 @click="way(1)"></image>
						</template>
					</uni-list-item>
				</uni-list>
				<uni-list>
					<uni-list-item title="今日订单" thumb="/static/img/xx.png" thumb-size="sm">
						<template slot="footer">
							<image class="footer-img" :src="active===2?'/static/img/z-yes.png':'/static/img/z-no.png'" mode="widthFix"
							 @click="way(2)"></image>
						</template>
					</uni-list-item>
				</uni-list>
			</view> -->
			<view class="uni-form-item title_block" v-if="change">
				<view class="title">上传凭证（1张）</view>
			</view>
			<view class="upload-box" v-if="change">
				<!-- <view class="title">
					<view class="txt">上传凭证</view>
					<view class="des">( 最多可上传9张 )</view>
				</view> -->
				<view class="upload-img">
					<view class="img-item" v-for="(item,index) in uploadImg" :key="index">
						<image :src="item" mode=""></image>
						<view class="iconfont icon-guanbi1" @click="deleteImg(index)"></view>
					</view>
					<view class="add-img" @click="uploadpic">
						<text class="iconfont icon-icon25201"></text>
						<text class="txt">上传凭证</text>
					</view>
				</view>
			</view>

			<!-- <view class="uni-form-item title_block">
				<view class="title">收款信息</view>
			</view> -->
			<view class="way_2" v-if="change">
				<view class="way_row">提示：上传打款详情截图或照片</view>
			</view>
			<button type="default" @click="charge" class="flex-center btn" hover-class="none">{{rechargeShow?'报名充值':'充 值'}}</button>

			<view class="uni-form-item title_block">
				<view class="title">温馨提示</view>
			</view>
			<view class="text_list" v-if="rechargeShow" v-html="rechargeLook.active.note"></view>
			<view v-else class="text_list">
				1. 额度可由自主充值、平台有赠送奖励；<br>2. 充值金额只能用来消费，不支持提现；<br> 3. 线下转账后请联系客服；
			</view>
		</form>
	</view>
</template>

<script>
	let app = getApp();
	import {
		agent_recharge,
		getRechargeLook
	} from '@/api/user.js';
	import Routine from '@/libs/routine';
	import {
		getWxLoginOpenId
	} from '@/api/public.js';
	import {
		mapGetters
	} from "vuex";
	export default {
		computed: mapGetters(['uid']),
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				tj_btn: true,
				money: '', //自定义充值
				date: currentDate,
				time: '0',
				uploadImg: [],
				numArray: [],
				numIndex: 0,
				active: 1,
				change: false,
				rechargeLook:{},
				rechargeShow:false,
				number:1,
				moneyAll:0,
				type:'',
				isCanjia:true
			}
		},
		onLoad(options) {
			if(options.go){
				uni.setNavigationBarTitle({
				    title: '活动报名'
				});
				getApp().globalData.act_open = 100
				this.rechargeShow = true
				this.type=3
			}
			if (!app.globalData.openid) {
				this.setUserInfoAutoUpdateOpenId()
			}
			this.getRechargeLook()
		},
		computed: {
			// time(){
			// 	let date = new Date()
			// 	return date.getHours()

			// 	console.log(date);
			// },
			amount(){
				if(this.money>=this.rechargeLook.base_money && this.isCanjia){
					return '￥'+Math.floor(this.money*this.rechargeLook.gift_rate)/100;
				}else{
					return 0
				}
			},
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			changeSwi(e){
				this.isCanjia = e.detail.value
			},
			setUserInfoAutoUpdateOpenId() {
				let that = this;
				//#ifdef APP-PLUS
				uni.login({
					success: function(loginRes) {
						app.globalData.openid = loginRes.authResult.openid
					},
					fail() {
					}
				});
				//#endif
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
			moneyall(){
				this.moneyAll = parseFloat((this.number*this.money).toFixed(2))
			},
			cut(){
				if(this.number<=1){
					return 
				}
				this.number--
				this.moneyall()
			},
			add(){
				if(this.number>=30){
					return 
				}
				this.number++
				this.moneyall()
			},
			getRechargeLook(){
				getRechargeLook().then(res=>{
					this.rechargeLook = res.data
					
					if(this.type==3){
						this.money = this.rechargeLook.active.price
						this.moneyall()
					}
					if(this.rechargeLook.online==0){
						this.change = true
					}
				})
			},
			changeTab() {
				if(this.rechargeLook.online!=0){
					this.change = !this.change
				}else{
					uni.showToast({
						title:'线上充值暂未开通',
						icon:'none'
					})
				}
			},
			// 删除图片
			deleteImg(index) {
				this.uploadImg.splice(index, 1)
			},
			/**
			 * 上传文件
			 */
			uploadpic: function() {
				if (this.uploadImg.length < 1) {
					let that = this;
					that.$util.uploadImageOne('upload/image', function(res) {
						that.uploadImg.push(res.data.path);
						that.$set(that, 'uploadImg', that.uploadImg);
					});
				} else {
					uni.showToast({
						title: '最多可上传1张',
						icon: 'none'
					})
				}
			},
			bindDateChange: function(e) {
				this.date = e.target.value
				console.log(this.date, "date")
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
				console.log(this.time, "time")
			},
			getDate: function(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			charge: function() {
				// uni.requestPayment({
				//     provider: 'wxpay',
				//    timeStamp: '1642045221',
				//    nonceStr: 'gt7GbP4Lat3RTQSdKoQGDtLmchAyjzb3',
				//    package: 'prepay_id=wx131140215372370c1edc909dc389070000',
				//    signType: 'RSA',
				//    paySign: 'WUj4mixGOrv3QMXTm4g8BzcwCHIjJqXdJS\/cKrhxDBUJf8fQGZsdvLyrkhlbLYo0kUmtrb2Nb1LFF6yig3Hl35OZ1v\/6gb7oQ3PSejUHp1GAjb3dRj7GbDx4HQv0skuUhwNeNsASJbwEjv5lP7sHgqZwqunjl5ODAebxgAVQ0Yh7OrdiIKUUaRvPUTNc+t0fwj4NX2dgWFlUg6YWxolbJybYyRva4lHMYVZHGVZwgd5kuFC252hcszi4BuTwGac9Kil+SCOfV4tAoDnGk0uAA08R+CGYevaUXZXcIEA8d74ntQl063HiCV8we3OPvP4p2trMieQuth\/xY2d\/S0nVVw==',
				//     success: function (res) {
				//         console.log('success:' + JSON.stringify(res));
				//     },
				//     fail: function (err) {
				//         console.log('fail:' + JSON.stringify(err));
				//     }
				// });
				let that = this;
				if(this.type==3){
					return that.chongZhi(this.type)
				}
				let money = this.money;
				let tmplId1 = 'VGyuIo6FXAcqJkYOYgZ5RHHW7RBuFyC3Ka5RFTkOV6s'
				if (isNaN(money) || money == 0 || money < 0) {
					this.$util.Tips({
						title: '请正确填写充值金额'
					});
					return false;
				}
				if (this.change) {
					let dates = this.date + " " + this.time;
					
					if (this.date == "" || this.time == "0" || this.time == "") {
						this.$util.Tips({
							title: '请选择充值的日期与时间'
						});
						return false;
					}
					if (this.uploadImg.length == 0) {
						this.$util.Tips({
							title: '请上传充值拍照凭证'
						});
						return false;
					}
					// #ifndef H5 || APP-PLUS
					uni.requestSubscribeMessage({
						tmplIds: [tmplId1],
						success(res) {
							if (res[tmplId1] == 'accept') {
								that.chongZhi(1)
							} else {
								that.chongZhi(1)
							}
						},
						fail(res) {}
					})
					// #endif
					// #ifdef APP-PLUS || H5
					that.chongZhi(1)
					// #endif

				} else {
					if(this.rechargeLook.max_money<this.money){
						return uni.showToast({
							title:'线上充值最大不能超过'+this.rechargeLook.max_money+'元',
							icon:'none'
						})
					}
					// #ifndef H5 || APP-PLUS
					uni.requestSubscribeMessage({
						tmplIds: [tmplId1],
						success(res) {
							if (res[tmplId1] == 'accept') {
								that.chongZhi(2)
							} else {
								that.chongZhi(2)
							}
						},
						fail(res) {}
					})
					// #endif
					// #ifdef APP-PLUS || H5
					that.chongZhi(2)
					// #endif
				}
			},
			chongZhi(type) {
				let that = this
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				let date = ''
				let pay_time = ''
				if (type == 1) {
					date = this.date
					pay_time = this.time + ":00"
				}
				let money = type==3?this.moneyAll:this.money
				let data = {
					"openid":app.globalData.openid,
					"type": type,
					"price": money,
					"image": this.uploadImg.join(","),
					"pay_date": date,
					"pay_time": pay_time,
					"join":this.isCanjia?1:0
				};
				agent_recharge(data).then(res => {
					console.log(res);
					uni.hideLoading();
					if (type == 1) {
						uni.showToast({
							title: res.message,
							icon: 'success',
							duration: 2000
						});
						uni.redirectTo({
							url: "./logs"
						})
					} else {
						let payInfo;
						if(!res.data.result.pay_info){
							return uni.showToast({
								title: '提示支付参数错误，请重试',
								icon: 'none'
							})
						}else{
							payInfo = res.data.result.pay_info
						}
						uni.showLoading({
							title: '支付中',
							mask: true
						});
						if (payInfo == -1) {
							return uni.showToast({
								title: '暂未开放此功能',
								icon: 'none'
							})
						} else {
							uni.requestPayment({
								provider: 'wxpay',
								...payInfo,
								success: function(res) {
									uni.hideLoading();
									return that.$util.Tips({
										title: '支付成功',
										icon: 'success'
									}, {
										tab: 5,
										url: '/pages/users/recharge/logs'
									});
								},
								fail: function(e) {
									uni.hideLoading();
									return that.$util.Tips({
										title: '取消支付'
									});
								},
							})
						}
					}

				}).catch(err => {
					uni.hideLoading();
					return that.$util.Tips({
						title: err
					});
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.isCanjia{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px;
		text{
			font-size: 30rpx;
		}
	}
	.form_body .uni-form-item {
		margin: 0;
	}
	.flex-frist{
		justify-content: flex-start;
	}
	.cut,
	.add{
		width: 50rpx;
		height: 50rpx;
		box-shadow: 0rpx 0rpx 4rpx 2rpx rgba(0,0,0,.2);
	}
	.number{
		width: 100rpx !important;
		text-align: center;
	}
	.tip{
		display: flex;
		padding-left: 15px;
		image{
			width: 40rpx;
			height: 40rpx;
			margin-right: 10rpx;
		}
	}
	.recharge_body {
		margin-top: 20rpx;
		background: #fff;
		padding-bottom: 110rpx;

		.title_block {
			width: 100%;

			.title {
				position: relative;

				&::after {
					content: ' ';
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					margin: auto;
					width: 6rpx;
					height: 32rpx;
					background: #1698AE;
				}

				white-space:nowrap;
				font-size:30rpx;
				font-weight: 500;
				color: #333333;
				padding-left:24rpx;

				text {
					font-size: 24rpx;
					font-weight: 500;
					color: #999999;
				}
			}
		}

		.footer-img {
			width: 32rpx;
			height: 32rpx;
			margin-top: 4rpx;
		}

		.uni-form-item {
			input {
				width: 100%;
				height: 105rpx;
			}
		}

		.block {
			padding: 0 35rpx;
		}

		.radio_block {
			flex-wrap: wrap;

			.radio_item {
				width: 200rpx;
				height: 130rpx;
				background: #FFFFFF;
				border: 2rpx solid #E6E6E6;
				flex-direction: column;
				margin-bottom: 37rpx;

				.radio-price {
					font-size: 24rpx;
					color: #666666;
					margin-bottom: 10rpx;

					text {
						font-weight: bold;
						font-size: 32rpx;
					}
				}

				.song {
					font-size: 20rpx;
					color: #666666;
				}

				&.active {
					border: 2rpx solid #1698AE;

					.radio-price {
						color: #1698AE;
					}

					.song {
						color: #1698AE;
					}
				}
			}
		}

		.arrival {
			text-align: right;
		}

		.uni-list_body {
			padding: 0 40rpx;
		}

		.text_list {
			padding: 0 50rpx;
			font-size: 24rpx;
			color: #666666;
			line-height: 40rpx;
			padding-bottom: 60rpx;
		}
		.text_list2 {
			padding: 0 50rpx;
			font-size: 24rpx;
			color: #666666;
			line-height: 40rpx;
		}

		.way_2 {
			background: #F5F5F5;
			margin: 0 40rpx;
			padding: 35rpx 40rpx;

			.way_title {
				font-size: 24rpx;
				font-weight: bold;
				color: #000000;
				line-height: normal;
				margin-bottom: 30rpx;
			}

			.way_row {
				font-size: 24rpx;
				font-weight: 500;
				color: #333333;
				line-height: normal;

				&:last-child {
					color: #999999;
				}
			}
		}

		.btn {
			width: 690rpx;
			height: 102rpx;
			background: #1698AE;
			border-radius: 3px;
			font-size: 16px;
			font-weight: 500;
			color: #FFFFFF;
			margin: 48rpx auto 30rpx;
		}
	}

	.money {
		font-size: 50rpx;
		color: #F7302A;
	}

	.upload-box {
		padding: 30rpx;
		background-color: #fff;

		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 30rpx;

			.des {
				color: #BBBBBB;
			}
		}

		.upload-img {
			display: flex;
			flex-wrap: wrap;

			// margin-top: 20rpx;
			.img-item {
				position: relative;
				width: 156rpx;
				height: 156rpx;
				margin-right: 24rpx;
				margin-top: 20rpx;

				image {
					width: 156rpx;
					height: 156rpx;
					border-radius: 8rpx;
				}

				.iconfont {
					position: absolute;
					right: -15rpx;
					top: -20rpx;
					font-size: 40rpx;
					color: #DDDDDD;
				}
			}

			.add-img {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 156rpx;
				height: 156rpx;
				margin-top: 20rpx;
				border: 1px solid #DDDDDD;
				border-radius: 3rpx;
				color: #BBBBBB;
				font-size: 24rpx;

				.iconfont {
					margin-bottom: 10rpx;
					font-size: 50rpx;
				}
			}
		}
	}

	.btn-box {
		width: 690rpx;
		height: 86rpx;
		margin: 70rpx auto;
		line-height: 86rpx;
		text-align: center;
		color: #fff;
		background: #DDDDDD;
		border-radius: 43rpx;
		font-size: 32rpx;
	}
</style>
