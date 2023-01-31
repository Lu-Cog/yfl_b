<template>
	<!-- 首页 -->
	<view class="page page_index">
		<view class="container flex-bt top_body">
			<view class="flex-center">
				<text class="title">{{store_name}}</text>
				<view class="flex-center business">
					<image src="/static/img/yingye.png" mode="widthFix"></image><text>{{store_open_tip}}</text>
				</view>
			</view>
			<view class="sign-in flex-center" @click="qiandao">
				<image src="/static/img/qiandao.png" mode="widthFix"></image>
				<text>签到</text>
			</view>
		</view>
		<view class="scroll_body no-scrollbar">
			<view class="scroll_item" @click="goTo('/pages/wallet/list?home='+1)">
				<image class="item-bg" src="http://imgxcx.yifulai.com/scroll.png" mode="widthFix"></image>
				<text class="money">{{$util.moneyAct(today_turnover)}}&nbsp;</text>
				<text class="name">今日订单收入</text>
			</view>
			<view class="scroll_item" @click="goTo('/pages/wallet/list?home='+2)">
				<image class="item-bg" src="http://imgxcx.yifulai.com/scroll2.png" mode="widthFix"></image>
				<text class="money">{{$util.moneyAct(today_commission)}}&nbsp;</text>
				<text class="name">当月奖励收入</text>
			</view>
			<view class="scroll_item" @click="goTo('/pages/store/share/team?brokerage_price='+brokerage_price)">
				<image class="item-bg" src="http://imgxcx.yifulai.com/scroll3.png" mode="widthFix"></image>
				<text class="money">{{today_member}}&nbsp;</text>
				<text class="name">今日推广会员</text>
			</view>
		</view>
		<view class="notice_list container">
			<uni-list class="uni-list">
				<uni-list-item title="今日订单" thumb="/static/img/index_laba2.png" thumb-size="sm" link
					to="/pages/users/order_list/index">
					<template slot="footer">
						<view class="footer flex-center">
							商品订单<text class="red">{{today_order}}</text>个
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<uni-list class="uni-list">
				<uni-list-item title="今日预约" thumb="/static/img/index_laba.png" thumb-size="sm" link
					to="/pages/store/admin/appoint">
					<template slot="footer">
						<view class="footer flex-center">
							预约<text class="red">{{today_order2}}</text>个，<text class="red">{{today_order3}}</text>个待确认
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<!-- #ifdef MP -->
		<!--直播-->
		<view class="main" v-if="liveList.length > 0">
			<view class="live-count">
				<view>
					<!-- 直播 -->
					<block>
						<view class="spike-bd">
							<view class="title line1">直播专场</view>
							<navigator url="/pages/activity/liveBroadcast/index" class="more-btn" hover-class="none">
								更多<text class="iconfont icon-jiantou" hover-class='none'></text></navigator>
						</view>
						<view class="live-wrapper mores">
							<scroll-view scroll-x="true" style="white-space: nowrap; display: flex">
								<view class="item" v-for="(item, index) in liveList" :key="index">
									<navigator hover-class="none" :url="item.link">
										<view class="live-top"
											:style="'background:' + (item.live_status == 101 ? playBg : (item.live_status != 101 && item.live_status != 102) ? endBg : notBg) + ';'"
											:class="item.live_status == 102 ? 'playRadius' : 'notPlayRadius'">
											<block v-if="item.live_status == 101">
												<image src="/static/images/live-01.png" mode=""></image>
												<text>直播中</text>
											</block>
											<block v-if="item.live_status == 103 && item.replay_status === 1">
												<image src="/static/images/live-02.png" mode=""></image>
												<text>回放</text>
											</block>
											<block
												v-if="(item.live_status != 101 && item.live_status != 102 && item.live_status != 103) ||  (item.live_status == 103 && item.replay_status == 0)">
												<image src="/static/images/live-02.png" mode=""></image>
												<text>已结束</text>
											</block>
											<block v-if="item.live_status == 102">
												<image src="/static/images/live-03.png" mode=""></image>
												<text>预告</text>
											</block>
										</view>
										<view v-if="item.live_status == 101 || item.live_status == 102"
											class="broadcast-time">{{ item.show_time }}</view>
										<image :src="item.share_img"></image>
										<!-- <view class="live-title">{{ item.live_status }}</view> -->
									</navigator>
								</view>
							</scroll-view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<view class="page-section swiper" v-if="imgUrls.length">
			<view class="page-section-spacing">
				<swiper class="swiper" circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<block v-for="(item,index) in imgUrls" :key="index">
						<swiper-item>
							<navigator url='' @click="gotos(item.url)"
								class='slide-navigator acea-row row-between-wrapper' hover-class='none'>
								<image class="swiper-item banner" :src="item.pic" mode="widthFix"></image>
							</navigator>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		
		<view class="grid_body container">
			<navigator class="grid_item flex-center" hover-class="none" :url="'/pages/store/admin/shop?mer_id='+mer_id">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon.png" mode="aspectFit"></image>
				</view>
				<text class="text">店鋪管理</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none"
				:url="'/pages/store/admin/goods?mer_id='+mer_id">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon2.png" mode="aspectFit"></image>
				</view>
				<text class="text">商品管理</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none"
				:url="'/pages/store/admin/project?mer_id='+mer_id">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon3.png" mode="aspectFit"></image>
				</view>
				<text class="text">项目管理</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none"
				:url="'/pages/store/share/team?brokerage_price='+brokerage_price">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon4.png" mode="aspectFit"></image>
				</view>
				<text class="text">我的团队</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none"
				:url="'/pages/store/help/group?store_id='+mer_id">
				<view v-if="boost>0" class="badge flex-center">{{boost}}</view>
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon5.png" mode="aspectFit"></image>
				</view>
				<text class="text">抢多多</text>
			</navigator>

			<navigator class="grid_item flex-center" hover-class="none" url="/pages/activity/liveBroadcast/index?type=1">
				<view class="img_box flex-center">
					<image class="img" src="/static/images/zhibo.png" mode="aspectFit"></image>
				</view>
				<text class="text">直播管理</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none" url="/pages/store/message/index">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon7.png" mode="aspectFit"></image>
				</view>
				<text class="text">我的消息</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none" url="" @click="scanCode()">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon8.png" mode="aspectFit"></image>
				</view>
				<text class="text">扫码核销</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none" url="/pages/store/more/index">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon9.png" mode="aspectFit"></image>
				</view>
				<text class="text">更多</text>
			</navigator>
		</view>
		<uni-popup ref="popup2" type="center">
			<view class="popup_content">
				<view @click="goNew()">
					<image class="imgNew" :src="img111" mode="widthFix"></image>
				</view>
				<image class="del-i" src="http://imgxcx.yifulai.com/del2.png" mode="widthFix" @click="close()"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	let app = getApp();
	import {
		getUserInfo,
		switchType
	} from '@/api/user.js';
	import {
		getIndexData,
		getCoupons
	} from '@/api/api.js';
	// #ifdef MP-WEIXIN
	import {
		getTemlIds,
	} from '@/api/api.js';
	import {
		SUBSCRIBE_MESSAGE,
		TIPS_KEY
	} from '@/config/cache';
	import {
		getLiveList
	} from '@/api/store.js';
	// #endif

	import {
		getShare,
		follow,
		getconfig,
		getWxLoginOpenId
	} from '@/api/public.js';
	import {
		getSeckillIndexTime
	} from '@/api/activity.js';
	import Routine from '@/libs/routine';
	import goodList from '@/components/goodList';
	import promotionGood from '@/components/promotionGood';
	import couponWindow from '@/components/couponWindow';
	import {
		goShopDetail
	} from '@/libs/order.js'
	import {
		mapGetters
	} from "vuex";
	import tabNav from '@/components/tabNav.vue'
	import countDown from '@/components/countDown'
	import {
		getCategoryList,
		getProductslist,
		getProductHot,
		storeCategory,
		storeMerchantList,
		getYuScan
	} from '@/api/store.js';
	import {
		getPresellList,
		getSeckillList,
		getAssistList,
		initiateAssistApi,
		assistUserData
	} from '@/api/activity.js';
	import {
		openBargainSubscribe
	} from '@/utils/SubscribeMessage.js';
	import {
		setVisit,
		spread
	} from '@/api/user.js'
	import recommend from '@/components/recommend';
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	import {
		silenceBindingSpread
	} from '@/utils';
	import history from "@/mixins/history";
	import {
		toLogin
	} from '@/libs/login.js';
	export default {
		computed: mapGetters(['isLogin', 'uid']),
		mixins: [history],
		components: {
			tabNav,
			goodList,
			promotionGood,
			couponWindow,
			countDown,
			recommend,
			// #ifdef MP
			authorize
			// #endif
		},
		data() {
			return {
				act_type:2,
				img111: '',
				countDownHour: "00",
				countDownMinute: "00",
				countDownSecond: "00",
				datatime: '',
				ad: '',
				userInfo: '',
				loading: false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				statusBarHeight: statusBarHeight,
				navIndex: 0,
				navTop: [],
				subscribe: false,
				followUrl: "",
				followHid: true,
				followCode: false,
				logoUrl: app.globalData.site_logo,
				imgUrls: [],
				hot: [],
				sortList: [],
				itemNew: [],
				menus: [],
				bastInfo: '',
				fastInfo: '',
				firstInfo: '',
				firstList: [],
				salesInfo: '',
				likeInfo: [],
				benefit: [],
				indicatorDots: false,
				circular: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				window: false,
				iShidden: false,
				navH: "",
				newGoodsBananr: '',
				couponList: [],
				lovely: [],
				spikeList: [], //秒杀
				liveList: [], //直播
				presellList: [], //预售
				assistList: [], //助力
				assistUserList: [], //已助力数据
				assistUserCount: '',
				combinationList: [],

				spikeList: [],
				bargList: [],
				ProductNavindex: 0,
				marTop: 0,
				datatime: 0,
				childID: 0,
				loadend: false,
				loading: false,
				loadTitle: '加载更多',
				sortProduct: [],
				where: {
					pid: 0,
					page: 1,
					limit: 6,
				},
				is_switch: true,
				hostProduct: [],
				hotPage: 1,
				hotLimit: 8,
				hotScroll: true,
				hotLoading: false,
				hotTitle: '加载更多',
				explosiveMoney: [],
				prodeuctTop: 0,
				pinkInfo: '',
				searchH: 0,
				isFixed: false,
				goodScroll: true, //精品推荐开关
				params: { //精品推荐分页
					page: 1,
					limit: 10,
				},
				tempArr: [], //精品推荐临时数组
				pageInfo: '', // 精品推荐全数据
				site_name: app.globalData.site_name, //首页title
				swiperCur: 0,
				brandList: [],
				d: '',
				h: '',
				m: '',
				s: '',
				sum_h: '',
				endBg: 'linear-gradient(#666666, #999999)',
				notBg: 'rgb(26, 163, 246)',
				playBg: 'linear-gradient(#FF0000, #FF5400)',
				hide_mer_status: 1,
				sortMarTop: 0,
				globalDatas: {},
				mpHeight: 0,

				//新增字段
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,

				today_turnover: 0,
				today_commission: 0,
				today_member: 0,
				today_order: 0,
				today_order2: 0,
				today_order3: 0,
				boost: 0,
				store_name: "默认店铺",
				store_open: 0, //0暂停营业 1营业中 -1已关店
				store_open_tip: "暂停营业",
				mer_id: 0,
				brokerage_price: {}, //佣金账户
				spid: "",
			}
		},
		/**
		 * 用户点击右上角分享
		 */
		// #ifdef MP
		onShareAppMessage: function() {
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			return {
				title: '翌芙莱化妆品商城',
				path: '/pages/index/index?spid=' + this.spid,
			}
		},
		onShareTimeline: function() {
			return {
				title: '翌芙莱化妆品商城',
				query: {
					key: ''
				},
				imageUrl: ''
			}
		},
		// #endif
		onLoad(options) {
			if (options.custom_params) {
				this.spid = option.custom_params
			}
			// uni.getLocation({
			// 	type: 'wgs84',
			// 	success: function(res) {
			// 		try {
			// 			uni.setStorageSync('user_latitude', res.latitude);
			// 			uni.setStorageSync('user_longitude', res.longitude);
			// 		} catch {}
			// 	}
			// });
			let self = this
			this.spid = options.spid
			// #ifdef MP
			// 获取小程序头部高度
			// this.navH = app.globalData.navHeight;
			// let info = uni.createSelectorQuery().select(".mp-header");
			// info.boundingClientRect(function(data) {
			// 	self.marTop = data.height
			// }).exec()
			// #endif
			// #ifndef MP
			this.navH = 0;
			// #endif
			this.isLogin && silenceBindingSpread();
			if (options.spread && this.isLogin) {
				spread(options.spread).then(res => {})
			}
			console.log("---isLogin=" + this.isLogin)
			//   
			// this.setVisit()			

			// #ifdef MP
			this.getLiveList()
			// #endif
			if (this.isLogin) {
				//this.getUserInfo();
				// #ifdef MP
				//this.getHistory()
				// #endif
			} else {
				//跳转登录页
				uni.navigateTo({
					url: '/pages/index/first'
				});
			}

		},
		//上拉刷新
		onPullDownRefresh() {
			console.log("---isLogin update=" + this.isLogin)
			if (this.isLogin) {
				// #ifdef MP
				this.getLiveList()
				// #endif
				this.getUserInfo();
				// #ifdef MP
				//this.getHistory()
				// #endif
			};
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 600);
		},
		onShow() {
			//this.getConfig()
			this.getUserInfo();
			// this.open()
			if (!app.globalData.openid) {
				this.setUserInfoAutoUpdateOpenId()
			}
			if (!this.isLogin) {
				//跳转登录页
				uni.navigateTo({
					url: '/pages/index/first'
				});
			}
			// #ifdef MP
			this.getLiveList()
			// #endif
		},
		onReady() {
			let self = this
			// #ifdef MP
			// setTimeout(res=>{
			// 	let info = uni.createSelectorQuery().select(".mp-header");
			// 	　　　  　info.boundingClientRect(function(data) { //data - 各种参数
			// 						self.mpHeight = data.height
			// 	　　 }).exec()
			// },800)
			// #endif
		},
		watch: {
			globalDatas(nVal, oVal) {
				// #ifdef H5
				this.ShareInfo(nVal)
				// #endif

			}
		},
		methods: {
			goNew() {
				if(this.act_type==1){
					//活动单页
					uni.navigateTo({
						url: '/pages/index/new'
					})
				}else if(this.act_type==2){
					//充值
					uni.navigateTo({
						url: '/pages/users/recharge/index'
					})
				}else if(this.act_type==3){
					//活动报名
					uni.navigateTo({
						url: '/pages/users/recharge/index?go=1'
					})
				}
				
				this.close()
			},
			getLiveList() {
				let that = this;
				getLiveList(2).then(res => {
					that.liveList = res.data.list;
					that.liveList.forEach((val) => {
						val.link = ((val.live_status == 103 && val.replay_status) || val.live_status ===
								101 || val.live_status === 102) ?
							'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + val
							.room_id + '&custom_params=' + that.uid : ''
					});

				}).catch((e) => {});;
			},
			// 签到弹框 关闭
			close() {
				this.$refs.popup2.close()
			},
			open() {
				this.$refs.popup2.open()
			},
			setUserInfoAutoUpdateOpenId() {
				let that = this;
				console.log('Routine111');
				//#ifdef APP-PLUS
				uni.login({
					success: function(loginRes) {
						console.log(loginRes.authResult);
						app.globalData.openid = loginRes.authResult.openid
					},
					fail() {
						console.log('loginRes11');
					}
				});
				//#endif
				//1调用wx.login 获取code
				Routine.getCode().then(res => {
					console.log('Routine2311');
					getWxLoginOpenId({
						"xcx_type": 1,
						"code": res,
						"spid": this.uid
					}).then(res => {
						app.globalData.openid = res.data.openid
					})
				})
			},
			gotos(id) {
				if (id == 11111111) {
					uni.navigateTo({
						url: '/pages/index/new'
					})
				}else if (id == 11111110) {
					uni.navigateTo({
						url: '/pages/users/recharge/index?go=1'
					})
				} else if (id != "#" && Number(id) > 0) {
					uni.navigateTo({
						url: '/pages/goods_details/index?id=' + id
					})
				}
			},
			goTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			//扫一扫
			scanCode() {
				let that = this
				uni.scanCode({
					success(res) {
						console.log(res.result, "res");
						let data = {
							key: res.result
						}
						getYuScan(that.mer_id, data).then(res => {
							uni.navigateTo({
								url: '/pages/store/write-off/index?order_id=' + res.data.order_id +
									'&project_id=' + res.data.project_id + '&type=' + res.data.type
							})
						}).catch(res => {
							uni.showToast({
								title: res,
								icon: 'none'
							})
						})

					},
					fail(res) {
						if (res.errMsg == "scanCode:fail") {
							uni.showToast({
								title: '无法识别此二维码',
								icon: 'none'
							})
						}
					}
				})
			},
			// 微信登录回调
			onLoadFun: function(e) {
				this.isShowAuth = false
			},
			qiandao() {
				uni.navigateTo({
					url: '/pages/points-mall/qiandao'
				});
			},
			setViewport(content) {
				const meta = document.querySelector('meta[name=viewport]');
				if (!meta) return;
				meta.setAttribute('content', content);
			},

			// 菜单详情
			goMenuDetail(item) {
				// let url = this.$util.stringIntercept(item.url, 0, "\?")
				if (item.url == '/pages/goods_cate/goods_cate') {
					let data = this.$util.stringIntercept(item.url, 1, "\?")
					data = this.$util.stringIntercept(data, 1, "\=")
					uni.setStorageSync('storeIndex', data);
					uni.switchTab({
						url: '/pages/goods_cate/goods_cate'
					})
					// try {

					// } catch (e) {}
				} else {
					uni.navigateTo({
						url: item.url
					})
				}
			},
			getConfig() {
				// 获取配置
				getconfig().then(res => {
					let self = this
					this.globalDatas = res.data
					this.logoUrl = res.data.site_logo
					this.site_name = res.data.site_name
					this.hide_mer_status = res.data.hide_mer_status
					uni.setNavigationBarTitle({
						title: self.site_name
					})
					uni.$emit('configData', res.data)
				}).catch(err => {})
			},


			// 绑定商家
			bindPhone() {
				uni.navigateTo({
					url: '/pages/users/user_phone/index'
				})
			},

			/**
			 * 获取商家信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.act_type = res.data.act_open
					uni.setStorageSync('act_open',that.act_type)
					 //关闭弹窗
					if (that.act_type == 0) {
						this.close()
					}else if(app.globalData.act_open != 100){
						//只弹一次
						app.globalData.act_open = that.act_type
						this.open()
					}
					
					this.img111 = res.data.act_pop.ad1
					//商城横幅页广告
					if(that.act_type == 1){
						uni.setStorageSync('img111', res.data.act_pop.ad2)
					}
					//that.userInfo = res.data

					// if(res.data.merchant == false || res.data.merchant_admin == ""){
					// 	//跳转绑定商家
					// 	console.log("跳转绑定商家");
					// 	that.bindPhone();
					// }

					//从后台得到用户身份类型（上次设定的）
					let main_type = res.data.main_type;
					//存储全局用户身份
					app.globalData.userTypeId = main_type;

					let isShoper = res.data.merchant; //是否具备商家身份
					//强行切为商家端
					if (isShoper != false) {
						console.log(res.data.merchant);
						//获取店铺资料
						that.store_name = res.data.merchant.mer_name;
						that.store_open = res.data.merchant.shop_state;
						that.mer_id = res.data.merchant.mer_id;
						app.globalData.mer_id = res.data.merchant.mer_id;
						that.brokerage_price = res.data.acconut_info.brokerage_price.value
						switch (that.store_open) {
							case 1:
								that.store_open_tip = "营业中";
								break;
							case 2:
								that.store_open_tip = "暂停营业";
								break;
							case 3:
								that.store_open_tip = "已关店";
								break;
						}


						if (main_type == 1) {
							//todo 先强调切换到商家账户类型
							switchType(2).then(res => {
								console.log("强制切换商家账户类型");

								//设置全局变量
								app.globalData.userTypeId = 2;

								//获取首页数据
								this.getIndexConfig(that.mer_id)
							});

						} else {
							console.log(that.mer_id, '00990');
							//获取首页数据
							this.getIndexConfig(that.mer_id)
						}


					} else {
						console.error("非商家会员，禁止进入")()
					}


				}).catch(res => {
					uni.showToast({
						title: res.message,
						icon: 'none'
					})
					console.log(res);
				})
			},



			// 记录会员访问
			setVisit() {
				setVisit({
					url: '/pages/index/index'
				}).then(res => {
					// console.log(res)
				})
			},


			// 首页数据
			getIndexConfig: function(id) {

				let that = this;

				getIndexData(id).then(res => {

					that.today_turnover = res.data.today_turnover;
					that.today_commission = res.data.today_commission;
					that.today_member = res.data.today_member;
					that.today_order = res.data.today_order;
					that.today_order2 = res.data.today_order2;
					that.today_order3 = res.data.today_order3;
					that.boost = res.data.boost;
					that.imgUrls = res.data.banner; //首页幻灯
					if (res.data.info == 0) {
						uni.showModal({
							title: '提示',
							content: '请先完善商家资料',
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/store/admin/shop?mer_id=' + that
											.mer_id
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}


					// #ifdef H5
					that.subscribe = res.data.subscribe;
					// #endif

				})
			},

			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},

			//#ifdef H5
			ShareInfo(datas) {
				let data = this.storeInfo;
				let href = location.href;
				if (this.$wechat.isWeixin()) {
					if (this.isLogin) {
						href = href.indexOf("?") === -1 ? href + "?spread=" + this.uid : href + "&spread=" + this.uid;
					} else {
						href = href
					}
					let configAppMessage = {
						desc: datas.share_info,
						title: datas.share_title,
						link: href,
						imgUrl: datas.share_pic
					};

					this.$wechat.wechatEvevt([
						"updateAppMessageShareData",
						"updateTimelineShareData",
						"onMenuShareAppMessage",
						"onMenuShareTimeline"
					], configAppMessage).then(res => {
						console.log(res, '=============================>>WXAPI');
					}).catch(err => {
						console.log(err);
					})

				}
			},
			//#endif
		},
		mounted() {
			let self = this
			// #ifdef H5
			// 获取H5 搜索框高度
			let appSearchH = uni.createSelectorQuery().select(".serch-wrapper");
			appSearchH.boundingClientRect(function(data) {
				self.searchH = data.height
			}).exec()
			// #endif
		},
		// 滚动到底部
		onReachBottom() {
			console.log('到底了')
			// if (this.navIndex == 0) {
			// 	// 首页加载更多
			// 	this.get_host_product();
			// } else {
			// 	// 分类栏目加载更多
			// 	if (this.sortProduct.length > 0) {
			// 		this.get_product_list();
			// 	} else {
			// 		this.get_host_product();
			// 	}
			// }
		},
		// 滚动监听
		onPageScroll(e) {
			// #ifdef H5
			// let self = this
			// if (e.scrollTop >= self.searchH) {
			// 	self.isFixed = true
			// } else {
			// 	self.isFixed = false
			// }
			// #endif
		}
	}
</script>
<style lang="less">
	.main {
		padding: 0 20rpx;
	
		/*直播*/
		.spike-bd {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx 20rpx 20rpx;
		}
	
		.live-count {
			background-color: #fff;
			margin: 0rpx 0rpx 20rpx;
			border-radius: 16rpx;
			padding: 20rpx;
			box-shadow: 4rpx 2rpx 12rpx 2rpx rgba(0, 0, 0, 0.03);
		}
	
		.live-wrapper {
			position: relative;
			width: 100%;
			overflow: hidden;
			border-radius: 16rpx;
	
			image {
				width: 100%;
				height: 400rpx;
			}
	
			.live-top {
				z-index: 20;
				position: absolute;
				left: 0;
				top: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				width: 120rpx;
				height: 32rpx;
	
				&.playRadius {
					border-radius: 0;
				}
	
				&.notPlayRadius {
					border-radius: 0rpx 0px 18rpx 0px;
				}
	
				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 6rpx;
					/* #ifdef H5 */
					display: block;
					/* #endif */
				}
			}
	
			.broadcast-time {
				z-index: 20;
				position: absolute;
				left: 110rpx;
				top: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				width: 160rpx;
				height: 36rpx;
				background: rgba(0, 0, 0, .4);
				font-size: 22rpx;
				border-radius: 0 0 18rpx 0;
			}
	
			.live-title {
				position: absolute;
				left: 0;
				bottom: 6rpx;
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 30rpx;
				color: #fff;
				background: rgba(0, 0, 0, 0.35);
			}
	
			&.mores {
				width: 100%;
	
				.item {
					position: relative;
					width: 280rpx;
					height: 224rpx;
					display: inline-block;
					border-radius: 16rpx;
					overflow: hidden;
					margin-right: 20rpx;
	
					image {
						// width: 320rpx;
						height: 180rpx;
						border-radius: 16rpx;
					}
	
					.live-title {
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						font-size: 22rpx;
					}
	
					.live-top {
						width: 110rpx;
						height: 32rpx;
						font-size: 22rpx;
	
						image {
							width: 20rpx;
							height: 20rpx;
						}
					}
				}
			}
		}
	}
	.popup_content {
		width: 580rpx;
		// height: 531rpx;
		padding: 0;
		border-radius: 0;
		background: none;

		position: relative;

		.imgNew {
			box-shadow: 0px 0px 10rpx 4rpx rgba(255, 255, 0, .5);
			border-radius: 20rpx;
		}

		image {
			// position: absolute;
			// left: 0;
			// top: 0;
			width: 100%;
			// height: 531rpx !important;
		}

		.del-i {
			position: absolute;
			bottom: -45rpx*2;
			left: 0;
			right: 0;
			margin: auto;
			width: 24rpx*2;
			height: 24rpx*2 !important;
		}
	}

	.page_index {
		.top_body {
			padding-top: 20rpx;
			padding-bottom: 20rpx;

			.title {
				font-size: 28rpx;
				font-weight: 500;
				color: #000000;
				margin-right: 40rpx;
			}

			.business {
				image {
					width: 26rpx;
				}

				text {
					font-size: 28rpx;
					font-weight: 500;
					color: #1698AE;
					margin-left: 14rpx;
				}
			}

			.sign-in {
				flex-direction: column;

				text {
					font-size: 20rpx;
					line-height: 35rpx;
				}

				image {
					width: 37rpx;
				}
			}
		}

		.scroll_body {
			display: flex;
			overflow-x: scroll;
			padding-left: 20rpx;

			.scroll_item {
				flex-basis: 285rpx;
				flex-grow: 0;
				flex-shrink: 0;
				height: 180rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding-left: 37rpx;
				position: relative;

				.item-bg {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
					z-index: 1;
				}

				.money {
					font-size: 36rpx;
					color: #fff;
					z-index: 2;
				}

				.name {
					font-size: 24rpx;
					margin-top: 16rpx;
					color: #fff;
					z-index: 2;
				}
			}
		}

		/deep/ .uni-list--border-top,
		/deep/ .uni-list--border-bottom {
			display: none;
		}

		.notice_list {
			.uni-list {
				margin-bottom: 20rpx !important;

				border-radius: 5px;

				.footer {
					font-size: 24rpx;
					height: 34px;
				}

				&:last-child {
					margin-bottom: 0;
				}

				.uni-list-item {
					font-size: 28rpx;
					color: #999;
					height: 116rpx;
					border-radius: 5px;

					.red {
						font-size: 28rpx;
						font-weight: 500;
						color: #FF2A2A;
						padding: 0 6rpx;
					}

				}

			}
		}

		.swiper {
			height: 220rpx;
			width: 690rpx;
			margin: auto;

			.banner {
				width: 100%;
				margin: auto;
				display: block;
				border-radius: 5px;
			}
		}

		.grid_body {
			display: flex;
			flex-wrap: wrap;

			.grid_item {
				height: 204rpx;
				width: 32.6%;
				flex-direction: column;
				background: #ffffff;
				margin-right: 5rpx;
				margin-bottom: 5rpx;

				&:nth-child(3n) {
					margin-right: 0;
				}

				position: relative;

				.badge {
					position: absolute;
					top: 0;
					right: 0;
					left: 40rpx;
					bottom: 80rpx;
					margin: auto;
					width: 30rpx;
					height: 30rpx;
					border: 2rpx solid #FF0000;
					background: #fff;
					border-radius: 10px;
					font-size: 20rpx;
					font-weight: 500;
					color: #FF0000;
					z-index: 30;
				}

				.img_box {
					width: 48rpx;
					height: 48rpx;

					.img {
						width: 48rpx;
						height: 48rpx;
					}
				}

				.text {
					font-size: 28rpx;
					font-weight: 500;
					color: #333333;
					margin-top: 20rpx;
				}
			}
		}
	}
</style>
