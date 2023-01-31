<script>
	import {
		checkLogin
	} from "./libs/login";
	import {
		HTTP_REQUEST_URL
	} from './config/app';
	import {
		getconfig,
		history
	} from '@/api/public.js'
	export default {
		globalData: {
			act_open: 0,
			spid: 0,
			code: 0,
			openid: '',
			unionid: '',
			isLogin: false,
			userTypeId: 2, //当前用户类型 1=用户 2=商家
			userInfo: {},
			MyMenus: [],
			balance_func_status: 0, //余额开关
			recharge_switch: 0, // 充值开关
			store_user_min_recharge: 0, //最小充值
			yue_pay_status: 0, //余额支付开关
			alipay_open: 0, //支付宝支付开关
			routine_logo: '', //首页logo
			site_logo: '',
			site_name: '', //名称
			fid: '', //一级分类id
			uid: '',
			hide_mer_status: 0,
			mer_id: '',
			accountAll: ["margin", "first_batch", "now_money", "activity_principal", "activity_bonus", "reward_account",
				"especially", "ybk", "brokerage_price"
			],
		},
		onLaunch: function(option) {
			this.globalData.uid = this.$store.state.app.uid
			let that = this;
			// #ifdef MP
			if (HTTP_REQUEST_URL == '') {
				console.error(
					"请配置根目录下的config.js文件中的 'HTTP_REQUEST_URL'\n\n请修改开发者工具中【详情】->【AppID】改为自己的Appid\n\n请前往后台【小程序】->【小程序配置】填写自己的 appId and AppSecret"
				);
				return false;
			}
			if (option.query.hasOwnProperty('scene')) {
				switch (option.scene) {
					//扫描小程序码
					case 1047:
						let val = that.$util.getUrlParams(decodeURIComponent(option.query.scene));

						that.globalData.code = val;
						break;
						//长按图片识别小程序码
					case 1048:
						that.globalData.code = option.query.scene;
						break;
						//手机相册选取小程序码
					case 1049:
						that.globalData.code = option.query.scene;
						break;
						//直接进入小程序
					case 1001:
						that.globalData.spid = option.query.scene;
						break;
				}
			}
			// #endif
			// 获取导航高度；
			uni.getSystemInfo({
				success: function(res) {
					that.globalData.navHeight = res.statusBarHeight * (750 / res.windowWidth) + 91;
				}
			});
			// 获取配置
			getconfig().then(res => {
				uni.$emit('update', res.data)
				this.globalData.balance_func_status = res.data.balance_func_status
				this.globalData.recharge_switch = res.data.recharge_switch
				this.globalData.routine_logo = res.data.routine_logo
				this.globalData.site_logo = res.data.site_logo,
					this.globalData.site_name = res.data.site_name
				this.globalData.store_user_min_recharge = res.data.store_user_min_recharge
				this.globalData.yue_pay_status = res.data.yue_pay_status
				this.globalData.sys_intention_agree = res.data.sys_intention_agree
				this.globalData.mer_intention_open = res.data.mer_intention_open
				this.globalData.alipay_open = res.data.alipay_open
				this.globalData.hide_mer_status = res.data.this.globalData


				try {
					uni.setStorageSync('SUBSCRIBE_MESSAGE', res.data.tempid);
				} catch (e) {
					// error
				}
				// #ifdef H5
				this.setOpenShare(res.data);
				// #endif
			}).catch(err => {})
		},

		methods: {
			// 微信分享；
			setOpenShare: function(data) {
				let that = this;
				let href = location.href;
				href = href.indexOf("?") === -1 ? href + "?spread=" + this.globalData.uid : href + "&spread=" + this
					.globalData.uid;
				if (that.$wechat.isWeixin()) {
					let configAppMessage = {
						desc: data.share_info,
						title: data.share_title,
						link: href,
						imgUrl: data.share_pic
					};
					that.$wechat.wechatEvevt(["updateAppMessageShareData", "updateTimelineShareData"],
						configAppMessage);

				}
			}
		},
		onShow() {
			const updateManager = uni.getUpdateManager();

			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
			});

			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});

			});
			// 记录H5和公众号
			if (this.$store.state.app.token) {
				// 浏览记录
				// #ifdef H5
				history({
					page: location.pathname + location.search,
				}).then(() => {});
				//#endif
			}

		},
		onHide: function() {
		},
		watch: {
			// 记录H5和公众号
			$route(n) {
				if (this.$store.state.app.token) {
					// 浏览记录
					history({
						page: location.pathname + location.search,
					}).then(() => {});
				}
			},
		}
	}
</script>

<style>
	@import url("@/plugin/animate/animate.min.css");
	@import 'static/css/base.css';

	@import 'static/iconfont/iconfont.css';
	@import 'static/css/guildford.css';
	@import 'static/css/style.scss';

	view {
		box-sizing: border-box;
	}

	.bg-color-red {
		background-color: #e93323 !important;
	}

	.syspadding {
		padding-top: var(--status-bar-height);
	}

	.flex {
		display: flex;
	}

	.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	::-moz-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.empty-txt {
		line-height: 100rpx;
		font-size: 22rpx;
		color: #999;
		text-align: center;
	}

	.product-con .conter img {
		display: block;
	}
</style>



<style lang="less">
	/*-------------新增-----------*/

	@import 'static/css/common.css';

	page {
		background: #f7f7f7;
	}

	.container {
		padding: 15px;
		font-size: 14px;
		line-height: 24px;
	}

	view {
		box-sizing: border-box;
	}

	.bg-color-red {
		background-color: #e93323 !important;
	}

	.syspadding {
		padding-top: var(--status-bar-height);
	}

	.flex {
		display: flex;
	}

	.no-scrollbar::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none;
		width: 0;
		height: 0;
		color: transparent;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	::-moz-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.empty-txt {
		line-height: 100rpx;
		font-size: 22rpx;
		color: #999;
		text-align: center;
	}

	.product-con .conter img {
		display: block;
	}

	// .hr_shadow {
	// 	position: relative;

	// 	&::after {
	// 		position: absolute;
	// 		content: '';
	// 		bottom: 0;
	// 		left: 0;
	// 		width: 100%;
	// 		height: 1px;
	// 		box-shadow: inset 1px -1px 1px -1px #E4E4E4;
	// 	}

	// 	&:last-child {
	// 		&::after {
	// 			display: none;
	// 		}
	// 	}
	// }

	.button_block {
		justify-content: flex-end;

		button {
			width: 162px/2;
			height: 56px/2;
			border: 1px/2 solid #999999;
			border-radius: 28px/2;
			font-size: 12px;
			font-weight: 500;
			color: #666666;
			margin-left: 45px/2;

			&.yes {
				color: #FFFFFF;
				background: #1698AE;
			}
		}
	}

	.tabs_body {
		.tab_body {
			background: #fff;
			position: sticky;
			top: 0;
			z-index: 999;

			.tab_item {
				width: 50%;
				font-size: 32px/2;
				font-weight: 500;
				color: #000000;
				padding: 15px 0;

				image {
					width: 32px/2;
					height: 36px/2;
					margin-right: 11px/2;
				}

				&.active {
					color: #1698AE;
					position: relative;

					&::after {
						content: " ";
						position: absolute;
						left: 0;
						bottom: -1px;
						width: 100%;
						height: 2px;
						background: #1698AE;
					}
				}
			}
		}
	}

	.card_block {
		background-color: #fff;
		border-radius: 4px;
		margin-bottom: 12px;

		.banner-img {
			position: relative;
			width: 100%;
			border-radius: 4px;

			image {
				width: 100%;
				border-radius: 4px;
			}

			.mask_box {
				border-radius: 4px;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(000, 000, 000, 0.5);

				text {
					font-size: 36px/2;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
		}

		.card_content {
			padding: 0 15px/2;
			padding-top: 33px/2;

			.title {
				font-size: 30px/2;
				font-weight: bold;
				color: #333333;
				line-height: 40px/2;
				height: 40px;
				margin-bottom: 10px;
			}

			.progress_body {
				width: 389px/2;
				height: 27px/2;
				background: #fee4ce;
				border-radius: 14px/2;
				position: relative;

				.now {
					width: 40%;
					height: 100%;
					background: linear-gradient(-90deg, #FF4644, #FD7E39);
					border-radius: 14px/2;
					font-size: 0;
				}

				.number {
					font-size: 20px/2;
					font-weight: bold;
					color: #FFFFFF;
					position: absolute;
					top: 0;
					bottom: 0;
					left: 14px/2;
					margin: auto;
				}

				.rate {
					font-size: 20px/2;
					font-weight: 500;
					color: #F23030;
					position: absolute;
					top: 0;
					bottom: 0;
					right: 14px/2;
					margin: auto;
				}
			}

			.flex-row {
				padding: 46px/2 0 70px/2;

				.price_block {
					.price {
						font-size: 40px/2;
						font-weight: bold;
						color: #FF002B;
					}

					.badge {
						display: inline-block;
						height: 36px/2;
						padding: 0 10px;
						background: #fee4ce;
						border-radius: 18px/2;
						font-size: 10px;
						font-weight: bold;
						color: #FF002B;
						line-height: 18px;
					}
				}

				button {
					width: 160px/2;
					height: 60px/2;
					background: linear-gradient(180deg, #1698AE 0%, #4AC8DD 100%);
					box-shadow: 0px 2px/2 20px/2 0px rgba(22, 152, 174, 0.5);
					border-radius: 30px/2;
					font-size: 30px/2;
					font-weight: bold;
					color: #FFFFFF;

					&.no {
						background: #ababab;
						box-shadow: 0px 2px/2 20px/2 0px rgba(171, 171, 171, 0.5);
					}
				}
			}

		}
	}

	.order_block {
		background: #fff;
		border-radius: 10px/2;
		padding: 35px/2 15px;
		margin-bottom: 11px;

		.order-header {
			.order {
				font-size: 28px/2;
				color: #333333;
			}

			.state {
				font-size: 24px/2;
				color: #1698AE;
			}
		}

		.order_mid {
			display: flex;
			margin-top: 30px;
			position: relative;

			.order-img {
				flex-basis: 172px/2;
				flex-grow: 0;
				flex-shrink: 0;
				height: 152px/2;
				border-radius: 5px;
			}

			.order_content {
				margin-left: 15px;

				.name {
					height: 30px;
					font-size: 26px/2;
					line-height: 30px/2;
					font-weight: 500;
					color: #333333;
				}

				.price {
					margin-top: 40px;
					font-size: 28px/2;
					font-weight: 500;
					color: #FF002B;
				}
			}

			.number {
				position: absolute;
				bottom: 6px;
				right: 36px/2;
				font-size: 24px/2;
				color: #7B7A7A;
			}
		}

		.hr {
			width: 100%;
		}

		.order_dow {
			text-align: right;
			font-size: 28px/2;
			font-weight: 500;
			color: #000000;
			margin: 33px/2 0 35px/2;

			text {
				color: #FF3939;
				padding: 0 2px;
			}
		}

		.button_block {
			justify-content: flex-end;

			button {
				width: 162px/2;
				height: 56px/2;
				border: 1px/2 solid #999999;
				border-radius: 28px/2;
				font-size: 12px;
				font-weight: 500;
				color: #666666;
				margin-left: 45px/2;

				&.yes {
					color: #FFFFFF;
					background: #1698AE;
				}
			}
		}
	}

	.customer_list {
		.list_item {
			padding: 36px/2 0;
			padding-left: 30px/2;
			padding-right: 15px;
			background: #fff;
			margin-bottom: 20px/2;

			.item_user {
				width: 60px;
				height: 60px;
				margin-right: 12px;
				border-radius: 50%;
			}

			.item_mid {
				flex: 1;
				flex-direction: column;
				align-items: flex-start;

				.name {
					font-size: 30px/2;
					font-weight: bold;
					color: #333333;
				}

				.phone {
					font-size: 24px/2;
					font-weight: 500;
					color: #999999;
					margin: 5px 0;
				}

				.time {
					font-size: 24px/2;
					font-weight: 500;
					color: #999999;
				}

				.xinxi {
					font-size: 24px/2;
					font-weight: 500;
					color: #999999;
				}

				.grade {
					font-size: 24px/2;
					font-weight: 500;
					color: #999999;
				}

				.grade-vip {
					color: #FF9300;
				}

				.grade-important {
					color: #F76368;
				}
			}

			.item_call {
				width: 44px/2;
				height: 22px;
			}
		}
	}

	.popup_content {
		width: 681px/2;
		padding: 63px/2 0;
		// height: 588px/2;
		background: #FFFFFF;
		border-radius: 10px/2;
	}

	// 表单html  add-bank
	.form_body {
		.red {
			color: #FF2A2A;
		}

		textarea {
			width: 310px;
			height: 217px/2;
			margin: auto;
			border: 1px/2 solid #BFBFBF;
			border-radius: 5px;
			padding: 11px 17px/2;
			font-size: 13px;
			color: #999999;
		}

		.block {
			background: #FFFFFF;
		}

		.uni-form-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 55px;
			padding: 0 15px;
			margin-top: 9px;

			.title {
				font-size: 14px;
				font-weight: 500;
				color: #333333;
				width: 130px;
			}

			.uni-input {
				font-size: 14px;
				color: #999999;
				flex: 1;
				text-align: right;
				padding-right: 5px;
			}

			.uni-input-placeholder {
				color: #999999;
			}

			picker {
				flex: 1;

			}

			.i-add {
				width: 40px;
				height: 40px;
				margin-right: 22px/2;
			}

			.i-right {
				width: 32px/2;
				height: 32px/2;
			}



			.right_block {
				.ccc {
					font-size: 12px;
					font-weight: 500;
					color: #999999;
					margin-right: 5px;
				}
			}
		}

		.submit_btn {
			width: 690px/2;
			margin: auto;
			margin-top: 45px;
			height: 44px;
			background: #1698AE;
			border-radius: 5px;
			font-size: 32px/2;
			font-weight: 500;
			color: #FFFFFF;
		}

		.form-btn {
			width: 691px/2;
			height: 91px/2;
			margin: auto;
			background: #1698AE;
			border-radius: 10px/2;
			font-size: 32px/2;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
</style>
