<template>
	<view>
		<view class='Popup' v-if='isShowAuth'>
			<view class="logo-auth">
				<image :src='logoUrl' mode="aspectFit"></image>
			</view>
			<view class='title'>授权提醒</view>
			<view class='tip'>请授权头像等信息，以便为您提供更好的服务</view>
			<view class='bottom flex'>
				<view class='item' @click='close'>暂不授权</view>
				<!-- #ifdef APP-PLUS -->
				<button class='item grant' @click="setUserInfo">去授权</button>
				<!-- #endif -->
				<!-- #ifdef MP -->
				<!-- <button class='item grant'  type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="setUserInfo">去授权</button> -->
				<text class='item grant' @click="setUserInfo">去授权</text>
				<!-- <button class='item grant'  type="primary" open-type="getPhoneNumber" lang="zh_CN" @getuserinfo="setUserInfo">授权手机号</button> -->
				<!-- #endif -->
			</view>
		</view>
		<view class='mask' v-if='isShowAuth' @click='close'></view>
	</view>
</template>

<script>
	const app = getApp();
	import store from '../store';
	import Cache from '../utils/cache';
	import {
		getLogo,
		getWxLoginOpenId
	} from '../api/public';
	import {
		LOGO_URL
	} from '../config/cache';
	import {
		mapGetters
	} from 'vuex';
	import Routine from '../libs/routine';

	export default {
		name: 'Authorize',
		props: {
			isAuto: {
				type: Boolean,
				default: true
			},
			isGoIndex: {
				type: Boolean,
				default: true
			},
			isShowAuth: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				logoUrl: app.globalData.routine_logo,
			}
		},
		computed: mapGetters(['isLogin', 'userInfo', 'uid']),
		watch: {
			isLogin(n) {
				n === true && this.$emit('onLoadFun', this.userInfo);
			}
		},
		created() {
			this.getLogoUrl();
			this.setAuthStatus();
			uni.$on('update', (data) => {
				this.logoUrl = data.site_logo
			})
		},
		mounted: function() {
			this.$nextTick(() => {
				this.logoUrl = app.globalData.site_logo
			});
		},
		methods: {
			setAuthStatus() {
				if (this.isLogin) {
					this.setUserInfoAuto();
				}
			},
			// setAuthStatus() {
			// 	Routine.authorize().then(res => {
			// 		if (res.islogin === false)
			// 			this.setUserInfoAuto();
			// 		else
			// 			this.$emit('onLoadFun', this.userInfo);
			// 	}).catch(res => {
			// 		if (this.isAuto)
			// 			this.$emit('authColse', true);
			// 	})
			// },
			setUserInfoAuto() {
				console.log("进入setUserInfoAuto方法");
				uni.showLoading({
					title: '正在登录中'
				});
				//1调用wx.login 获取code
				Routine.getCode().then(code => {
					getWxLoginOpenId({
						"code": code,
						'spid': this.uid,
						'xcx_type': 1
					}).then(res => {
						console.log(res, 'setUserInfoAuto');
						app.globalData.openid = res.data.openid
						app.globalData.unionid = res.data.unionid
						uni.hideLoading();
						//从后台获取openid,判断用户是否需要获取身份信息type 1认证，2自动登录
						if (res.data.stype == 1) {
							this.$emit('authColse', true);
						} else if (res.data.stype == 3) {
							let time = res.data.expires_time - Cache.time();
							store.commit('UPDATE_USERINFO', res.data.userInfo);
							store.commit('STYPE', {
								stype: res.data.stype,
								time: time
							});
							store.commit('LOGIN', {
								token: res.data.token,
								time: time
							});
							store.commit('STOREID', {
								store_id: res.data.userInfo.mer_id
							});
							store.commit('SETUID', res.data.userInfo.uid);
							// Cache.set(EXPIRES_TIME, res.data.expires_time, time);
							Cache.set(USER_INFO, res.data.userInfo, time);
							//自动登录
							console.log("自动登录", this.userInfo)
							uni.hideLoading();
							this.$emit('authColse', false);
							this.$emit('onLoadFun', this.userInfo);
						}

					}).catch(res => {
						uni.hideLoading();
						this.$emit('authColse', true);
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					})

				}).catch(res => {
					this.$emit('authColse', true);
					uni.hideLoading();
				})
			},
			// 此处开始请求解密 -TOM todo
			getUserInfo(openId, unionid) {
				Routine.getUserProfile().then(res => {
					console.log(
					"------2调用一次隐式获取用户信息方法uni.getUserProfile，拿到另外参数 encryptedData、errMsg、iv（不含openId）");
					let userInfo = res.userInfo.userInfo
					console.log(openId,'openid');
					userInfo.openid = app.globalData.openid, 
					userInfo.unionid = app.globalData.unionid
					userInfo.xcx_type = 1
					// userInfo.spread_spid = app.globalData.spid;//获取推广人ID
					// userInfo.spread_code = app.globalData.code;//获取推广人分享二维码ID

					//用户认证
					Routine.authUserInfo(userInfo).then(res => {
						uni.hideLoading();
						uni.showToast({
							title: '资料同步成功',
							icon: 'none',
							duration: 1000
						});
						this.$emit('authColse', false);
						this.$emit('onLoadFun', this.userInfo);
					}).catch(res => {
						uni.hideLoading();
						uni.showToast({
							title: res,
							icon: 'none',
							duration: 2000
						});

					})

				}).catch(res => {
					uni.hideLoading();
				})
			},
			setUserInfo() {
				console.log("进入setUserInfo方法");
				uni.showLoading({
					title: '正在授权中'
				});
				//1调用wx.login 获取
				this.getUserInfo();

			},
			getLogoUrl() {
				this.logoUrl = app.globalData.routine_logo
				// let that = this;
				// if (Cache.has(LOGO_URL)) {
				// 	this.logoUrl = Cache.get(LOGO_URL);
				// 	return;
				// }
				// getLogo().then(res=>{
				// 	that.logoUrl = res.data.logo_url
				// 	Cache.set(LOGO_URL,that.logoUrl);
				// })
			},
			close() {
				let pages = getCurrentPages(),
					currPage = pages[pages.length - 1];
				this.$emit('authColse', false);

				// if(this.isGoIndex){
				// 	uni.switchTab({url:'/pages/index/index'});
				// } else {
				// 	this.$emit('authColse',false);
				// }

				// if (currPage && currPage.isShowAuth != undefined){
				// 	currPage.isShowAuth = true;
				// }
			},
		}
	}
</script>

<style scoped lang='scss'>
	.Popup {
		width: 500rpx;
		background-color: #fff;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -250rpx;
		transform: translateY(-50%);
		z-index: 1000;
	}

	.Popup {
		.logo-auth {
			z-index: -1;
			position: absolute;
			left: 50%;
			top: 0%;
			transform: translate(-50%, -50%);
			width: 150rpx;
			height: 150rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 8rpx solid #fff;
			border-radius: 50%;
			background: #fff;
		}

		image {
			height: 42rpx;
			margin-top: -54rpx;
		}
	}

	.Popup .title {
		font-size: 28rpx;
		color: #000;
		text-align: center;
		margin-top: 30rpx
	}

	.Popup .tip {
		font-size: 22rpx;
		color: #555;
		padding: 0 24rpx;
		margin-top: 25rpx;
	}

	.Popup .bottom .item {
		width: 50%;
		height: 80rpx;
		background-color: #eeeeee;
		text-align: center;
		line-height: 80rpx;
		font-size: 24rpx;
		color: #666;
		margin-top: 54rpx;
	}

	.Popup .bottom .item.on {
		width: 100%
	}

	.flex {
		display: flex;
	}

	.Popup .bottom .item.grant {
		font-size: 28rpx;
		color: #fff;
		font-weight: bold;
		background-color: #e93323;
		border-radius: 0;
		padding: 0;
	}

	.mask {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.65);
		z-index: 999;
	}
</style>
