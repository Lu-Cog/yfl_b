<template>
	<view>
		<view class='order-details'>			
			<view>
				<view class='header bg-color acea-row row-middle' :class='isGoodsReturn ? "on":""'>
					<view class='pictrue' v-if="isGoodsReturn==false">
						<i class="iconfont icon-fapiao fapiao"></i>
					</view>
					<view class='data'>
						<view class='state'>
							<block v-if="orderInfo.status == 1">未开票</block>
							<block v-else>已开票</block>
						</view>
						<view>{{orderInfo.pay_time}}</view>
					</view>
				</view>				
			</view>	
						
			<view class='wrapper'>
				<view class='item acea-row row-between' v-if="orderInfo.pay_postage > 0">
					<view>运费：</view>
					<view class='conter'>+￥{{orderInfo.pay_postage}}</view>
				</view>
				<view class='item acea-row row-between' v-if='orderInfo.coupon_id'>
					<view>优惠券抵扣：</view>
					<view class='conter'>-￥{{orderInfo.coupon_price}}</view>
				</view>
				<view class='item acea-row row-between' v-if="orderInfo.activity_type == 2">
					<view>实付款：</view>
					<view class='conter'>￥{{orderInfo.presell_price}}</view>
				</view>
				<view class='item acea-row row-between' v-else>
					<view>实付款：</view>
					<view class='conter'>￥{{orderInfo.pay_price}}</view>
				</view>
			</view>
			
			<view style='height:120rpx;'></view>
			<view class='footer acea-row row-right row-middle'>				
				<view class=" acea-row row-right row-middle">
					<view class="bnt cancel" @click.stop="goGoodCall">联系客服</view>
				</view>
			</view>
		</view>
		<!-- #ifdef MP -->
		<!-- <authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize> -->
		<!-- #endif -->
	</view>
</template>
<style scoped lang="scss">
	.merchant {
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		margin-top: 15rpx;
		border-bottom: 2rpx solid #f0f0f0;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		box-sizing: border-box;
		background-color: #fff;
		.iconfont {
			margin-top: 6rpx;
			font-size: 22rpx;
		}
	}

	.goodCall {
		text-align: center;
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 30rpx;
		line-height: 86rpx;
		background: #fff;
		color: #282828;

		.icon-kefu {
			font-size: 28rpx;
			margin-right: 15rpx;
		}

		/* #ifdef MP */
		button {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 86rpx;
			font-size: 30rpx;
			color: #e93323;
		}

		/* #endif */
	}

	.order-details .header {
		padding: 0 30rpx;
		height: 150rpx;
		&.presell_header{
			background-image: url(~static/images/presell_order.jpg);
			background-repeat: no-repeat;
			background-size: cover;
			padding: 35rpx 50rpx;
			.data{
				margin: 8rpx 0 0 13rpx;
				.state{
					font-weight: normal;
					font-size: 24rpx;
				}
			}
		}
	}

	.order-details .header.on {
		background-color: #666 !important;
	}

	.order-details .header .pictrue {
		width: 110rpx;
		height: 110rpx;
	}

	.order-details .header .pictrue .fapiao {
		width: 100%;
		height: 100%;
		color: #fff;
		font-size: 80rpx
	}

	.order-details .header .data {
		color: rgba(255, 255, 255, 0.8);
		font-size: 24rpx;
		margin-left: 27rpx;
	}

	.order-details .header .data.on {
		margin-left: 0;
	}

	.order-details .header .data .state {
		font-size: 30rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 7rpx;
	}
	.presell_header .presell_payment{
		color: #fff;
		font-size: 30rpx;
		font-weight: bold;
		.iconfont{
			font-weight: normal;
			margin-right: 8rpx;
		}
	}
	.order-details .header .data .time {
		margin-left: 20rpx;
	}

	.order-details .nav {
		background-color: #fff;
		font-size: 26rpx;
		color: #282828;
		padding: 25rpx 0;
	}

	.order-details .nav .navCon {
		padding: 0 40rpx;
	}

	.order-details .nav .on {
		color: #e93323;
	}

	.order-details .nav .progress {
		padding: 0 65rpx;
		margin-top: 10rpx;
	}

	.order-details .nav .progress .line {
		width: 100rpx;
		height: 2rpx;
		background-color: #939390;
	}

	.order-details .nav .progress .iconfont {
		font-size: 25rpx;
		color: #939390;
		margin-top: -2rpx;
	}

	.order-details .address {
		font-size: 26rpx;
		color: #868686;
		background-color: #fff;
		margin-top: 13rpx;
		padding: 35rpx 30rpx;
	}

	.order-details .address .name {
		font-size: 30rpx;
		color: #282828;
		margin-bottom: 15rpx;
	}

	.order-details .address .name .phone {
		margin-left: 40rpx;
	}

	.order-details .line {
		width: 100%;
		height: 3rpx;
	}

	.order-details .line image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .wrapper {
		background-color: #fff;
		margin-top: 12rpx;
		padding: 30rpx;
	}

	.order-details .wrapper .item {
		font-size: 28rpx;
		color: #282828;
	}

	.order-details .wrapper .item~.item {
		margin-top: 20rpx;
	}

	.order-details .wrapper .item .conter {
		color: #868686;
		width: 460rpx;
		text-align: right;
	}

	.order-details .wrapper .item .conter .copy {
		font-size: 20rpx;
		color: #333;
		border-radius: 17rpx;
		border: 1rpx solid #666;
		padding: 3rpx 15rpx;
		margin-left: 24rpx;

	}

	.order-details .wrapper .actualPay {
		border-top: 1rpx solid #eee;
		margin-top: 30rpx;
		padding-top: 30rpx;
	}

	.order-details .wrapper .actualPay .money {
		font-weight: bold;
		font-size: 30rpx;
	}

	.order-details .footer {
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.order-details .footer .bnt {
		width: 176rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
		margin-left: 20rpx;
		&.btn_auto{
			width: auto;
			padding: 0 40rpx;
		}
	}

	.order-details .footer .bnt.cancel {
		color: #aaa;
		border: 1rpx solid #ddd;
	}

	.order-details .footer .bnt~.bnt {
		margin-left: 18rpx;
	}

	.order-details .writeOff {
		background-color: #fff;
		margin-top: 13rpx;
		padding-bottom: 30rpx;
	}

	.order-details .writeOff .title {
		font-size: 30rpx;
		color: #282828;
		height: 87rpx;
		border-bottom: 1px solid #f0f0f0;
		padding: 0 30rpx;
		line-height: 87rpx;
	}

	.order-details .writeOff .grayBg {
		background-color: #f2f5f7;
		width: 590rpx;
		height: 384rpx;
		border-radius: 20rpx 20rpx 0 0;
		margin: 50rpx auto 0 auto;
		padding-top: 55rpx;
	}

	.order-details .writeOff .grayBg .pictrue {
		width: 290rpx;
		height: 290rpx;
		margin: 0 auto;
	}

	.order-details .writeOff .grayBg .pictrue image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .writeOff .gear {
		width: 590rpx;
		height: 30rpx;
		margin: 0 auto;
	}

	.order-details .writeOff .gear image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .writeOff .num {
		background-color: #f0c34c;
		width: 590rpx;
		height: 84rpx;
		color: #282828;
		font-size: 48rpx;
		margin: 0 auto;
		border-radius: 0 0 20rpx 20rpx;
		text-align: center;
		padding-top: 4rpx;
	}

	.order-details .writeOff .rules {
		margin: 46rpx 30rpx 0 30rpx;
		border-top: 1px solid #f0f0f0;
		padding-top: 10rpx;
	}

	.order-details .writeOff .rules .item {
		margin-top: 20rpx;
	}

	.order-details .writeOff .rules .item .rulesTitle {
		font-size: 28rpx;
		color: #282828;
	}

	.order-details .writeOff .rules .item .rulesTitle .iconfont {
		font-size: 30rpx;
		color: #333;
		margin-right: 8rpx;
		margin-top: 5rpx;
	}

	.order-details .writeOff .rules .item .info {
		font-size: 28rpx;
		color: #999;
		margin-top: 7rpx;
	}

	.order-details .writeOff .rules .item .info .time {
		margin-left: 20rpx;
	}

	.order-details .map {
		height: 86rpx;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		border-bottom: 1px solid #f0f0f0;
		margin-top: 13rpx;
		background-color: #fff;
		padding: 0 30rpx;
	}

	.order-details .map .place {
		font-size: 26rpx;
		width: 176rpx;
		height: 50rpx;
		border-radius: 25rpx;
		line-height: 50rpx;
		text-align: center;
	}

	.order-details .map .place .iconfont {
		font-size: 27rpx;
		height: 27rpx;
		line-height: 27rpx;
		margin: 2rpx 3rpx 0 0;
	}

	.order-details .address .name .iconfont {
		font-size: 34rpx;
		margin-left: 10rpx;
	}

	.refund {
		padding: 0 30rpx 30rpx;
		margin-top: 24rpx;
		background-color: #fff;

		.title {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: #333;
			height: 86rpx;
			border-bottom: 1px solid #f5f5f5;

			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}

		.con {
			padding-top: 25rpx;
			font-size: 28rpx;
			color: #868686;
		}
	}
</style>

<script>
	let app = getApp();
	import { HTTP_REQUEST_URL } from '@/config/app';
	import {
		getOrderDetail,
		orderAgain,
		orderTake,
		orderDel,
		unOrderCancel,
		verifyCode,
		receiptOrder
	} from '@/api/order.js';
	import {
		openOrderRefundSubscribe
	} from '@/utils/SubscribeMessage.js';

	import orderGoods from "@/components/orderGoods";
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from "vuex";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	export default {
		components: {
			orderGoods,
			// #ifdef MP
			authorize
			// #endif
		},
		data() {
			return {
				order_id: '',
				evaluate: 0,
				activityType: 0,
				cartInfo: [], //购物车产品
				orderInfo: {
					system_store: {},
					_status: {},
					take: {}
				}, //订单详情
				system_store: {},
				isGoodsReturn: false, //是否为退款订单
				status: {}, //订单底部按钮状态
				isClose: false,
	
				pay_close: false,
				pay_order_id: '',
				totalPrice: '0',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				refundNum: [], //退款个数临时数据
				imgUrl:HTTP_REQUEST_URL,
				codeUrl:'',
				isTimePay: false,
				hide_mer_status: app.globalData.hide_mer_status
			};
		},
		computed:{
			...mapGetters(['isLogin', 'uid']),
		},
		filters:{
			filterDay(val){
				if(val){
					var reg =/(\d{4})\-(\d{2})\-(\d{2})/;
					var date = val.replace(reg,"$2月$3日");
					return date
				}
			}
		},
		onLoad: function(options) {
			if (options.order_id) {
				this.$set(this, 'order_id', options.order_id);
			}
		},
		onShow() {
			if (this.isLogin) {
				this.getOrderInfo();
				this.isPayBalance();
			} else {
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif 
				// #ifdef MP
				this.isAuto = true;
				this.$set(this, 'isShowAuth', true);
				// #endif
			}
			
		},
		onHide: function() {
			this.isClose = true;
		},
		onReady: function() {
			// #ifdef H5
			this.$nextTick(function() {
				const clipboard = new ClipboardJS(".copy-data");
				clipboard.on("success", () => {
					this.$util.Tips({
						title: '复制成功'
					});
				});
			});
			// #endif
		},
		methods: {
		
			
			// 联系客服
			goGoodCall() {
				let self = this
				uni.navigateTo({
					url: `/pages/chat/customer_list/chat?mer_id=${self.orderInfo.mer_id}&uid=${this.uid}&order_id=${this.order_id}`
				})
			},
			
			/**
			 * 事件回调
			 * 
			 */
			onChangeFun: function(e) {
				let opt = e;
				let action = opt.action || null;
				let value = opt.value != undefined ? opt.value : null;
				(action && this[action]) && this[action](value);
			},
			/**
			 * 拨打电话
			 */
			makePhone: function() {
				uni.makePhoneCall({
					phoneNumber: this.orderInfo.take.mer_take_phone
				})
			},
			
			/**
			 * 关闭支付组件
			 * 
			 */
			payClose: function() {
				this.pay_close = false;
			},
			/**
			 * 打开支付组件
			 * 
			 */
			pay_open: function() {
				this.pay_close = true;
				this.pay_order_id = this.orderInfo.order_id.toString();
				this.totalPrice = this.orderInfo.pay_price;
			},
			/**
			 * 支付成功回调
			 * 
			 */
			pay_complete: function() {
				this.pay_close = false;
				this.pay_order_id = '';
				this.getOrderInfo();
			},
			/**
			 * 支付失败回调
			 * 
			 */
			pay_fail: function() {
				this.pay_close = false;
				this.pay_order_id = '';
			},
			/**
			 * 登录授权回调
			 * 
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getOrderInfo();
	
			},
			getOrderCode(){
				verifyCode(this.order_id).then(res=>{
					this.codeUrl = res.data.qrcode
				})
			},
			/**
			 * 获取订单详细信息
			 * 
			 */
			getOrderInfo: function() {
				let that = this;
				uni.showLoading({
					title: "正在加载中"
				});
				receiptOrder(this.order_id).then(res => {
					// let _type = res.data._status._type;
					uni.hideLoading();
					that.$set(that, 'orderInfo', res.data);
					that.orderInfo.take = res.data.take ? res.data.take: {}
					that.$set(that, 'cartInfo', res.data.orderProduct);
					if (this.orderInfo.status == '-1') {
						this.isGoodsReturn = true;
					}
					res.data.orderProduct.map(el => {
						if (el.refund_num == 0) {
							this.refundNum.push(el)
						}
					})
					
					if(res.data.order_type == 1){
						// verifyCode
						this.getOrderCode()
					}					
					// that.getOrderStatus();
				}).catch(err => {
					uni.hideLoading();
					that.$util.Tips({
						title: err
					}, '/pages/users/order_list/index');
				});
			},
			/**
			 * 
			 * 剪切订单号
			 */
			// #ifndef H5
			copy: function() {
				let that = this;
				console.log(that.orderInfo.order_sn)
				uni.setClipboardData({
					data: that.orderInfo.order_sn,
					success: function(res){
					}
					
				});
			},
			// #endif
			/**
			 * 打电话
			 */
			goTel: function() {
				uni.makePhoneCall({
					phoneNumber: this.orderInfo.delivery_id
				})
			},
			/**
			 * 去拼团详情
			 * 
			 */
			goJoinPink: function() {
				uni.navigateTo({
					url: '/pages/activity/goods_combination_status/index?id=' + this.orderInfo.pink_id,
				});
			},
			/**
			 * 再此购买
			 * 
			 */
			goOrderConfirm: function() {
				let that = this;
				let data = []
				this.cartInfo.map((item, index) => {
					let obj = {}
					obj.product_id = item.product_id
					obj.product_attr_unique = item.product_sku
					obj.cart_num = item.product_num
					data.push(obj)
				})

				orderAgain({
					data: data
				}).then(res => {
					let cart_id = res.data.cart_id.join(',')
					console.log(cart_id)
					return uni.navigateTo({
						url: '/pages/users/order_confirm/index?cartId=' + cart_id
					});
				});
			},
			confirmOrder: function() {
				let that = this;
				uni.showModal({
					title: '确认收货',
					content: '为保障权益，请收到货确认无误后，再确认收货',
					success: function(res) {
						if (res.confirm) {
							orderTake(that.order_id).then(res => {
								return that.$util.Tips({
									title: '操作成功',
									icon: 'success'
								}, function() {
									that.getOrderInfo();
								});
							}).catch(err => {
								return that.$util.Tips({
									title: err
								});
							})
						}
					}
				})
			},
			/**
			 * 
			 * 删除订单
			 */
			delOrder: function() {
				let that = this;
				orderDel(this.order_id).then(res => {
					return that.$util.Tips({
						title: '删除成功',
						icon: 'success'
					}, {
						tab: 3,
						url: 1
					});
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				});
			},
			cancelOrder() {
				let self = this
				uni.showModal({
					title: '提示',
					content: '确认取消该订单?',
					success: function(res) {
						if (res.confirm) {
							orderDel(self.orderInfo.order_id)
								.then((data) => {
									console.log(data)
									self.$util.Tips({
										title: data.msg
									}, {
										tab: 3
									})
								})
								.catch((err) => {
									return self.$util.Tips({
										title: err
									});
								});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
		}
	}
</script>

<style>
	.qs-btn {
		width: auto;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
		padding: 0 3%;
		color: #aaa;
		border: 1px solid #ddd;
		margin-right: 20rpx;
	}
</style>
