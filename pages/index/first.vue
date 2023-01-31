<template>
	<!-- 客户-客户详情 -->
	<view class="page page-login" v-show="showBtn">
		<view class="page-section">
			<swiper class="swiper" :style="{height:windowHeight+'px'}" circular="true" :indicator-dots="indicatorDots"
				:autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in imgUrls" :key='index'>
					<image class="swiper-item banner" :src="item.pic" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- <image class="page-bg" src="http://imgxcx.yifulai.com/6bdd5202103081100538881.jpg" mode="aspectFill"></image> -->
		<!-- <button type="default" v-if="stype==1" class="login-btn flex-center" @click="openAuto()" hover-class="none"
			withCredentials="true">登录商户管理平台</button> -->
		<button type="default" class="login-btn flex-center" open-type="getPhoneNumber" @getphonenumber="getphonenumber"
			hover-class="none" withCredentials="true">授权登录商家平台
		</button>
		<button type="default" class="login-btn2 flex-center" hover-class="none" withCredentials="true"
			@click="bindPhone()">短信验证码登录
		</button>
		<!-- #ifdef MP -->
		<!-- <authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize> -->
		<!-- #endif -->

	</view>

</template>

<script>
	import Routine from '@/libs/routine';
	import store from '@/store';
	import {
		getFirstImg,
	} from '@/api/api.js';
	import {
		getPhoneLogin,
	} from '@/api/public';
	import {
		getUserInfo,
		setVisit
	} from '@/api/user.js';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from "vuex";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	const app = getApp();
	export default {
		components: {
			// #ifdef MP
			authorize
			// #endif
		},
		computed: mapGetters(['isLogin', 'stype']),

		data() {
			return {

				showBtn: false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				userInfo: {},

				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				windowHeight: '',
				imgUrls: [],
				code: ''
			}
		},
		onLoad() {
			this.getFirstImg()
			this.getCode()
		},
		onShow: function() {
			let that = this;
			if (that.isLogin) {
				//that.gotoIndex();
				that.getUserInfo();
				// that.setVisit();
			} else {
				// #ifdef H5 || APP-PLUS
				// toLogin();
				// #endif
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight;
				}
			});

			console.log("---isLogin=" + this.isLogin);
			if (this.isLogin) {
				// this.gotoIndex();
			} else {
				this.showBtn = true;
			}
		},
		methods: {
			// 首页数据
			getFirstImg: function() {
				let that = this;
				getFirstImg().then(res => {
					that.imgUrls = res.data; //首页幻灯
				})
			},
			// 去聊天列表
			goChat() {
				let type = this.userInfo.service ? 1 : 0
				uni.navigateTo({
					url: `/pages/chat/customer_list/index?type=${type}`
				})

			},
			// 记录会员访问
			setVisit() {
				setVisit({
					url: '/pages/user/index'
				}).then(res => {})
			},
			getphonenumber(res) {
				console.log(res,'phone');
				if (res.detail.errMsg !== "getPhoneNumber:ok") {
					return uni.showToast({
						title: '您取消了授权手机号',
						icon: 'none',
						duration: 1000
					});
				}
				let that = this
				uni.showLoading({
					title: '正在登录中'
				});
				let openid = app.globalData.openid
				let unionid = app.globalData.unionid
				let iv = res.detail.iv
				let encryptedData = res.detail.encryptedData
				uni.checkSession({
					success(res) {
						getphone()
					},
					fail(err) {
						that.getCode()
						getphone()
					}
				})

				function getphone() {
					getPhoneLogin({
						"code": that.code,
						"iv": iv,
						"encryptedData": encryptedData,
						"unionid": unionid,
						"openid": openid,
						'xcx_type': 1
						// "store_id": that.store_id,
						// "spid": that.uid
					}).then(res => {
						uni.hideLoading();
						store.commit('UPDATE_USERINFO', res.data.userInfo);
						store.commit('STYPE', {
							stype: res.data.stype
						});
						store.commit('LOGIN', {
							token: res.data.token
						});
						store.commit('STOREID', res.data.userInfo.mer_id)
						store.commit('SETUID', res.data.userInfo.uid);
						// Cache.set(USER_INFO, res.data.userInfo, time);
						that.gotoIndex();
						uni.showToast({
							title: '登录成功',
							icon: 'none',
							duration: 1000
						});
					}).catch(res => {
						uni.showToast({
							title: res,
							icon: 'none',
							duration: 1000
						});
						that.getCode()
					})
				}
			},
			getCode() {
				let that = this
				Routine.getCode().then(res => {
					that.code = res
				}).catch(res => {
					uni.showToast({
						title: '网络故障，请切换网络尝试',
						icon: 'none',
						duration: 1000
					});
				})
			},
			// 打开授权
			openAuto() {
				this.isAuto = true;
				this.isShowAuth = true
			},
			// 授权回调
			onLoadFun() {

				if (this.isShowAuth) {
					this.getUserInfo();
				}
				this.isShowAuth = false;
				if (this.isLogin) {
					this.gotoIndex();
				}
			},
			Setting: function() {
				uni.openSetting({
					success: function(res) {
						console.log(res.authSetting)
					}
				});
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},

			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.userInfo = res.data,
						that.is_promoter = res.data.is_promoter
					that.extension_status = res.data.extension_status
					// console.log(that.userInfo);
					// if (that.userInfo.merchant == false || that.userInfo.merchant_admin == "") {
					// 	//跳转绑定商家
					// 	console.log("跳转绑定商家");
					// 	that.bindPhone();
					// } else {
					//跳转首页
					that.gotoIndex();
					// }

				});
			},
			// 签到
			goSignIn() {
				uni.navigateTo({
					url: '/pages/users/user_sgin/index'
				})
			},
			gotoIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			// 绑定商家
			bindPhone() {
				uni.navigateTo({
					url: '/pages/users/user_phone/index'
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	page {
		// background-color: #6b6aec;
	}

	.swiper {
		min-height: 600px
	}

	.page-login {
		.page-section {

			.swiper-item {
				z-index: 1;
				height: 100%;
				margin: auto;
				width: 100%;
				display: block;
			}
		}

		.page-bg {
			width: 100%;
			// height: 100%;
			z-index: 1;
		}

		.login-btn {
			font-size: 30rpx;
			font-weight: 500;
			color: #FFFFFF;
			width: 350rpx;
			height: 102rpx;
			background: #1698AE;
			border-radius: 51rpx;
			z-index: 10;
			position: absolute;
			left: 0;
			right: 0;
			top: 60%;
			margin: auto;
		}

		.login-btn2 {
			font-size: 26rpx;
			font-weight: 500;
			// padding: 10rpx ;
			width: 240rpx;
			background: #fff;
			// border-radius: 51rpx;
			z-index: 10;
			position: absolute;
			left: 260rpx;
			right: 0;
			top: 73%;
			margin: auto;
			// box-shadow: 0px 0px 10rpx 5rpx #1698AE;
			text-decoration: underline;
		}
	}
</style>
