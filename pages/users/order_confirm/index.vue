<template>
	<view>
		<view class='order-submission'>
			<view class="allAddress" @click="onAddress">
				<view class='address acea-row row-between-wrapper' v-if='shippingType == 0 '>
					<view class='addressCon' v-if="addressInfo.real_name">
						<view class='name'>{{addressInfo.real_name}}
							<text class='phone'>{{addressInfo.phone}}</text>
						</view>
						<view>
							<text class='default font-color'
								v-if="addressInfo.is_default">[默认]</text>{{addressInfo.province}}{{addressInfo.city}}{{addressInfo.district}}{{addressInfo.detail}}
						</view>
						<!-- <view class='setaddress'>设置收货地址</view> -->
					</view>
					<view class='addressCon' v-else>
						<view class='setaddress'>设置收货地址</view>
					</view>
					<view class='iconfont icon-jiantou'></view>
				</view>
				<view class='line'>
					<image src='/static/images/line.jpg'></image>
				</view>
			</view>
			<!-- 商品信息 -->
			<view class="storeinfo-wrapper">
				<view class="store-item" v-for="(item,index) in cartInfo" :key="index">
					<view class="store-title">
						<text class="iconfont icon-shangjiadingdan"></text>
						<!-- <view class="txt" @click="goStore(item.mer_id)">{{item.mer_name}}</view> -->
						<view class="txt">{{item.mer_name}}</view>
						<!-- <text class="iconfont icon-xiangyou"></text> -->
					</view>
					<view v-for="(goods,j) in item.list" :key="j">

						<view class="product-item">
							<view class="img-box">
								<image :src="goods.productAttr.image || goods.product.image"></image>
							</view>
							<view class="content">
								<view class="name line1">{{goods.product.store_name}}</view>
								<!-- <view class="label">{{goods.productAttr.sku}}</view> -->
								<view class='infor line1'><text>单位：{{goods.product.unit_name}}</text><text
										v-if="goods.productAttr.sku">，规格：{{goods.productAttr.sku}}</text></view>
								<view class="price">

									<text
										v-if="goods.productAttr.activity_type==1 || goods.productAttr.activity_type==2 "
										class="goods_tag">{{goods.productAttr.activity_name}}</text>
									<text v-else-if="goods.productAttr.activity_type==3" class="goods_tag">代理</text>
									<text v-else-if="goods.productAttr.activity_type==4" class="goods_tag">YBK</text>
									<text v-else-if="goods.productAttr.activity_type==5" class="goods_tag">特定价</text>
									<text v-else-if="goods.productAttr.activity_name" class="goods_tag">{{goods.productAttr.activity_name}}</text>

									<block v-if="order_type == 3">
										￥{{goods.productAssistAttr.assist_price}}
									</block>
									<block v-else>
										￥{{$util.moneyAct(goods.productAttr.price)}}
									</block>
									<text>X{{goods.cart_num}}</text>
									<view class="old_price1" v-if="goods.productAttr.ot_price>goods.productAttr.price">
										,原价:
										<text class="old_price">￥{{$util.moneyAct(goods.productAttr.ot_price)}}</text>
									</view>
								</view>
								<view class="err-txt" v-if="goods.undelivered && addressInfo.real_name">
									<text class="iconfont icon-zhuyi-copy"></text>
									<view class="txt">此商品不支持该区域配送</view>
								</view>
							</view>
						</view>
					</view>
					<view class="wrapper" v-if="false">
						<view class="boxs" v-if="item.take.mer_take_status != 0">
							<view class='item acea-row row-between-wrapper' @tap='openShowBox(item,index)'>
								<view>配送方式</view>
								<view class='discount'>
									{{item.isTake==0?'快递配送':'到店自提'}}
									<text class='iconfont icon-jiantou'></text>
								</view>
							</view>
							<view class="store-address" v-if="item.isTake" @click="goMap(item)">
								<view class="name">{{item.take.mer_take_name}}</view>
								<view class="info">{{item.take.mer_take_address}}</view>
							</view>
						</view>
						<view class='item acea-row row-between-wrapper' v-if='shippingType==0 && item.isTake == 0'>
							<view>快递费用 <text
									v-if="item.list[0].productPresell && item.list[0].productPresell.presell_type == 2">(尾款阶段）</text>
							</view>
							<view class='discount' v-if='item.order.postage_price > 0'>
								+￥{{$util.moneyAct(item.order.postage_price)}}</view>
							<view class='discount' v-else>免运费</view>
						</view>
						<view class='item acea-row row-between-wrapper'
							v-if="!pinkId && !BargainId && !combinationId && !seckillId && order_type != 3">
							<view>优惠券</view>
							<block v-if="item.coupon.length>0">
								<view class='discount' @tap='couponTap(item,index)'>
									<text v-if="item.order.coupon_price>0">优惠￥{{item.order.coupon_price}}</text>
									<text v-else>暂未选择优惠券</text>
									<text class='iconfont icon-jiantou'></text>
								</view>
							</block>
							<block v-else>
								<view class='discount'>暂无优惠券</view>
							</block>
						</view>
						<!-- <view v-if="item.openReceipt == 1" class='item acea-row row-between-wrapper' @tap="goInvoice(item.mer_id)">
							<view>开具发票</view>
							<view class='discount discount_voice'>
								{{(item.invoiceData && item.invoiceData.receipt_title) ? item.invoiceData.receipt_title : '不开发票'}}
								<text class='iconfont icon-jiantou'></text>
							</view>
						</view> -->
						<!-- <view v-if="order_type === 2 && item.list[0].productPresell.presell_type ==2" class="item acea-row row-between-wrapper"
						 style="border-top: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5;">
							<checkbox-group class="checkgroup" @change='changeIsAgree'>
								<text class="iconfont icon-wenhao1"></text>
								<text @click="showProtocol = true">我已同意定金不退等预售协议</text>
								<checkbox class="checkbox" :checked="isAgree ? true : false" />
							</checkbox-group>
						</view> -->


					</view>


					<view class="wrapper">
						<view class='item acea-row row-between-wrapper' v-if="textareaStatus">
							<view>买家留言</view>
							<input v-if="coupon.status===false" placeholder-class='placeholder'
								@input='bindHideKeyboard' placeholder="可填写备注信息" name="mark"
								v-model="msgObj[item.mer_id]"></input>
						</view>

						<view class="total" v-if="item.order.youhui>0">
							原价总计：
							<view class="price_grey price_th show_num1">
								<text>￥</text>{{ $util.moneyAct(item.order.ot_price_all)}}
							</view>
						</view>
						<view class="total" v-if="item.order.youhui>0">
							共计优惠：
							<view class="price_grey show_num1"><text>￥</text>{{ $util.moneyAct(item.order.youhui)}}
							</view>
						</view>

						<view class="total">
							共{{item.order.total_num}}件 商品小计：
							<view class="price show_num1"><text>￥</text>{{ $util.moneyAct(item.order.total_price) }}
							</view>
							<!-- <view class="price show_num1" v-if="item.isTake == 0"><text>+ ￥</text>{{ $util.moneyAct(item.order.pay_price) }}</view>
							<view class="price show_num1" v-if="item.isTake == 1"><text>+ ￥</text>{{ $util.moneyAct(item.order.org_price)}}</view> -->
						</view>
						<view class="total">
							运费：
							<view class="price show_num1"><text>+ ￥</text>{{ $util.moneyAct(item.order.postage_price)}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="settlementAgreement" v-if="showProtocol">
				<view class="setAgCount">
					<i class="icon iconfont icon-cha" @click="showProtocol = false"></i>
					<div class="title">预售协议</div>
					<view class="content">
						<jyf-parser :html="protocol" ref="article" :tag-style="tagStyle"></jyf-parser>
						<view v-html="protocol"></view>
					</view>
				</view>
			</view> -->
			<view class='wrapper1'>
				<view class='item1'>
					<view>运费方式</view>
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd">
							<view>
								<radio value="1" :checked="ship==1" />
							</view>
							<view>现付</view>
						</label>
						<label class="uni-list-cell uni-list-cell-pd">
							<view>
								<radio value="2" :checked="ship==2" />
							</view>
							<view>到付</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class='wrapper'>
				<view class='item'>
					<view>结算方式</view>
					<view class='list'>
						<view class='payItem acea-row row-middle'>
							<view class='name acea-row row-center-wrapper' style="border-right:none; width: 50%;">
								当前结算账户余额
							</view>
							<view class='tip' style="width: 50%; padding-right: 20rpx;">
								<text class='font-color show_num'>￥{{$util.moneyAct(curMoney) || 0}}</text>
							</view>
						</view>
						<view class='payItem acea-row row-middle' v-if="false">
							<view class='name acea-row row-center-wrapper' style="border-right:none; width: 50%;">
								可支付运费账户余额
							</view>
							<view class='tip' style="width: 50%; padding-right: 20rpx;">
								<text class='font-color show_num'>￥{{$util.moneyAct(curYfMoney) || 0}}</text>
							</view>
						</view>

						<view class='payItem acea-row row-middle' v-show="act_show">
							<view class='name acea-row row-center-wrapper'>
								是否参与活动购买
							</view>
							<view class='tip'>
								<switch style="transform:scale(0.7)" id="isActSel" :checked="getSwitchCheck('isActSel')"
									color="#1698ae" @change="switchActive" />
							</view>
						</view>

						<view class='payItem' v-show="old_show">
							<view class="acea-row row-middle" style="height: 86rpx;">
								<view class='name acea-row row-center-wrapper'>
									是否代理账户购买
								</view>
								<view class='tip'>
									<switch style="transform:scale(0.7)" id="isOldSel" :checked="getSwitchCheck('isOldSel')"
										color="#1698ae" @change="switchActive" />
								</view>
							</view>
							<view class="textTip" v-if="textTipShow">
								温馨提示：使用代理账户购买不参与合伙人拿货奖励！
							</view>
						</view>
						<view class='payItem acea-row row-middle' v-show="ybk_show">
							<view class='name acea-row row-center-wrapper'>
								是否YBK账户购买
							</view>
							<view class='tip'>
								<switch style="transform:scale(0.7)" id="isYbkSel" :checked="getSwitchCheck('isYbkSel')"
									color="#1698ae" @change="switchActive" />
							</view>
						</view>

						<view class='payItem acea-row row-middle' v-if="item.status == 1"
							v-for="(item,index) in accountAll" :key="index">
							<view class='name acea-row row-center-wrapper'>
								{{item.title}}&nbsp;&nbsp;<view class="font-color-red">￥{{$util.moneyAct(item.value)}}
								</view>
							</view>
							<view class='tip'>
								<switch style="transform:scale(0.7)" :id="index" :checked="getSwitchCheck(index)"
									color="#1698ae" @change="switchAccount" />
							</view>
						</view>

						<!-- #ifdef H5 -->
						<!-- <view class='payItem acea-row row-middle' :class='active==index ?"on":""' @tap='payItem(index)' v-for="(item,index) in cartArr"
						 :key='index' v-if="item.payStatus==1">
							<view class='name acea-row row-center-wrapper'>
								<view class='iconfont animated' :class='(item.icon) + " " + (animated==true&&active==index ?"bounceIn":"")'></view>{{item.name}}
							</view>
							<view class='tip'>
								{{item.title}}
								<block v-if="item.value == 'balance'">
									{{userInfo.now_money}}
								</block>
							</view>
						</view> -->
						<!-- #endif -->
						<!-- #ifdef MP || APP-PLUS -->
						<!-- <view class='payItem acea-row row-middle' :class='active==index ?"on":""' @tap='payItem(index)' v-for="(item,index) in cartArr"
						 :key='index' v-if="item.payStatus==1">
							<view class='name acea-row row-center-wrapper'>
								<view class='iconfont animated' :class='(item.icon) + " " + (animated==true&&active==index ?"bounceIn":"")'></view>{{item.name}}
							</view>
							<view class='tip'>
								{{item.title}}
								<block v-if="item.value == 'balance'">
									{{userInfo.now_money}}
								</block>
							</view>
						</view> -->
						<!-- #endif -->
					</view>
				</view>
			</view>
			<view class='moneyList' v-if="false">
				<view class='item acea-row row-between-wrapper'>
					<view>商品总价：</view>
					<view class='money'>￥{{$util.moneyAct(proPrice)}}</view>
				</view>
				<view class='item acea-row row-between-wrapper' v-if="coupon_price > 0">
					<view>优惠券抵扣：</view>
					<view class='money'>-￥{{$util.moneyAct(coupon_price)}}</view>
				</view>
				<view class='item acea-row row-between-wrapper' v-if="integral_price > 0">
					<view>积分抵扣：</view>
					<view class='money'>-￥{{$util.moneyAct(integral_price)}}</view>
				</view>

				<view class='item acea-row row-between-wrapper' v-if="priceGroup.storePostage > 0">
					<view>运费：</view>
					<view class='money'>+￥{{$util.moneyAct(priceGroup.storePostage)}}</view>
				</view>
			</view>
			<view style='height:120rpx;'></view>
			<view class='footer acea-row row-between-wrapper'>
				<view>合计:
					<text class='font-color show_num'>￥{{$util.moneyAct(totalPrice) || 0}}</text>
				</view>
				<view class='settlement' :class='addressInfo.real_name ? "" : "disabled"' style='z-index:100'
					@tap="SubOrder">{{addressInfo.real_name ? '立即结算':'选择地址'}}</view>
			</view>
		</view>
		<block v-if="coupon.status">
			<couponListWindow :coupon='coupon' @ChangCouponsClone="ChangCouponsClone" :openType='openType'
				:cartId='cartId' @ChangCoupons="ChangCoupons" :subCoupon='subCoupon'></couponListWindow>
		</block>
		<addressWindow ref="addressWindow" @changeTextareaStatus="changeTextareaStatus" :address='address'
			:pagesUrl="pagesUrl" @OnChangeAddress="OnChangeAddress" @changeClose="changeClose"></addressWindow>
		<addInvoicing ref="addInvoicing" @changeInvoiceClose="changeInvoiceClose" :invoice='invoice'></addInvoicing>
		<!-- #ifdef MP -->
		<!-- <authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize> -->
		<!-- #endif -->
		<block v-if="isShowBox">
			<checkDelivery :isShowBox="isShowBox" :activeObj="activeObj" @close="boxClose" @confirmBtn="getData">
			</checkDelivery>
		</block>
	</view>
</template>
<script>
	let app = getApp();
	import {
		orderConfirm,
		getCouponsOrderPrice,
		orderCreate
	} from '@/api/order.js';
	import {
		getAddressDefault,
		getAddressDetail,
		getAddressList,
		getUserInfo
	} from '@/api/user.js';
	import {
		openPaySubscribe
	} from '@/utils/SubscribeMessage.js';
	import {
		presellAgreement
	} from '@/api/activity.js';
	import {
		storeListApi
	} from '@/api/store.js';
	import {
		CACHE_LONGITUDE,
		CACHE_LATITUDE
	} from '@/config/cache.js';
	import couponListWindow from '@/components/checkCoupon';
	import addressWindow from '@/components/addressWindow';
	import orderGoods from '@/components/orderGoods';
	import checkDelivery from '@/components/checkDelivery/index.vue'
	import addInvoicing from '@/components/addInvoicing';
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
			couponListWindow,
			addressWindow,
			orderGoods,
			checkDelivery,
			addInvoicing,
			// #ifdef MP
			authorize
			// #endif
		},
		filters: {
			filterDay(val) {
				if (val) {
					var reg = /(\d{4})\-(\d{2})\-(\d{2})/;
					var date = val.replace(reg, "$2月$3日");
					return date
				}
			}
		},
		data() {
			return {
				textTipShow:false,
				// 备注
				msgObj: {

				},
				textareaStatus: true,
				//支付方式
				cartArr: [{
						"name": "微信支付",
						"icon": "icon-weixin2",
						value: 'weixin',
						title: '微信快捷支付',
						payStatus: 1,
					},
					{
						name: "支付宝支付",
						icon: "icon-zhifubao",
						// #ifdef H5		
						value: 'alipay',
						// #endif
						// #ifdef MP
						value: 'alipayQr',
						// #endif
						title: '支付宝支付',
						payStatus: app.globalData.alipay_open
					},
					{
						"name": "余额支付",
						"icon": "icon-icon-test",
						value: 'balance',
						title: '可用余额:',
						payStatus: app.globalData.yue_pay_status,
					},
					{
						"name": "线下支付",
						"icon": "icon-yinhangqia",
						value: 'offline',
						title: '线下支付',
						payStatus: 2,
					},
				],
				firstSwitchDefault: true, //是否初次进入（未手动选支付按钮） 

				act_show: true, //是否显示活动开关 
				old_show: false, //是否显示老代理开关
				ybk_show: false, //是否显示老代理YBK开关

				//初次请求，全部传0，自动返回各个产品最低价
				isActSel: 1, //是否选中参加活动 1选中，2不选 0 表示初始不强制; 做活动必须默认勾选
				isOldSel: 0, //是否选中老代理 1选中，2不选
				isYbkSel: 0, //是否选中老代理 1选中，2不选

				curMoney: 0, //当前结算账户余额
				curYfMoney: 0, //可支付运费

				accountAll: {}, //当前返回所有子账户及余额
				accountSel: [], //用户选中的子账户（可多选，逗号隔开）
				//所有switch开关（双向绑定）
				switchAll: {
					isActSel: false,
					isOldSel: false,
					isYbkSel: false,
					activity_bonus: false,
					activity_principal: false,
					brokerage_price: false,
					especially: false,
					first_batch: false,
					margin: false,
					now_money: false,
					reward_account: false,
					ybk: false
				},

				payType: 'weixin', //支付方式
				openType: 1, //优惠券打开方式 1=使用
				active: 0, //支付方式切换
				coupon: {
					status: false,
					list: [],
					statusTile: '立即使用'
				}, //优惠券组件
				address: {
					address: false
				}, //地址组件
				addressInfo: {}, //地址信息
				invoice: {
					invoice: false,
					mer_id: 0
				}, //发票组件
				invoiceData: {}, // 发票数据
				pinkId: 0, //拼团id
				addressId: 0, //地址id
				couponId: 0, //优惠券id
				cartId: '', //购物车id
				BargainId: 0,
				combinationId: 0,
				seckillId: 0,
				userInfo: {}, //用户信息
				mark: '', //备注信息
				couponTitle: '请选择', //优惠券
				coupon_price: 0, //优惠券抵扣金额
				useIntegral: false, //是否使用积分
				integral_price: 0, //积分抵扣金额
				integral: 0,
				ChangePrice: 0, //使用积分抵扣变动后的金额
				formIds: [], //收集formid
				status: 0,
				is_address: false,
				toPay: false, //修复进入支付时页面隐藏从新刷新页面
				shippingType: 0,
				system_store: {},
				storePostage: 0,
				contacts: '',
				contactsTel: '',
				mydata: {},
				storeList: [],
				store_self_mention: 0,
				cartInfo: [],
				priceGroup: {},
				animated: false,
				totalPrice: 0,
				integralRatio: "0",
				pagesUrl: "",
				orderKey: "",
				// usableCoupon: {},
				offlinePostage: "",
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				from: '',
				orderStatus: '', //是否有地址
				couponIndex: 0, //选择商铺优惠券索引
				subCoupon: {}, //提交订单使用的优惠券
				proPrice: 0, //商品总价
				isShowBox: false,
				activeObj: {}, //选中店铺信息
				activeIndex: '', // 选中店铺索引
				invoiceName: '不开发票',
				invoice_func: false,
				special_invoice: false,
				order_type: 1, // 是否为预售
				isAgree: false,
				showProtocol: false,
				protocol: '',
				order_type: 0,
				hide_mer_status: app.globalData.hide_mer_status,
				ship:1,
				source:''
			};
		},
		computed: mapGetters(['isLogin']),
		onReady() {
			uni.$on('update', (data) => {
				this.cartArr[1]['payStatus'] = data.alipay_open
				this.cartArr[2]['payStatus'] = data.alipay_open
			})
		},
		mounted: function() {
			this.$nextTick(() => {
				this.cartArr[1]['payStatus'] = app.globalData.alipay_open
				this.cartArr[2]['payStatus'] = app.globalData.yue_pay_status
			});

		},
		onLoad: function(options) {
			this.source = options.source||''
			this.seckillId = options.seckillId
			// #ifdef H5
			this.from = this.$wechat.isWeixin() ? 'weixin' : 'h5'
			// #endif
			// #ifdef MP
			this.from = 'routine'
			// #endif
			if (!options.cartId) return this.$util.Tips({
				title: '请选择要购买的商品'
			}, {
				tab: 3,
				url: 1
			});
			this.couponId = options.couponId || 0;
			this.pinkId = options.pinkid ? parseInt(options.pinkid) : 0;
			this.addressId = options.addressId || 0;
			this.cartId = options.cartId;
			this.is_address = options.is_address ? true : false;
			this.news = options.new ? 1 : 0;
			this.invoice_id = options.invoice_id || '';
			if (options.invoice_type == 1) {
				this.invoiceName = '增值税电子普通发票';
			} else if (options.invoice_type == 2) {
				this.invoiceName = '增值税电子专用发票';
			}
			if (this.isLogin) {
				// this.getaddressInfo();
				// //调用子页面方法授权后执行获取地址列表
				// this.$nextTick(function() {
				// 	this.$refs.addressWindow.getAddressList();
				// })
			} else {
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif 
				// #ifdef MP
				this.isAuto = true;
				this.$set(this, 'isShowAuth', true);
				// #endif
			}
			if (this.payType == 'weixin') {
				this.payType = this.from
			}
			let _this = this
			this.textareaStatus = true;
			if (this.isLogin && this.toPay == false) {
				this.getaddressInfo();
				this.$nextTick(function() {
					this.$refs.addressWindow.getAddressList();
					this.getUserInfo()
				})
			}

		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			uni.$on("handClick", res => {
				if (res) {
					_this.system_store = res.address
				}
				// 清除监听
				uni.$off('handClick');
			})
			uni.$on("updataAddress", () => {

				console.log("updateAddress...");
				this.getaddressInfo();
				this.$nextTick(function() {
					this.$refs.addressWindow.getAddressList();
					this.getUserInfo()
				})
			})
			this.invoice.invoice = false
			// let pages = getCurrentPages();
			// let currPage = pages[pages.length - 1]; //当前页面
			// if (currPage.data.storeItem) {
			// 	let json = currPage.data.storeItem;
			// 	this.$set(this, 'system_store', json);
			// }
		},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		// onHide: function() {
		// 	this.isClose = true
		// },
		methods: {
			radioChange(e){
				this.ship = e.detail.value
				this.getConfirm(this.addressId);
			},
			//根据当前付款账户选择，显示余额
			getNowCurMoney: function(user) {

				if ((this.isActSel == 1 && this.isOldSel == 1) || this.isOldSel == 1) {
					//计算老代理账户
					this.curMoney = parseFloat(user.especially);
					this.curYfMoney = parseFloat(user.especially);
				} else if (this.isYbkSel == 1) {
					//计算YBK账户
					this.curMoney = parseFloat(user.ybk);
					this.curYfMoney = parseFloat(user.ybk);
				} else if (this.isActSel == 1) {
					//计算活动账户
					this.curMoney = parseFloat(user.now_money) + parseFloat(user.activity_principal) + parseFloat(user
						.activity_bonus);
					this.curYfMoney = parseFloat(user.now_money) + parseFloat(user.activity_principal);
				} else {
					//计算常规账户
					this.curMoney = parseFloat(user.first_batch) + parseFloat(user.now_money) + parseFloat(user
						.activity_principal) + parseFloat(user.activity_bonus) + parseFloat(user.reward_account);
					this.curYfMoney = parseFloat(user.first_batch) + parseFloat(user.now_money) + parseFloat(user
						.activity_principal);
				}
			},

			//动态绑定（遍历取对象属性）
			getSwitchCheck: function(flag) {
				let tmp = false;
				for (let [key, value] of Object.entries(this.switchAll)) {
					if (key == flag) {
						tmp = value;
						break;
					}
				}
				return tmp;
			},
			//3个按钮，选中1个，取消其它按钮逻辑（仅活动和老代理可同时）
			switchOther3Btn: function(flag, isTrue) {
				if (!isTrue) return;
				if (flag == "isActSel") {
					console.log("取消YBK：" + this.switchAll.isYbkSel);
					this.isYbkSel = 2;
					this.switchAll.isYbkSel && this.$set(this.switchAll, 'isYbkSel', !this.switchAll.isYbkSel);
				} else if (flag == "isOldSel") {
					console.log("取消YBK：" + this.switchAll.isYbkSel);
					this.isYbkSel = 2;
					this.switchAll.isYbkSel && this.$set(this.switchAll, 'isYbkSel', !this.switchAll.isYbkSel);
				} else if (flag == "isYbkSel") {
					//取消 活动 和 老代理
					console.log("取消活动：" + this.switchAll.isActSel);
					this.isActSel = 2;
					this.switchAll.isActSel && this.$set(this.switchAll, 'isActSel', !this.switchAll.isActSel);

					console.log("取消老代理：" + this.switchAll.isOldSel);
					this.isOldSel = 2;
					this.switchAll.isOldSel && this.$set(this.switchAll, 'isOldSel', !this.switchAll.isOldSel);
				}
				if (this.isActSel == 1 && this.isOldSel == 1) {
					this.$util.Tips({
						title: "同时勾选时，仅扣除代理钱包"
					});
				}
			},
			//是否参加活动,是否老代理或YBK身份购买
			switchActive: function(e) {
				let curId = e.currentTarget.id;
				if (curId == "isActSel") {
					this.isActSel = e.target.value ? 1 : 2;
					this.switchAll.isActSel = e.target.value;
				} else if (curId == "isOldSel") {
					this.isOldSel = e.target.value ? 1 : 2;
					this.textTipShow = e.target.value
					this.switchAll.isOldSel = e.target.value;
				} else if (curId == "isYbkSel") {
					this.isYbkSel = e.target.value ? 1 : 2;
					this.switchAll.isYbkSel = e.target.value;
				}
				this.firstSwitchDefault = false;
				this.switchOther3Btn(curId, e.target.value);

				console.log(curId, "curId");
				// this.activeTips = e.target.value?"参加":"不参加";
				//取消所有选择，并清空所选账户
				// this.closeAllAccount(0,1);

				//切换价格方案
				this.getConfirm(this.addressId);
			},

			//[废弃]关闭所有子账户（ 1点击特殊按钮清空常规按钮，2点击常规按钮，剔除特殊按钮；）
			closeAllAccount: function(name = 1, type = 1) {

				if (type == 1) {

					//关闭常规的
					this.switchAll.first_batch && this.$set(this.switchAll, 'first_batch', !this.switchAll
						.first_batch);
					this.switchAll.now_money && this.$set(this.switchAll, 'now_money', !this.switchAll.now_money);
					this.switchAll.activity_principal && this.$set(this.switchAll, 'activity_principal', !this
						.switchAll.activity_principal);
					this.switchAll.activity_bonus && this.$set(this.switchAll, 'activity_bonus', !this.switchAll
						.activity_bonus);

					//关闭特殊的
					if (name != "reward_account") {
						this.switchAll.reward_account && this.$set(this.switchAll, 'reward_account', !this.switchAll
							.reward_account);
					}
					if (name != "especially") {
						this.switchAll.especially && this.$set(this.switchAll, 'especially', !this.switchAll
							.especially);
					}
					if (name != "ybk") {
						this.switchAll.ybk && this.$set(this.switchAll, 'ybk', !this.switchAll.ybk);
					}

					//清空
					this.accountSel = [];
				} else if (type == 2) {

					this.switchAll.reward_account && this.$set(this.switchAll, 'reward_account', !this.switchAll
						.reward_account);
					this.switchAll.especially && this.$set(this.switchAll, 'especially', !this.switchAll.especially);
					this.switchAll.ybk && this.$set(this.switchAll, 'ybk', !this.switchAll.ybk);
					//剔除特殊按钮
					for (var i = this.accountSel.length - 1; i >= 0; i--) {
						if (["reward_account", "especially", "ybk"].indexOf(this.accountSel[i]) > -1) {
							this.accountSel.splice(i, 1);
						}
					}
				}

			},

			//勾选子账户[废弃]
			switchAccount: function(e) {

				let id = e.target.id;
				let isTrue = e.target.value;

				//改变双向绑定的值
				Object.keys(this.switchAll).map(key => (key == id ? this.switchAll[key] = isTrue : ''));

				//不支持混合支付，先关闭其它（不会触发change事件）
				// if(["reward_account","especially","ybk"].indexOf(id) >-1 ){
				// 	console.log("不允许混合支付，取消其它子账户");
				// 	this.closeAllAccount(id,1);					
				// }else{
				// 	this.closeAllAccount(id,2);
				// }

				let arr = this.accountSel;
				let index = arr.indexOf(id);

				if (isTrue) {
					if (index == -1) {
						arr.push(id);
					}
				} else {
					if (index > -1) {
						arr.splice(index, 1);
					}
				}
				this.accountSel = arr;
				console.log(this.accountSel.toString());
			},

			/*预售协议*/
			getPresellAgree: function() {
				presellAgreement().then(res => {
					this.protocol = res.data.sys_product_presell_agree;
				})
			},
			changeIsAgree: function(e) {
				this.isAgree = !this.isAgree;
			},

			// 获取个人信息
			getUserInfo: function() {
				getUserInfo().then(res => {
					this.userInfo = res.data
				})
			},

			/**
			 * 授权回调事件
			 * 
			 */
			onLoadFun: function() {
				this.isShowAuth = false;

				// tom todo close 会出现重复调用
				// this.getaddressInfo();
				// this.getUserInfo();

				//调用子页面方法授权后执行获取地址列表
				// this.$scope.selectComponent('#address-window').getAddressList();
			},
			/**
			 * 获取门店列表数据
			 */
			getList: function() {
				let longitude = uni.getStorageSync("CACHE_LONGITUDE"); //经度
				let latitude = uni.getStorageSync("CACHE_LATITUDE"); //纬度
				let data = {
					latitude: latitude, //纬度
					longitude: longitude, //经度
					page: 1,
					limit: 10
				}
				storeListApi(data).then(res => {
					console.log(res)
					let list = res.data.list.list || [];
					this.$set(this, 'storeList', list);
					this.$set(this, 'system_store', list[0]);
				}).catch(err => {})
			},
			// 关闭地址弹窗；
			changeClose: function() {
				this.$set(this.address, 'address', false);
			},
			// 关闭发票弹窗
			changeInvoiceClose: function(data) {
				this.getInvoiceData(data);
				this.$set(this.invoice, 'invoice', false);

			},
			getInvoiceData(selectedData) {
				this.invoiceData = {}
				if (selectedData) {
					this.cartInfo.forEach((item, i) => {
						if (item.mer_id == selectedData.mer_id) {
							if (this.cartInfo[i]['invoiceData']) {
								this.cartInfo[i]['invoiceData'] = selectedData
							} else {
								this.$set(this.cartInfo[i], 'invoiceData', selectedData)
							}
						}
						let mer_id = selectedData.mer_id
						this.invoiceData[mer_id] = selectedData;
					});
				} else {
					this.cartInfo.forEach((item, i) => {
						this.$set(this.cartInfo[i], 'invoiceData', {})
					});
				}
				console.log(this.invoiceData)
			},
			/*
			 * 跳转门店列表
			 */
			showStoreList: function() {
				let _this = this
				if (this.storeList.length > 0) {
					uni.navigateTo({
						url: '/pages/users/goods_details_store/index'
					})
				}
			},
			// 进店
			goStore: function(id) {
				if (this.hide_mer_status != 1) {
					uni.navigateTo({
						url: `/pages/store/home/index?id=${id}`
					})
				}
			},
			computedPrice: function() {
				let shippingType = this.shippingType;
				/*postOrderComputed(this.orderKey, {
					addressId: this.addressId,
					useIntegral: this.useIntegral ? 1 : 0,
					couponId: this.couponId,
					shipping_type: parseInt(shippingType) + 1,
					payType: this.payType
				}).then(res => {
					let result = res.data.result;
					if (result) {
						this.totalPrice = result.pay_price;
						this.integral_price = result.deduction_price;
						this.coupon_price = result.coupon_price;
						this.integral = this.useIntegral ? result.SurplusIntegral : this.userInfo.integral;
						this.$set(this.priceGroup, 'storePostage', shippingType == 1 ? 0 : result.pay_postage);
					}
				})*/
			},
			addressType: function(e) {
				let index = e;
				this.shippingType = parseInt(index);
				this.computedPrice();
				if (index == 1) this.getList();
			},
			bindPickerChange: function(e) {
				let value = e.detail.value;
				this.shippingType = value;
				this.computedPrice();
			},
			ChangCouponsClone: function() {
				this.$set(this.coupon, 'status', false);
			},
			changeTextareaStatus: function() {
				for (let i = 0, len = this.coupon.list.length; i < len; i++) {
					this.coupon.list[i].use_title = '';
					this.coupon.list[i].is_use = 0;
				}
				this.textareaStatus = true;
				this.status = 0;
				this.$set(this.coupon, 'list', this.coupon.list);
			},
			/**
			 * 处理点击优惠券后的事件
			 * 
			 */
			ChangCoupons: function(data) {
				// this.coupon_price = data.order.coupon_price;
				// this.$set(this,'coupon_price',data.order.coupon_price);
				// let tempTotal = 0
				this.cartInfo.forEach((item, index) => {
					if (item.mer_id == data.mer_id) {
						this.$set(this.cartInfo, index, data)
					}
					console.log(item.order.pay_price, 'item.order.pay_price')
				})

				// this.subCoupon = data
				this.$set(this.coupon, 'status', false);
				this.couponNum()
			},
			// 计算优惠券抵扣
			couponNum() {
				let tempTotal = 0,
					tempCouponNum = 0
				this.cartInfo.forEach((item, index) => {
					tempCouponNum = this.$util.$h.Add(tempCouponNum, item.order.coupon_price)
					tempTotal = this.$util.$h.Add(tempTotal, item.order.pay_price)
				})
				this.coupon_price = tempCouponNum
				if (this.order_type == 2 && this.coupon.list[0].productPresell.presell_type == 2) {
					return
				}
				this.totalPrice = tempTotal
			},
			/**
			 * 使用积分抵扣
			 */
			ChangeIntegral: function() {
				this.useIntegral = !this.useIntegral;
				this.computedPrice();
			},
			/**
			 * 选择地址后改变事件
			 * @param object e
			 */
			OnChangeAddress: function(e) {
				this.textareaStatus = true;
				this.addressId = e;
				this.address.address = false;
				this.getaddressInfo();
				this.computedPrice();
			},
			bindHideKeyboard: function(e) {
				this.mark = e.detail.value;
			},
			/**
			 * 获取当前订单详细信息
			 * 
			 */
			getConfirm: function(address_id) {
				let that = this;
				let tempObj = {}

				//如果全部不勾选，则全部传0-转为后台处理
				/* if(that.isActSel ==2 && that.isOldSel == 2 && that.isYbkSel ==2){
					isActSel = 0;isOldSel = 0;isYbkSel = 0;
					that.firstSwitchDefault = true;	//恢复初始状态
				}
				//如果同时勾选了做活动与老代理，则只传做活动选中，老代理勾选不传
				if(that.isActSel ==1 && that.isOldSel == 1 ){
					isOldSel = 2;
				} */
				orderConfirm({
					source:that.source,
					model: that.isActSel,
					is_old: that.isOldSel,
					is_ybk: that.isYbkSel,
					cart_id: that.cartId.split(","),
					address_id: address_id,
					ship:Number(that.ship)
				}).then(res => {
					let conponNum = 0

					// 循环整个商家外层订单（实际只会执行1次）
					res.data.order.forEach(el => {
						el.isTake = 0
						tempObj = that.subCoupon[el.mer_id] = {}
						tempObj.product = []
						tempObj.store = ''
						tempObj.product = el.order.use_coupon_product
						conponNum = that.$util.$h.Add(conponNum, el.order.coupon_price);
						el.coupon.forEach(coupon => {
							if (coupon.coupon.type == 0 && coupon.checked) {
								tempObj.store = coupon.coupon_user_id

							}
						})
						console.log("初始默认选中按钮");
						let flag2 = 0; //活动
						let flag3 = 0; //老代理
						let flag4 = 0; //ybk
						let flag5 = 0; //特价（保留项）
						el.list.forEach(order => {
							if (order.productAttr.activity_type == 1 || order.productAttr
								.activity_type == 2) {
								flag2 = 1;
							} else if (order.productAttr.activity_type == 3) {
								flag3 = 1;
							} else if (order.productAttr.activity_type == 4) {
								flag4 = 1;
							} else if (order.productAttr.activity_type == 5) {
								flag5 = 1;
							}
						})

						//[仅第一次加载时]
						if (that.firstSwitchDefault) {
							//如果有活动商品，则自动选中
							if (flag2 == 1) {
								console.log("活动选中：" + that.switchAll.isActSel);
								that.isActSel = 1;
								!that.switchAll.isActSel && that.$set(that.switchAll, 'isActSel', !that
									.switchAll.isActSel);
							} else {
								//取消默认选中
								console.log("活动取消选中：" + that.switchAll.isActSel);
								that.isActSel = 2;
								that.switchAll.isActSel && that.$set(that.switchAll, 'isActSel', !that
									.switchAll.isActSel);
								//隐藏活动勾选
								that.act_show = false;
							}
							//如果有老代理商品，则自动选中
							if (flag3 == 1) {
								console.log("老代理选中：" + that.switchAll.isOldSel);
								that.isOldSel = 1;
								!that.switchAll.isOldSel && that.$set(that.switchAll, 'isOldSel', !that
									.switchAll.isOldSel);
							} else {
								console.log("老代理取消选中：" + that.switchAll.isOldSel);
								that.isOldSel = 2;
								that.switchAll.isOldSel && that.$set(that.switchAll, 'isOldSel', !that
									.switchAll.isOldSel);
							}
							//如果有YBK商品，则自动选中
							if (flag4 == 1) {
								console.log("YBK选中：" + that.switchAll.isYbkSel);
								that.isYbkSel = 1;
								!that.switchAll.isYbkSel && that.$set(that.switchAll, 'isYbkSel', !that
									.switchAll.isYbkSel);
							} else {
								console.log("YBK取消选中：" + that.switchAll.isYbkSel);
								that.isYbkSel = 2;
								that.switchAll.isYbkSel && that.$set(that.switchAll, 'isYbkSel', !that
									.switchAll.isYbkSel);
							}

						}



					})

					//计算当前余额(位置不能上移)
					that.getNowCurMoney(res.data.user);

					//是否显示YBK或老代理 ret_old_ybk 0常规代理，1老代理 2ybk代理 3老代理+YBK代理
					let ret_old_ybk = res.data.order[0].list[0].ret_old_ybk;
					if (ret_old_ybk == 3) {
						that.old_show = true;
						that.ybk_show = true;
					} else if (ret_old_ybk == 1) {
						that.old_show = true;
						that.ybk_show = false;
					} else if (ret_old_ybk == 2) {
						that.ybk_show = true;
						that.old_show = false;
					}


					that.$set(that, 'cartInfo', res.data.order);
					that.$set(that, 'order_type', res.data.order_type);

					that.totalPrice = res.data.order_price
					that.orderStatus = res.data.status
					that.proPrice = res.data.total_price
					that.coupon_price = conponNum
					if (res.data.order_type === 2) {
						this.getPresellAgree()
					}
					that.coupon_price = conponNum
					that.order_type = res.data.order_type

					// that.accountAll = res.data.user.account_info;

				}).catch(err => {
					return this.$util.Tips({
						title: err
					}, {
						tab: 3,
						url: 1
					});
				});
			},


			/*
			 * 提取砍价和拼团id
			 */
			getBargainId: function() {
				let that = this;
				let cartINfo = that.cartInfo;
				let BargainId = 0;
				let combinationId = 0;
				cartINfo.forEach(function(value, index, cartINfo) {
					BargainId = cartINfo[index].bargain_id,
						combinationId = cartINfo[index].combination_id
				})
				that.$set(that, 'BargainId', parseInt(BargainId));
				that.$set(that, 'combinationId', parseInt(combinationId));
				if (that.cartArr.length == 3 && (BargainId || combinationId || that.seckillId)) {
					that.cartArr[2].payStatus = 0;
					that.$set(that, 'cartArr', that.cartArr);
				}
			},
			/**
			 * 获取当前金额可用优惠券
			 * 
			 */
			getCouponList: function() {
				let that = this;
				let data = {
					cartId: this.cartId
				}
				getCouponsOrderPrice(this.totalPrice, data).then(res => {
					that.$set(that.coupon, 'list', res.data);
					that.openType = 1;
				});
			},
			/*
			 * 获取默认收货地址或者获取某条地址信息
			 */
			getaddressInfo: function() {
				let that = this;
				if (that.addressId) {
					getAddressDetail(that.addressId).then(res => {
						res.data.is_default = parseInt(res.data.is_default);
						that.addressInfo = res.data || {};
						that.addressId = res.data.address_id || 0;
						that.address.addressId = res.data.address_id || 0;

						this.getConfirm(that.addressId);
					})
				} else {
					getAddressList().then(res => {
						that.addressInfo = res.data.list.length > 0 ? res.data.list[0] : {};
						that.addressId = res.data.list.length > 0 ? res.data.list[0].address_id : 0;
						that.address.addressId = res.data.list.length > 0 ? res.data.list[0].address_id : 0;

						this.getConfirm(that.addressId);
					})
				}

			},
			payItem: function(e) {
				let that = this;
				let active = e;
				that.active = active;
				that.animated = true;
				that.payType = that.cartArr[active].value;
				if (that.payType == 'weixin') {
					that.payType = that.from
				}


				// that.computedPrice();
				// setTimeout(function() {
				// 	that.car();
				// }, 500);
			},
			couponTap: function(item, index) {
				this.coupon = item
				this.$set(this.coupon, 'status', true)
				this.couponIndex = index
				// this.coupon.status = true;

			},
			car: function() {
				let that = this;
				that.animated = false;
			},
			onAddress: function() {
				let that = this;
				that.textareaStatus = false;
				that.address.address = true;
				that.pagesUrl = '/pages/users/user_address_list/index?cartId=' + this.cartId + '&pinkId=' + this
					.pinkId +
					'&couponId=' + this.couponId+'&source='+this.source;

			},
			/**
			 * 开发票
			 */
			goInvoice: function(id) {
				let that = this;
				that.invoice.invoice = true;
				that.invoice.mer_id = id;
				this.$refs.addInvoicing.getInvoiceDefault();
				this.$refs.addInvoicing.getInvoiceList();
			},
			realName: function(e) {
				this.contacts = e.detail.value;
			},
			phone: function(e) {
				this.contactsTel = e.detail.value;
			},
			payment: function(data) {

				let that = this;
				orderCreate(data).then(res => {
					let status = res.data.status,
						orderId = res.data.result.order_id,
						callback_key = res.data.result.pay_key,
						jsConfig = res.data.result.config,
						goPages = '/pages/order_pay_status/index?order_id=' + orderId + '&msg=' + res.message;
					console.log(status, "status");
					switch (status) {
						case 'ORDER_EXIST':
						case 'EXTEND_ORDER':
						case 'PAY_ERROR':
						case 'error':
							uni.hideLoading();
							return that.$util.Tips({
								title: res.msg
							}, {
								tab: 5,
								url: goPages
							});
							break;
						case 'success':
							uni.hideLoading();
							//tom 直接跳转
							uni.redirectTo({
								url: goPages
							})
							/*
							if (that.BargainId || that.combinationId || that.pinkId || that.seckillId)
								return that.$util.Tips({
									title: res.msg,
									icon: 'success'
								}, {
									tab: 4,
									url: goPages
								});
							return that.$util.Tips({
								title: res.msg,
								icon: 'success'
							}, {
								tab: 5,
								url: goPages
							});
							*/
							break;
						case 'alipay':
						case "alipayQr":
							uni.hideLoading();
							this.$emit('onChangeFun', {
								action: 'payClose'
							});
							uni.navigateTo({
								url: '/pages/order_pay_back/index?keyCode=' + callback_key + '&url=' +
									jsConfig
							})
							return;
							break;
							// #ifndef MP
						case "wechat":
						case "weixin":
							jsConfig.timeStamp = jsConfig.timestamp;
							this.$wechat.pay(jsConfig).then(res => {
								console.log('测试支付数据无效的success：' + res.data)
								return that.$util.Tips({
									title: res.message,
									icon: 'success'
								}, {
									tab: 5,
									url: goPages
								});
							}).catch(res => {
								console.log('测试支付数据无效的catch：' + res.data)
								if (res.errMsg == 'chooseWXPay:cancel') return that.$util.Tips({
									title: '取消支付'
								}, {
									tab: 5,
									url: goPages + '&status=0'
								});
							})
							break;
							// #endif
							// #ifdef MP
						case "routine":
							jsConfig.timeStamp = jsConfig.timestamp;
							that.toPay = true;
							uni.requestPayment({
								...jsConfig,
								success: function(res) {
									uni.hideLoading();
									if (that.BargainId || that.combinationId || that.pinkId || that
										.seckillId)
										return that.$util.Tips({
											title: '支付成功',
											icon: 'success'
										}, {
											tab: 4,
											url: goPages
										});
									return that.$util.Tips({
										title: '支付成功',
										icon: 'success'
									}, {
										tab: 5,
										url: goPages
									});
								},
								fail: function(e) {
									uni.hideLoading();
									let pages = '/pages/order_pay_status/index?order_id=' +
										orderId + '&msg=取消支付'
									return that.$util.Tips({
										title: '取消支付'
									}, {
										tab: 5,
										url: pages + '&status=0'
									});
								},
							})
							break;
							// #endif
						case "balance":
							uni.hideLoading();
							//余额不足
							return that.$util.Tips({
								title: res.msg
							}, {
								tab: 5,
								url: goPages + '&status=1'
							});
							break;
							// #ifdef H5
						case 'h5':
							let host = window.location.protocol + "//" + window.location.host;
							let url = `${host}/pages/order_pay_status/index?order_id=${orderId}`
							let eUrl = encodeURIComponent(url)
							let locations = `${jsConfig.mweb_url}&redirect_url=${eUrl}`
							setTimeout(() => {
								location.href = locations;
							}, 100);
							break;
							// #endif		
					}
				}).catch(err => {
					uni.hideLoading();
					return that.$util.Tips({
						title: err
					});
				});
			},

			isEmojiCharacter: function(substring) {
				if (substring) {
					// var reg = new RegExp("[~#^$@%&!?%*]", 'g');
					// if (substring.match(reg)) {
					//     return true;
					// }
					for (var i = 0; i < substring.length; i++) {
						var hs = substring.charCodeAt(i);
						if (0xd800 <= hs && hs <= 0xdbff) {
							if (substring.length > 1) {
								var ls = substring.charCodeAt(i + 1);
								var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
								if (0x1d000 <= uc && uc <= 0x1f77f) {
									return true;
								}
							}
						} else if (substring.length > 1) {
							var ls = substring.charCodeAt(i + 1);
							if (ls == 0x20e3) {
								return true;
							}
						} else {
							if (0x2100 <= hs && hs <= 0x27ff) {
								return true;
							} else if (0x2B05 <= hs && hs <= 0x2b07) {
								return true;
							} else if (0x2934 <= hs && hs <= 0x2935) {
								return true;
							} else if (0x3297 <= hs && hs <= 0x3299) {
								return true;
							} else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
								hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
								hs == 0x2b50) {
								return true;
							}
						}
					}
				}
			},
			SubOrder: function(e) {

				let that = this,
					data = {};
				// if (!that.payType) return that.$util.Tips({
				// 	title: '请选择支付方式'
				// });

				if (!that.addressId && !that.shippingType) return that.$util.Tips({
					title: '请选择收货地址'
				});
				if (that.orderStatus != 'finish') {
					return that.$util.Tips({
						title: '请选择收货地址'
					});
				}
				// if (that.orderStatus == 'noDeliver') {
				// 	return that.$util.Tips({
				// 		title: '暂不发货'
				// 	});
				// }
				// if (that.order_type == 2 && !that.isAgree && that.cartInfo[0].list[0].productPresell.presell_type == 2) {
				// 	return that.$util.Tips({
				// 		title: '请阅读并勾选协议，否则无法进行操作'
				// 	});
				// }
				let tempObj = {}
				let conponNum = 0
				// 默认选中
				that.cartInfo.forEach(el => {
					// el.isTake = 0
					tempObj = that.subCoupon[el.mer_id] = {}
					tempObj.product = []
					tempObj.store = ''
					tempObj.product = el.order.use_coupon_product
					conponNum = that.$util.$h.Add(conponNum, el.order.coupon_price);
					el.coupon.forEach(coupon => {
						if (coupon.coupon.type == 0 && coupon.checked) {
							tempObj.store = coupon.coupon_user_id
						}
					})
				})
				data = {
					// account:that.accountSel.toString(),	//选中的子账户
					model: that.isActSel, //是否参加活动
					is_old: that.isOldSel,
					is_ybk: that.isYbkSel,
					ship : that.ship,
					source:that.source,
					cart_id: that.cartId.split(","),
					address_id: that.addressId,
					coupon: that.subCoupon,
					pay_type: that.payType,
					mark: that.msgObj,
					order_type: that.order_type,
					take: [],
					receipt_data: that.invoiceData,
					// #ifdef H5
					return_url: 'http://' + window.location.host + '/pages/users/order_list/index',
					// #endif
				};
				if (data.mark && that.isEmojiCharacter(data.mark[Object.keys(data.mark)[0]])) {
					that.$util.Tips({
						title: '备注不允许输入表情！'
					});
					return;
				}
				this.cartInfo.map(el => {
					if (el.isTake == 1) {
						data.take.push(el.mer_id)
					}
				})
				// if (data.payType == 'balance' && parseFloat(that.userInfo.now_money) < parseFloat(that.totalPrice)) return that.$util
				// 	.Tips({
				// 		title: '余额不足！'
				// 	});
				uni.showLoading({
					title: '订单支付中',
					mask: true
				});
				// #ifdef MP
				// openPaySubscribe().then(() => {
				// 	that.payment(data);
				// });
				let tmplId1 = 'BFOSXNImNAtzrzwI94syIBLZZUMt3wZ_q9MfAfK8WjM'
				let tmplId2 = 'BBz9ySUlGoDhmM0-j5_swT3yyZBXgWnFaGk8PcGYA9g'
				uni.requestSubscribeMessage({
					tmplIds: [tmplId1,tmplId2],
					success(res) {
						that.payment(data);
					}
				})
				// #endif
				// #ifndef MP
				//that.payment(data);
				// #endif
			},
			// 打开配送方式弹窗
			openShowBox(item, index) {
				that.activeObj = item
				that.activeIndex = index
				that.isShowBox = true
			},
			boxClose() {
				that.isShowBox = false
			},
			getData(data) {
				let self = this
				let freePostage = 0 //没有邮费总价
				let Postage = 0 //有邮费总价
				this.cartInfo[this.activeIndex] = data
				this.cartInfo.map(el => {
					if (el.isTake == 1) {
						freePostage = self.$util.$h.Add(freePostage, el.order.org_price)
					} else {
						Postage = self.$util.$h.Add(Postage, el.order.pay_price)
					}
				})
				this.totalPrice = self.$util.$h.Add(freePostage, Postage)
				this.isShowBox = false
			},
			//查看内置地图
			goMap(item) {
				uni.openLocation({
					latitude: item.take.mer_take_location[0],
					longitude: item.take.mer_take_location[1],
					success: function() {}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.textTip{
		font-size: 24rpx;
		color: red;
		text-align: center;
		margin-bottom: 10rpx;
	}
	.wrapper1 {
		margin-bottom: 12rpx;
		background-color: #fff;

		.item1 {
			padding: 27rpx 30rpx;
			font-size: 30rpx;
			color: #282828;
			display: flex;
			align-items: center;
			justify-content: space-between;
			radio-group{
				flex:1;
				display: flex;
				align-items: center;
				justify-content: space-around;
				margin-left: 200rpx;
				label{
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
			}
		}
	}

	.order-submission .line {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 3rpx;
	}

	.order-submission .line image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-submission .address {
		padding: 28rpx 30rpx;
		background-color: #fff;
		box-sizing: border-box;
	}

	.order-submission .address .addressCon {
		width: 610rpx;
		font-size: 26rpx;
		color: #666;
	}

	.order-submission .address .addressCon .name {
		font-size: 30rpx;
		color: #282828;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.order-submission .address .addressCon .name .phone {
		margin-left: 50rpx;
	}

	.order-submission .address .addressCon .default {
		margin-right: 12rpx;
	}

	.order-submission .address .addressCon .setaddress {
		color: #333;
		font-size: 28rpx;
	}

	.order-submission .address .iconfont {
		font-size: 35rpx;
		color: #707070;
	}

	.order-submission .allAddress {
		width: 100%;
	}

	.order-submission .allAddress .nav {
		width: 710rpx;
		margin: 0 auto;
	}

	.order-submission .allAddress .nav .item {
		width: 355rpx;
	}

	.order-submission .allAddress .nav .item.on {
		position: relative;
		width: 250rpx;
	}

	.order-submission .allAddress .nav .item.on::before {
		position: absolute;
		bottom: 0;
		content: "快递配送";
		font-size: 28rpx;
		display: block;
		height: 0;
		width: 336rpx;
		border-width: 0 20rpx 80rpx 0;
		border-style: none solid solid;
		border-color: transparent transparent #fff;
		z-index: 2;
		border-radius: 7rpx 30rpx 0 0;
		text-align: center;
		line-height: 80rpx;
	}

	.order-submission .allAddress .nav .item:nth-of-type(2).on::before {
		content: "到店自提";
		border-width: 0 0 80rpx 20rpx;
		border-radius: 30rpx 7rpx 0 0;
	}

	.order-submission .allAddress .nav .item.on2 {
		position: relative;
	}

	.order-submission .allAddress .nav .item.on2::before {
		position: absolute;
		bottom: 0;
		content: "到店自提";
		font-size: 28rpx;
		display: block;
		height: 0;
		width: 400rpx;
		border-width: 0 0 60rpx 60rpx;
		border-style: none solid solid;
		border-color: transparent transparent #f7c1bd;
		border-radius: 40rpx 6rpx 0 0;
		text-align: center;
		line-height: 60rpx;
	}

	.order-submission .allAddress .nav .item:nth-of-type(1).on2::before {
		content: "快递配送";
		border-width: 0 60rpx 60rpx 0;
		border-radius: 6rpx 40rpx 0 0;
	}

	.order-submission .allAddress .address {
		height: 150rpx;
		margin: 0 auto;
	}

	.order-submission .allAddress .line {
		margin: 0 auto;
	}

	.order-submission .wrapper .item .discount .placeholder {
		color: #ccc;
	}

	.order-submission .wrapper {
		margin-bottom: 12rpx;
		background-color: #fff;
	}

	.order-submission .wrapper .item {
		padding: 27rpx 30rpx;
		font-size: 30rpx;
		color: #282828;
	}

	.order-submission .wrapper .item .discount {
		font-size: 30rpx;
		color: #999;

		&.discount_voice {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width: 500rpx;
			text-align: right;
		}
	}

	.order-submission .wrapper .item .discount .iconfont {
		color: #515151;
		font-size: 30rpx;
		margin-left: 15rpx;
	}

	.order-submission .wrapper .item .discount .num {
		font-size: 32rpx;
		margin-right: 20rpx;
	}

	.order-submission .wrapper .item .shipping {
		font-size: 30rpx;
		color: #999;
		position: relative;
		padding-right: 58rpx;
	}

	.order-submission .wrapper .item .shipping .iconfont {
		font-size: 35rpx;
		color: #707070;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		margin-left: 30rpx;
	}

	.order-submission .wrapper .item input {
		display: flex;
		flex: 1;
		height: 100%;
		margin-left: 20rpx;
	}

	.order-submission .wrapper .item .placeholder {
		color: #ccc;
	}

	.order-submission .wrapper .item .list {
		margin-top: 35rpx;
	}

	.order-submission .wrapper .item .list .payItem {
		border: 1px solid #eee;
		border-radius: 6rpx;
		min-height: 86rpx;
		width: 100%;
		box-sizing: border-box;
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #282828;
	}

	.order-submission .wrapper .item .list .payItem.on {
		border-color: #fc5445;
		color: #e93323;
	}

	.order-submission .wrapper .item .list .payItem .name {
		width: 80%;
		text-align: left;
		border-right: 1px solid #eee;
		justify-content: left;
		padding-left: 30rpx;
	}

	.order-submission .wrapper .item .list .payItem .name .iconfont {
		width: 44rpx;
		height: 44rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 44rpx;
		background-color: #fe960f;
		color: #fff;
		font-size: 30rpx;
		margin-right: 15rpx;
	}

	.order-submission .wrapper .item .list .payItem .name .iconfont.icon-weixin2 {
		background-color: #41b035;
	}

	.order-submission .wrapper .item .list .payItem .name .iconfont.icon-zhifubao {
		background-color: #4295D5;
	}

	.order-submission .wrapper .item .list .payItem .tip {
		width: 20%;
		text-align: right;
		font-size: 26rpx;
		color: #aaa;
	}

	.order-submission .moneyList {
		margin-top: 12rpx;
		background-color: #fff;
		padding: 30rpx;
	}

	.order-submission .moneyList .item {
		font-size: 28rpx;
		color: #282828;
	}

	.order-submission .moneyList .item~.item {
		margin-top: 20rpx;
	}

	.order-submission .moneyList .item .money {
		color: #868686;
	}

	.order-submission .footer {
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		padding: 0 30rpx;
		font-size: 28rpx;
		color: #333;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.order-submission .footer .settlement {
		font-size: 30rpx;
		color: #fff;
		width: 240rpx;
		height: 70rpx;
		background-color: #e93323;
		border-radius: 50rpx;
		text-align: center;
		line-height: 70rpx;

		&.disabled {
			background-color: #cccccc;
		}
	}

	.footer .transparent {
		opacity: 0
	}

	.event_bg {
		background: #FF7F00;
	}

	.event_color {
		color: #FF7F00;
	}

	.color_red {
		color: #E93323;
	}

	.storeinfo-wrapper {

		.store-item {
			margin-top: 12rpx;
			background-color: #fff;

			.store-title {
				display: flex;
				align-items: center;
				padding: 28rpx 30rpx;

				.icon-shangjiadingdan {
					font-size: 32rpx;
				}

				.icon-xiangyou {
					font-size: 26rpx;
					color: #999;
				}

				.txt {
					margin: 0 8rpx;
				}
			}

			.product-item {
				display: flex;
				padding: 25rpx 30rpx;
				border-top: 1px solid #F0F0F0;

				.img-box {
					width: 130rpx;
					height: 130rpx;

					image {
						width: 130rpx;
						height: 130rpx;
						border-radius: 16rpx;
					}
				}

				.content {
					position: relative;
					width: 550rpx;
					margin-left: 30rpx;
					font-size: 28rpx;
					color: #282828;

					&.event_content {
						.line1 {
							width: 360rpx;
						}

						.price {
							position: absolute;
							top: 0;
							right: 0;
							margin-top: 0;

							text {
								display: block;
								text-align: right;
							}
						}
					}

					.event_name {
						display: inline-block;
						margin-right: 9rpx;
						color: #fff;
						font-size: 20rpx;
						padding: 0 8rpx;
						line-height: 30rpx;
						text-align: center;
						border-radius: 6rpx;
					}

					.event_ship {
						font-size: 20rpx;
						margin-top: 10rpx;
					}

					.label {
						margin-top: 10rpx;
						color: #868686;
						font-size: 20rpx;
					}

					.price {
						margin-top: 20rpx;
						color: $theme-color;

						text {
							margin-left: 10rpx;
							color: #999;
						}
					}

					.err-txt {
						display: flex;
						align-items: center;
						margin-top: 18rpx;
						color: $theme-color;

						.iconfont {
							margin-right: 10rpx;
						}
					}

					.step {
						position: absolute;
						right: 0;
						top: 100rpx;
						display: flex;
						align-items: center;

						.min {
							width: 50rpx;
							height: 40rpx;
							background-image: url('~@/static/images/min.png');
							background-size: 17rpx 17rpx;
							background-position: center;
							background-repeat: no-repeat;
						}

						.num-box {
							width: 68rpx;
							height: 40rpx;
							line-height: 40rpx;
							text-align: center;
							background: #F2F2F2;
							font-size: 23rpx;
						}

						.add {
							width: 50rpx;
							height: 40rpx;
							background-image: url('~@/static/images/add.png');
							background-size: 17rpx 17rpx;
							background-position: center;
							background-repeat: no-repeat;
						}
					}
				}
			}
		}

		.event_payTime {
			padding: 0 30rpx 24rpx;

			.event_progress {
				margin-top: 50rpx;
				position: relative;
			}

			.progress_step {
				height: 80rpx;
				position: relative;
				padding-left: 60rpx;

				&::before {
					content: '';
					display: block;
					width: 2rpx;
					height: 40rpx;
					background: #E93323;
					position: absolute;
					left: 35rpx;
					top: 18rpx;
				}

				&:nth-child(2) {
					&::before {
						bottom: 64rpx;
						top: auto;
						background: #EFEFEF;
					}

					&::after {

						background: #EFEFEF;
					}
				}

				&::after {
					content: '';
					display: block;
					width: 14rpx;
					height: 14rpx;
					background: #E93323;
					border-radius: 50%;
					position: absolute;
					top: 10rpx;
					left: 29rpx;
				}

				.name {
					float: left;
					color: #282828;

					&.color_red {
						color: #E93323;
					}
				}

				.price {
					float: right;
					color: #282828;

					&.color_red {
						color: #E93323;
					}
				}
			}

			.progress_pay {
				padding-left: 60rpx;
				font-size: 24rpx;
				color: #868686;
				margin-top: -34rpx;
			}

		}
	}

	uni-checkbox-group,
	.checkgroup {
		width: 100%;

		.checkbox {
			float: right;
		}
	}

	.icon-wenhao1 {
		color: #868686;
		margin-right: 6rpx;

	}

	.total {
		display: flex;
		justify-content: flex-end;
		padding-right: 30rpx;
		padding-bottom: 30rpx;
		font-size: 26rpx;
		color: #282828;

		.price {
			margin-left: 10rpx;
			color: $theme-color;
			font-size: 28rpx;
			font-weight: bold;

			text {
				font-size: 20rpx;
			}
		}

		.price_grey {
			margin-left: 10rpx;
			color: $theme-color;
			font-size: 28rpx;
			color: #888282;

			text {
				font-size: 20rpx;
			}
		}

		.price_th {
			text-decoration: line-through;
		}
	}

	.store-address {
		display: flex;
		padding: 30rpx 23rpx;
		margin: 0 30rpx;
		background: #F6F6F6;
		border-radius: 8rpx;
		font-size: 24rpx;

		.name {
			width: 148rpx;
			margin-right: 20rpx;
		}

		.info {
			flex: 1;
		}
	}

	.settlementAgreement {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 10;
	}

	.settlementAgreement .setAgCount {
		background: #fff;
		width: 656rpx;
		height: 458px;
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 12rpx;
		-webkit-border-radius: 12rpx;
		padding: 52rpx;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		overflow: hidden;

		.content {
			height: 900rpx;
			overflow-y: scroll;

			/deep/ p {
				font-size: 13px;
				line-height: 22px;
			}

			/deep/ img {
				max-width: 100%;
			}
		}
	}

	.settlementAgreement .setAgCount .icon {
		font-size: 42rpx;
		color: #b4b1b4;
		position: absolute;
		top: 15rpx;
		right: 15rpx;

	}

	.settlementAgreement .setAgCount .title {
		color: #333;
		font-size: 32rpx;
		text-align: center;
		font-weight: bold;
	}

	.settlementAgreement .setAgCount .content {
		margin-top: 32rpx;
		color: #333;
		font-size: 26rpx;
		line-height: 22px;
		text-align: justify;
		text-justify: distribute-all-lines;
		height: 756rpx;
		overflow-y: scroll;
	}

	.show_num {
		font-size: 35rpx;
		margin-left: 10rpx;
		font-weight: bold;

	}

	.show_num1 {
		font-size: 30rpx;
		// font-weight: bold;
	}

	.goods_tag {
		padding: 3rpx 5rpx;
		border: 1px solid #FF5061;
		font-size: 24rpx;
		color: #FF5061 !important;
		margin-right: 10rpx;
	}

	.old_price1 {
		display: inline-block;
		font-size: 24rpx;
		color: #969494 !important;
		margin-left: 15rpx;
	}

	.old_price {
		text-decoration: line-through;
	}

	.infor {
		font-size: 24rpx;
		color: #868686;
		margin-top: 16rpx;
	}
</style>
