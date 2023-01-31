<template>
	<view>
		<form @submit="editPwd" report-submit='true'>
			<view class="ChangePassword">
				<view class="list">
					<view class="item">
						<input type='number' placeholder='填写手机号' placeholder-class='placeholder'
							v-model="phone"></input>
					</view>
					<view class="item acea-row row-between-wrapper">
						<input type='number' placeholder='填写验证码' placeholder-class='placeholder' class="codeIput"
							v-model="captcha"></input>
						<button class="code" :class="disabled === true ? 'on' : ''" :disabled='disabled' @click="code">
							{{text}}
						</button>
					</view>
				</view>
				<button form-type="submit" class="confirmBnt bg-color">确认登录</button>
			</view>
		</form>
		<!-- #ifdef MP -->
		<!-- <authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize> -->
		<!-- #endif -->
	</view>
</template>

<script>
	import sendVerifyCode from "@/mixins/SendVerifyCode";
	import {
		smslogin,
		verifyCode
	} from '@/api/api.js';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		registerVerify
	} from '@/api/user.js'
	import {
		mapGetters
	} from "vuex";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	export default {
		mixins: [sendVerifyCode],
		components: {
			// #ifdef MP
			authorize
			// #endif
		},
		data() {
			return {
				phone: '',
				captcha: '',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				key: '',
				text: "获取验证码",
				disabled: false
			};
		},
		computed: mapGetters(['isLogin']),
		onLoad() {
			if (this.isLogin) {
				// verifyCode().then(res=>{
				// 	this.$set(this, 'key', res.data.key)
				// });
			} else {
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif 
				// #ifdef MP
				// this.isAuto = true;
				// this.$set(this, 'isShowAuth', true)
				// #endif
			}
		},
		methods: {
			onLoadFun: function() {
				this.isShowAuth = false;
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			editPwd: function() {
				let that = this;
				if (!that.phone) return that.$util.Tips({
					title: '请填写手机号码！'
				});
				if (!(/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.phone))) return that.$util.Tips({
					title: '请输入正确的手机号码！'
				});
				if (!that.captcha) return that.$util.Tips({
					title: '请填写验证码'
				});
				smslogin({
					phone: that.phone,
					sms_code: that.captcha
				}).then(res => {
					if (res.data !== undefined && res.data.is_bind) {
						uni.showModal({
							title: '是否登录商家平台',
							content: res.msg,
							confirmText: '登录',
							success(res) {
								if (res.confirm) {
									smslogin({
										phone: that.phone,
										captcha: that.captcha,
										step: 1
									}).then(res => {
										return that.$util.Tips({
											title: res.msg,
											icon: 'success'
										}, {
											tab: 1,
											url: '/pages/index/index'
										});
									}).catch(err => {
										return that.$util.Tips({
											title: err
										});
									})
								} else if (res.cancel) {
									return that.$util.Tips({
										title: '您已取消登录！'
									}, {
										tab: 1,
										url: '/pages/index/index'
									});
								}
							}
						});
					} else {
						that.$store.commit("LOGIN", {
							'token': res.data.token,
							'time': res.data.exp
						});
						that.$store.commit("SETUID", res.data.userInfo.uid);
						that.$store.commit('UPDATE_USERINFO', res.data.userInfo);

						return that.$util.Tips({
							title: '登录成功！',
							icon: 'success'
						}, {
							tab: 1,
							url: '/pages/index/index'
						});
					}


				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			},
			/**
			 * 发送验证码
			 * 
			 */
			code() {
				let that = this;
				if (!that.phone) return that.$util.Tips({
					title: '请填写手机号码！'
				});
				if (!(/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.phone))) return that.$util.Tips({
					title: '请输入正确的手机号码！'
				});
				let num = 59
				this.disabled = true
				registerVerify({
					phone: that.phone,
				}).then(res => {
					console.log(res.data);
					that.$util.Tips({
						title: res.message
					});
					// that.sendCode();
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				});
				let dsq = setInterval(function() {
					num--
					that.text = num + "s后再发送"
					if (num == 0) {
						that.disabled = false
						that.text = "获取验证码"
						clearInterval(dsq)
					}
				}, 1000)


			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff !important;
	}

	.ChangePassword .phone {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 55rpx;
	}

	.ChangePassword .list {
		width: 580rpx;
		margin: 53rpx auto 0 auto;
	}

	.ChangePassword .list .item {
		width: 100%;
		height: 110rpx;
		border-bottom: 2rpx solid #f0f0f0;
	}

	.ChangePassword .list .item input {
		width: 100%;
		height: 100%;
		font-size: 32rpx;
	}

	.ChangePassword .list .item .placeholder {
		color: #b9b9bc;
	}

	.ChangePassword .list .item input.codeIput {
		width: 340rpx;
	}

	.ChangePassword .list .item .code {
		font-size: 26rpx;
		padding: 4rpx 8rpx;
		border: 1px solid #e4e4e4;
		// background-color: #fff;
	}

	.ChangePassword .list .item .code.on {
		// color: #b9b9bc !important;
	}

	.ChangePassword .confirmBnt {
		font-size: 32rpx;
		width: 580rpx;
		height: 90rpx;
		border-radius: 45rpx;
		color: #fff;
		background-color: #1698AE !important;
		margin: 92rpx auto 0 auto;
		text-align: center;
		line-height: 90rpx;
	}
</style>
