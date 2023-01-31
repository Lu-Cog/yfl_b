<template>
	<view>
		<view class='my-order'>
			<view class='header bg-color'>
				<view class='picTxt acea-row row-between-wrapper'>
					<view class='text'>
						<view class='name'>{{deliver==1?'发货单信息':'订货单信息'}}</view>
						<view>总数量：{{orderData.orderCount || 0}} 总金额：￥{{orderData.orderPrice || 0}}</view>
					</view>
					<view class='pictrue'>
						<image src='/static/images/orderTime.png'></image>
					</view>
				</view>
			</view>
			<view class='nav acea-row row-around'>
				<view class='item' :class='orderStatus==-2 ? "on": ""' @click="statusClick(-2)">
					<view>全部</view>
					<view class='num'>{{orderData.all || 0}}</view>
				</view>
				<view class='item' :class='orderStatus==-1 ? "on": ""' @click="statusClick(-1)">
					<view>待付款</view>
					<view class='num'>{{orderData.noPay || 0}}</view>
				</view>
				<view class='item' :class='orderStatus==0 ? "on": ""' @click="statusClick(0)">
					<view>待发货</view>
					<view class='num'>{{orderData.noPostage || 0}}</view>
				</view>
				<view class='item' :class='orderStatus==1 ? "on": ""' @click="statusClick(1)">
					<view>待收货</view>
					<view class='num '>{{orderData.noDeliver || 0}}</view>
				</view>

				<view class='item' :class='orderStatus==3 ? "on": ""' @click="statusClick(3)">
					<view>已完成</view>
					<view class='num '>{{orderData.done || 0}}</view>
				</view>
				<!-- <view class='item' :class='orderStatus==2 ? "on": ""' @click="statusClick(2)">
					<view>待评价</view>
					<view class='num'>{{orderData.noComment || 0}}</view>
				</view> -->
			</view>

			<view class='list'>
				<!-- 代付款 -->

				<view class='item' v-for="(item,index) in orderList" :key="index">
					<view @click='goOrderDetails(item.group_order_id,item.orderProduct)'>
						<view class='title acea-row row-between-wrapper'>
							<view class="acea-row row-middle left-wrapper">
								<view class="store-name">订单号：{{item.order_sn}}</view>
							</view>

							<view class='state' v-if="item.status == -2">
								已取消
							</view>
							<view class='state' v-else>
								<view v-if="item.paid == 0" class='font-color'>待付款</view>
								<view v-if="item.paid == 2" class='font-color'>部分付款</view>
								<view v-if="item.paid == 1 && item.status == 0" class='font-color'>待发货</view>
								<view v-if="item.status == 1" class='font-color'>待收货</view>
								<!-- <view v-if="item.status == 2" class='font-color'>待评价</view> -->
								<view v-if="item.status == 3" class='font-color'>已完成</view>
								<view v-if="item.status == -1" class='font-color'>已退款</view>
							</view>
						</view>

						<view class='item-info acea-row row-between row-top' v-for="(goods,index) in item.orderProduct"
							:key="index">
							<view class='pictrue'>
								<image
									:src='(goods.cart_info.productAttr && goods.cart_info.productAttr.image) || goods.cart_info.product.image'>
								</image>
							</view>
							<view class='text acea-row row-between'>
								<view class='name '>
									<view class='name line2'>
										<text>{{goods.cart_info.product.store_name}}</text>
									</view>
									<view class='infor line1'><text>单位：{{goods.cart_info.product.unit_name}}</text><text
											v-if="goods.cart_info.productAttr.sku">，规格：{{goods.cart_info.productAttr.sku}}</text>
									</view>
									<view style="margin-top: 10rpx; color: red;">
										{{goods.is_refund==1?'退款中':goods.is_refund==2?'部分退款':goods.is_refund==3?'全部退款':''}}
									</view>
								</view>
								<view class='money'>
									<view>￥{{$util.moneyAct(goods.cart_info.productAttr.price)}}</view>
									<view>x{{goods.product_num}}</view>
								</view>
							</view>
						</view>

						<view class='totalPrice' v-if="item.activity_type == 2">共{{item.orderNum || 0}}件商品，总金额
							<text class='money font-color'>￥{{$util.moneyAct(item.presell_price)}}</text>
						</view>
						<view class='totalPrice' v-else>共{{item.orderNum || 0}}件商品，总金额
							<text class='money font-color'>￥{{$util.moneyAct(item.pay_price)}}</text>
						</view>

					</view>
					<view class='bottom acea-row row-right row-middle'>

						<view v-if="item.paid == 0 && item.status == 0" class='bnt cancelBnt'
							@click='cancelOrder(item.group_order_id)'>取消订单</view>
						
						<view v-if="item.paid == 1 && item.status == 0 && deliver == 1" class='bnt bg-color'
							@click='confirmOrder(item.order_id,1)'>发货</view>
						<view v-if="item.paid == 1 && item.status == 1 && deliver != 1" class='bnt bg-color'
							@click='confirmOrder(item.order_id,2)'>确认收货</view>

						<view class='bnt bg-color' @click='goOrderDetails(item.group_order_id,item.orderProduct)'>查看详情
						</view>

						<!-- <view class='bnt cancelBnt' @click.stop='cancelOrder2(index,item.group_order_id)'>取消订单</view>
								<view class='bnt bg-color' @click.stop='goPay2(item.pay_price,item.group_order_id)'>立即付款</view>
								<view class='bnt cancelBnt' v-if="item._status._type == 1" @click='cancelOrder(index,item.order_id)'>申请退款</view>
								<view class='bnt cancelBnt' v-if="item._status._type == 2" @click='goOrderDetails(item.order_id)'>查看物流</view>
								<view class='bnt bg-color' v-if="item._status._type == 2" @click='goOrderDetails(item.order_id)'>确认收货</view>
								<view class='bnt cancelBnt' v-if="item._status._type == 3" @click='goOrderDetails(item.order_id)'>再次购买</view>
								<view class='bnt bg-color' v-if="item._status._type == 3" @click='goOrderDetails(item.order_id)'>去评价</view>
								<view class='bnt bg-color' v-if="item._status._type == 4" @click='goOrderDetails(item.order_id)'>再次购买</view> -->

					</view>

				</view>

				<!-- 待发货 待收货 待评价 已完成 -->
			</view>
			<view class='loadingicon acea-row row-center-wrapper' v-if="orderList.length>5">
				<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
			</view>
			<view v-if="orderList.length == 0">
				<emptyPage title="暂无订单~"></emptyPage>
			</view>
		</view>
		<view class='noCart' v-if="orderList.length == 0 && page > 1">
			<view class='pictrue'>
				<image src='/images/noOrder.png'></image>
			</view>
		</view>
		<!-- #ifdef MP -->
		<!-- <authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize> -->
		<!-- #endif -->
		<payment :payMode='payMode' :pay_close="pay_close" @onChangeFun='onChangeFun' :order_id="pay_order_id"
			:totalPrice='totalPrice'></payment>
	</view>
</template>

<script>
	let app = getApp();
	import {
		getOrderList,
		orderData,
		unOrderCancel,
		orderDel,
		orderPay,
		groupOrderList,
		orderTake
	} from '@/api/order.js';
	import {
		getUserInfo
	} from '@/api/user.js';
	import {
		openOrderSubscribe
	} from '@/utils/SubscribeMessage.js';
	import payment from '@/components/payment';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		getconfig,
	} from '@/api/public.js'
	import {
		mapGetters
	} from "vuex";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	import emptyPage from '@/components/emptyPage.vue'
	export default {
		components: {
			payment,
			emptyPage,
			// #ifdef MP
			authorize
			// #endif
		},
		data() {
			return {
				loading: false, //是否加载中
				loadend: false, //是否加载完毕
				loadTitle: '加载更多', //提示语
				orderList: [], //订单数组
				presellProList: [], //定金预售订单
				presellOrderCount: 0,
				orderData: {}, //订单详细统计
				orderStatus: -2, //订单状态
				paid: -1, //支付状态 0 未付款 1全部付款 2部分付款
				page: 1,
				limit: 20,
				payMode: [{
						name: "微信支付",
						icon: "icon-weixinzhifu",
						value: 'wechat',
						title: '微信快捷支付',
						payStatus: 1
					},
					// {
					// 	name: "支付宝支付",
					// 	icon: "icon-zhifubao",			
					// 	value: 'alipay',
					// 	title: '支付宝支付',
					// 	payStatus: app.globalData.alipay_open	
					// },
					// {
					// 	name: "余额支付",
					// 	icon: "icon-yuezhifu",
					// 	value: 'balance',
					// 	title: '可用余额:',
					// 	number: 0,
					// 	payStatus: app.globalData.yue_pay_status
					// }
				],
				pay_close: false,
				pay_order_id: '',
				totalPrice: '0',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				hide_mer_status: app.globalData.hide_mer_status,
				deliver: 0, //0表示批发订单，1表示管理C订单
			};
		},
		computed: mapGetters(['isLogin']),

		//强制返回 我的 页面
		onBackPress(e) {
			uni.switchTab({
				url: '/pages/wallet/index'
			});
			return true;
		},
		onShow() {
			if (this.isLogin) {
				this.$set(this, 'orderList', []);
				this.page = 1;
				this.loadend = false;
				this.getOrderData();
				this.getOrderList();
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			if (options.status) this.orderStatus = options.status;
			if (options.deliver) this.deliver = options.deliver;
			if (options.status == -2) {
				this.paid = -1; //-1表示无状态
			}
			if (options.status == -1) {
				this.paid = 0;
			}
			if (options.status >= 0) {
				this.paid = 1;
			}
			console.log(this.orderStatus, "status");

			if (this.isLogin) {
				this.$set(this, 'orderList', []);
				this.page = 1;
				this.loadend = false;
				this.getOrderData();
				this.getOrderList();
				// this.getUserInfo();
				// this.getpreSellOrderList();
			} else {
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif 
				// #ifdef MP
				this.isAuto = true;
				this.$set(this, 'isShowAuth', true);
				// #endif
			}


			// // 获取配置
			// getconfig().then(res => {
			// 	debugger
			// 	this.payMode[1].yue_pay_status = res.data.yue_pay_status
			// 	this.payMode[2].alipay_open = res.data.alipay_open
			// 	try {

			// 	} catch (e) {
			// 		// error
			// 	}
			// 	// #ifdef H5
			// 	this.setOpenShare(res.data);
			// 	// #endif
			// }).catch(err => {})
		},
		methods: {
			// 去商铺
			goMall(item) {
				return;
				if (this.hide_mer_status == 0) {
					uni.navigateTo({
						url: '/pages/store/home/index?id=' + item.mer_id
					})
				}

			},
			onLoadFun() {
				this.isShowAuth = false;
				// this.getOrderData();
				// this.getOrderList();
				// this.getUserInfo();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
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
			 * 获取用户信息
			 * 
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.payMode[2].number = res.data.now_money;
					// that.$set(that, 'payMode', that.payMode);
				});
			},
			/**
			 * 关闭支付组件
			 * 
			 */
			payClose: function() {
				this.pay_close = false;
			},

			/**
			 * 获取订单统计数据
			 * 
			 */
			getOrderData: function() {
				let that = this;
				orderData({
					deliver: that.deliver
				}).then(res => {
					that.$set(that, 'orderData', res.data);
				})
			},

			/**
			 * 打开支付组件
			 * 
			 */
			goPay: function(pay_price, order_id) {
				this.$set(this, 'pay_close', true);
				this.order_id = order_id;
				this.pay_order_id = order_id.toString()
				// this.$set(this, 'pay_order_id', );
				this.$set(this, 'totalPrice', pay_price);
			},
			/**
			 * 支付成功回调
			 * 
			 */
			pay_complete: function() {
				this.loadend = false;
				this.page = 1;
				this.$set(this, 'orderList', []);
				this.pay_close = false;
				this.pay_order_id = '';
				this.getOrderData();
				this.getOrderList();
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
			 * 跳转订单详情
			 */
			goOrderDetails: function(order_id, orderProduct) {
				let self = this
				if (!order_id) return this.$util.Tips({
					title: '缺少订单号无法查看订单详情'
				});
				// #ifdef MP
				uni.showLoading({
					title: '正在加载',
				})
				openOrderSubscribe().then(() => {
					uni.hideLoading();

					uni.navigateTo({
						url: '/pages/order_details/index?deliver=' + this.deliver + '&order_id=' +
							order_id + '&orderProduct=' + JSON.stringify(orderProduct)
					})

					// if (self.orderStatus == 0) {
					// 	uni.navigateTo({
					// 		url: '/pages/order_details/stay?order_id=' + order_id
					// 	})
					// } else {

					// }
				}).catch(() => {
					uni.hideLoading();
				})
				// #endif  
				// #ifndef MP
				if (self.orderStatus == 0) {
					uni.navigateTo({
						url: '/pages/order_details/stay?deliver=' + this.deliver + '&order_id=' + order_id +
							'&orderProduct=' + JSON.stringify(orderProduct)
					})
				} else {
					uni.navigateTo({
						url: '/pages/order_details/index?deliver=' + this.deliver + '&order_id=' + order_id +
							'&orderProduct=' + JSON.stringify(orderProduct)
					})
				}
				// #endif
			},
			/**
			 * 点击去评价
			 */
			goOrderDetails_Evaluation: function(order_id) {
				let self = this
				if (!order_id) return that.$util.Tips({
					title: '缺少订单号无法查看订单详情和评价'
				});
				// #ifdef MP			
				if (self.orderStatus == 0) {
					uni.navigateTo({
						url: '/pages/order_details/stay?order_id=' + order_id
					})
				} else {
					uni.navigateTo({
						url: '/pages/order_details/index?order_id=' + order_id
					})
				}
				// #endif  
				// #ifndef MP
				if (self.orderStatus == 0) {
					uni.navigateTo({
						url: '/pages/order_details/stay?order_id=' + order_id
					})
				} else {
					uni.navigateTo({
						url: '/pages/order_details/index?order_id=' + order_id
					})
				}
				// #endif
			},
			/**
			 * 切换类型
			 * status -2全部，-1待付款，0待发货，1待收货，2待评价，3已完成
			 */
			statusClick: function(status) {

				if (status == -2) {
					this.paid = -1; //-1表示无状态
				}
				if (status == -1) {
					this.paid = 0;
				}
				if (status >= 0) {
					this.paid = 1;
				}

				this.orderStatus = status;
				this.loadend = false;
				this.page = 1;
				this.$set(this, 'orderList', []);
				this.getOrderList();
			},
			/**
			 * 获取订单列表
			 */
			getOrderList: function() {
				let that = this;
				if (that.loading) return;
				that.loading = true;
				that.loadend = true;
				that.loadTitle = "加载更多";

				let status = that.orderStatus;
				if (status <= 0) {
					status = 0;
				}
				if (that.paid == -1 && status == 0) {
					//表示查看全部
					status = "";
				}

				let para = {
					status: status,
					paid: that.paid,
					page: that.page,
					limit: that.limit,
					deliver: that.deliver
				};

				getOrderList(para).then(res => {
					let list = res.data.list || [];
					let loadend = list.length < that.limit;
					that.orderList = that.$util.SplitArray(list, that.orderList);
					that.$set(that, 'orderList', that.orderList);
					that.getProductCount();
					that.loadend = loadend;
					that.loading = false;
					that.loadend = false;
					that.loadTitle = loadend ? "我也是有底线的" : '加载更多';
					that.page = that.page + 1;
				}).catch(err => {
					that.loading = false;
					that.loadend = false;
					that.loadTitle = "加载更多";
				})

				/* if ( false && that.orderStatus == 0) {
					groupOrderList({
						page: that.page,
						limit: that.limit,
					}).then(res => {
						let list = res.data.list || [];
						let loadend = list.length < that.limit;
						that.orderList = that.$util.SplitArray(list, that.orderList);
						that.$set(that, 'orderList', that.orderList);
						that.getProductCount();
						that.loadend = loadend;
						that.loading = false;
						that.loadTitle = loadend ? "我也是有底线的" : '加载更多';
						that.page = that.page + 1;
					})
				} */

			},
			/**
			 * 获取定金预售订单列表
			 */
			getpreSellOrderList: function() {
				let that = this;
				getOrderList({
					status: 10,
					page: 1,
					limit: 1,
					deliver: that.deliver
				}).then(res => {
					let list = res.data.list || [];
					that.presellOrderCount = res.data.count;
					that.$set(that, 'presellProList', list);
				})

			},
			/**
			 * 获取单个订单商品数量
			 */
			getProductCount: function() {
				if (this.orderStatus !== 0) {
					this.orderList.forEach((item, i) => {
						let orderNum = 0
						item.orderProduct.forEach((val) => {
							orderNum += val.product_num
						})
						this.orderList[i]['orderNum'] = orderNum;
					})
				}

			},
			/**
			 * 取消订单
			 */
			cancelOrder: function(group_order_id) {
				let self = this;
				uni.showModal({
					title: '提示',
					content: '确认取消该订单?',
					success: function(res) {
						if (res.confirm) {
							unOrderCancel(group_order_id, {
									deliver: self.deliver
								})
								.then((data) => {

									self.$set(self, 'orderList', []);
									self.page = 1;
									self.getOrderData();
									self.getOrderList();
									return self.$util.Tips({
										title: data.message,
										icon: 'success'
									});
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
			// 确认收货
			confirmOrder: function(order_id,type) {
				let self = this;
				if(type == 2){
					uni.showModal({
						title: '确认收货',
						content: '为保障权益，请收到货确认无误后，再确认收货',
						success: function(res) {
							if (res.confirm) {
								orderTake(order_id,type, {
									deliver: self.deliver
								}).then(res => {
					
									self.$set(self, 'orderList', []);
									self.page = 1;
									self.getOrderData();
									self.getOrderList();
									return self.$util.Tips({
										title: '操作成功',
										icon: 'success'
									});
								}).catch(err => {
									return self.$util.Tips({
										title: err
									});
								})
							}
						}
					})
				}else {
					uni.showModal({
						title: '提示',
						content: '是否发货',
						success: function(res) {
							if (res.confirm) {
								orderTake(order_id,type, {
									deliver: self.deliver
								}).then(res => {
									self.$set(self, 'orderList', []);
									self.page = 1;
									self.getOrderData();
									self.getOrderList();
									return self.$util.Tips({
										title: '操作成功',
										icon: 'success'
									});
								}).catch(err => {
									return self.$util.Tips({
										title: err
									});
								})
							}
						}
					})
				}
			},
		},
		onReachBottom: function() {
			this.getOrderList();
		}
	}
</script>

<style scoped lang="scss">
	.my-order .header {
		height: 260rpx;
		padding: 0 30rpx;
	}

	.my-order .header .picTxt {
		height: 190rpx;
	}

	.my-order .header .picTxt .text {
		color: rgba(255, 255, 255, 0.8);
		font-size: 26rpx;
		font-family: 'Guildford Pro';
	}

	.my-order .header .picTxt .text .name {
		font-size: 34rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 20rpx;
	}

	.my-order .header .picTxt .pictrue {
		width: 122rpx;
		height: 109rpx;
	}

	.my-order .header .picTxt .pictrue image {
		width: 100%;
		height: 100%;
	}

	.my-order .nav {
		background-color: #fff;
		width: 690rpx;
		height: 140rpx;
		border-radius: 6rpx;
		margin: -73rpx auto 0 auto;
	}

	.my-order .nav .item {
		text-align: center;
		font-size: 26rpx;
		color: #282828;
		padding: 29rpx 0;
	}

	.my-order .nav .item.on {
		font-weight: bold;
		border-bottom: 5rpx solid #e93323;
	}

	.my-order .nav .item .num {
		margin-top: 18rpx;
	}

	.my-order .list {
		width: 690rpx;
		margin: 14rpx auto 0 auto;
	}

	.my-order .list .item {
		background-color: #fff;
		border-radius: 6rpx;
		margin-bottom: 14rpx;
	}

	.my-order .list .item .title {
		height: 84rpx;
		padding: 0 15rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 28rpx;
		color: #282828;

		.left-wrapper {
			.iconfont {
				margin-top: 5rpx;
			}

			.store-name {
				margin: 0 10rpx;
			}

			.icon-xiangyou {
				font-size: 20rpx;
			}
		}
	}

	.my-order .list .item .title .sign {
		font-size: 24rpx;
		padding: 0 7rpx;
		height: 36rpx;
		margin-right: 15rpx;
	}

	.my-order .list .item .item-info {
		padding: 0 30rpx;
		margin-top: 22rpx;
	}

	.my-order .list .item .item-info .pictrue {
		width: 120rpx;
		height: 120rpx;
	}

	.my-order .list .item .item-info .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.my-order .list .item .item-info .text {
		width: 486rpx;
		font-size: 28rpx;
		color: #999;
		margin-top: 6rpx;
	}

	.my-order .list .item .item-info .text .name {
		width: 320rpx;
		color: #282828;
	}

	.event_bg {
		background: #FF7F00;
	}

	.event_color {
		color: #FF7F00;
	}

	.my-order .list .item .event_name {
		display: inline-block;
		margin-right: 9rpx;
		color: #fff;
		font-size: 20rpx;
		padding: 0 8rpx;
		line-height: 30rpx;
		text-align: center;
		border-radius: 6rpx;
	}

	.my-order .list .item .event_ship {
		font-size: 20rpx;
		margin-top: 10rpx;
	}

	.my-order .list .event_price {
		margin: 0 0 50rpx 120rpx;
	}

	.my-order .list .item .item-info .text .money {
		text-align: right;
	}

	.ordersn {
		font-size: 24rpx;
		color: #282828;
		text-align: left;
		margin: 20rpx 0 0 30rpx;
	}

	.my-order .list .item .totalPrice {
		font-size: 26rpx;
		color: #282828;
		text-align: right;
		margin: 27rpx 0 0 30rpx;
		padding: 0 30rpx 30rpx 0;
	}

	.my-order .list .item .totalPrice .money {
		font-size: 28rpx;
		font-weight: bold;
	}

	.my-order .list .item .bottom {
		height: 107rpx;
		padding: 0 30rpx;
		border-top: 1px solid #f0f0f0;
	}

	.my-order .list .item .bottom .bnt {
		width: 138rpx;
		height: 52rpx;
		text-align: center;
		line-height: 50rpx;
		color: #fff;
		border-radius: 50rpx;
		font-size: 23rpx;
	}

	.my-order .list .item .bottom .bnt.cancelBnt {
		border: 1rpx solid #ddd;
		color: #aaa;
	}

	.my-order .list .item .bottom .bnt~.bnt {
		margin-left: 17rpx;
	}

	.noCart {
		margin-top: 171rpx;
		padding-top: 0.1rpx;
	}

	.noCart .pictrue {
		width: 414rpx;
		height: 336rpx;
		margin: 78rpx auto 56rpx auto;
	}

	.noCart .pictrue image {
		width: 100%;
		height: 100%;
	}

	.event_container {
		width: 690rpx;
		background-image: url(~static/images/presell_orderBg.png);
		background-size: cover;
		background-repeat: no-repeat;
		margin: 20rpx auto;
		padding: 26rpx 30rpx;
		border-radius: 16rpx;

		.info {
			width: 420rpx;

			.title {
				color: #282828;
				font-size: 26rpx;
			}

			.desc {
				color: #999;
				font-size: 24rpx;
				margin-top: 30rpx;
			}
		}

		.photo {
			width: 180rpx;

			.picture {
				width: 120rpx;
				height: 120rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
				}
			}

			.more_btn {
				color: #fff;
				background: #F97E3B;
				width: 40rpx;
				height: 40rpx;
				border-radius: 40rpx;
				text-align: center;
				line-height: 40rpx;
				position: relative;
				top: 40rpx;

				text {
					font-size: 10rpx;
				}
			}
		}
	}

	.infor {
		font-size: 24rpx;
		color: #868686;
		margin-top: 16rpx;
	}
</style>
