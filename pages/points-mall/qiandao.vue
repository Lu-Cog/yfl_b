<template>
	<!-- 积分商城-每日签到 -->
	<view class="page points-mall_index">
		<view class="top_body">
			<myhead :title="'每日签到'"></myhead>
			<view class="top_content flex-center">
				<image class="top_img" :src="mer_avatar?mer_avatar:image" mode="aspectFill"></image>
				<view class="top_text">
					<view class="name">{{mer_name}}</view>
					<view class="badge">LV.{{merchant_level_id}}</view>
				</view>
			</view>
			<view class="fixed_bolck flex-center" @click="goto('/pages/points-mall/rule')">签到规则</view>
			<view class="tab_body flex-bt">
				<image src="http://imgxcx.yifulai.com/today.png" mode="widthFix"></image>
				<view class="left_block">
					<view class="title">我的积分</view>
					<view class="number">{{score}}</view>
				</view>
				<button hover-class="none" type="default" class="right_btn flex-center" @click="goto('/pages/points-mall/index')">积分商城</button>
			</view>
		</view>
		<view class="news_block flex-center">
			<image src="/static/img/user.jpg" mode="aspectFill"></image><text class="name">尬博</text>刚刚兑换了<text class="blue">小碎花马克杯</text>积分
		</view>
		<view class="block sign-in_block">
			<view class="flex-bt">
				<view class="left_block">已签到<text class="blue">{{days}}天</text></view>
				<view class="right_blcok">签到提醒
					<switch color="#1fa0b6" :checked="switch_tx==1?true:false" @change="switch1Change" />
				</view>
			</view>
			<view class="tomrow">明日签到可获得<text class="blue">{{addscore}}</text>积分</view>
			<view class="sign-in_list flex-bt">
				<view class="list_item">
					<image :src="list[0]==1?'/static/img/yes.png':'/static/img/no.png'" mode="widthFix"></image>
					<text>周一</text>
				</view>
				<view class="list_item">
					<image :src="list[1]==1?'/static/img/yes.png':'/static/img/no.png'" mode="widthFix"></image>
					<text>周二</text>
				</view>
				<view class="list_item">
					<image :src="list[2]==1?'/static/img/yes.png':'/static/img/no.png'" mode="widthFix"></image>
					<text>周三</text>
				</view>
				<view class="list_item">
					<image :src="list[3]==1?'/static/img/yes.png':'/static/img/no.png'" mode="widthFix"></image>
					<text>周四</text>
				</view>
				<view class="list_item">
					<image :src="list[4]==1?'/static/img/yes.png':'/static/img/no.png'" mode="widthFix"></image>
					<text>周五</text>
				</view>
				<view class="list_item">
					<image :src="list[5]==1?'/static/img/yes.png':'/static/img/no.png'" mode="widthFix"></image>
					<text>周六</text>
				</view>
				<view class="list_item">
					<image :src="list[6]==1?'/static/img/yes.png':'/static/img/no.png'" mode="widthFix"></image>
					<text>周日</text>
				</view>
			</view>
			<button v-if="today" class="sign_btn flex-center" type="default">今日已签到</button>
			<button v-else hover-class="none" type="default" class="sign_btn flex-center color" @click="qiandao()">立即签到</button>
		</view>
		<view class="block task_block">
			<view class="title">积分任务<text>做任务赚积分</text></view>
			<view class="task_item flex-bt">
				<view class="left_block flex-center">
					<image src="/static/img/today1.png" mode="widthFix"></image>
					<view class="text_block">
						<view class="name">签到</view>
						<view class="content">连续签到可获得积分</view>
					</view>
				</view>
				<button hover-class="none" type="default" class="flex-center">去完成</button>
			</view>
			<view class="task_item flex-bt">
				<view class="left_block flex-center">
					<image src="/static/img/today2.png" mode="widthFix"></image>
					<view class="text_block">
						<view class="name">推荐我们</view>
						<view class="content">推荐成功一位可获得500积分</view>
					</view>
				</view>
				<button hover-class="none" type="default" class="flex-center">去完成</button>
			</view>
			<view class="task_item flex-bt">
				<view class="left_block flex-center">
					<image src="/static/img/today3.png" mode="widthFix"></image>
					<view class="text_block">
						<view class="name">完善资料</view>
						<view class="content">完善资料可得积分</view>
					</view>
				</view>
				<button hover-class="none" type="default" class="flex-center">去完成</button>
			</view>
			<view class="task_item flex-bt">
				<view class="left_block flex-center">
					<image src="/static/img/today4.png" mode="widthFix"></image>
					<view class="text_block">
						<view class="name">每日抽奖</view>
						<view class="content">每日抽奖 好运连连</view>
					</view>
				</view>
				<button hover-class="none" type="default" class="flex-center">去完成</button>
			</view>
			<view class="task_item flex-bt">
				<view class="left_block flex-center">
					<image src="/static/img/today4.png" mode="widthFix"></image>
					<view class="text_block">
						<view class="name">积分商城</view>
						<view class="content">积分兑换 商品免费拿</view>
					</view>
				</view>
				<button hover-class="none" type="default" class="flex-center">去完成</button>
			</view>
		</view>
		<!-- 签到提醒弹框 -->
		<!-- <uni-popup ref="popup" type="center">
			<view class="popup_content">
				<image src="http://imgxcx.yifulai.com/tk2.png" mode="widthFix"></image>
				<view class="text_block flex-center">
					<image src="/static/img/today6.png" mode="widthFix"></image>
					<text class="title">今日签到</text>
					<text class="number">签到可得 {{addscore}} 积分</text>
					<button hover-class="none" type="default" class="flex-center" @click="close(),open2()">立即签到</button>
				</view>
				<image class="del-i" src="/static/img/del2.png" mode="widthFix" @click="close()"></image>
			</view>
		</uni-popup> -->
		<!-- 签到弹框 -->
		<uni-popup ref="popup2" type="center">
			<view class="popup_content">
				<image src="http://imgxcx.yifulai.com/tk2.png" mode="widthFix"></image>
				<view class="text_block flex-center">
					<image src="/static/img/today6.png" mode="widthFix"></image>
					<text class="title2">今日签到</text>
					<text class="number_title">恭喜获得</text>
					<view class="number">积分<text class="blue">+ {{addscore}}</text>, 积分可兑换礼品</view>
					<button hover-class="none" type="default" class="flex-center" @click="goto('/pages/points-mall/index')">去积分商城</button>
				</view>
				<image class="del-i" src="http://imgxcx.yifulai.com/del2.png" mode="widthFix" @click="close()"></image>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import myhead from "../../components/my-components/myhead.vue"
	import {
		getUserInfo,
		getQiandaoInfo,
		getQiandao,
		getQiandaoTx
	} from '@/api/user.js';
	export default {
		components: {
			myhead
		},
		data() {
			return {
				title: '',
				active: 2,
				userInfo:{},
				mer_name:'',
				mer_avatar:'',
				merchant_level_id:0,
				image:"http://imgxcx.yifulai.com/25daf202103051426232787.png",
				score:0,//	int	积分
				today:false,//	bool	今天是否已签到
				switch_tx:0,//	bool	签到提醒
				days:0,//	int	本周签到天数
				list:[],//	array	签到数组（0表示周一，1表示周二。。。）
				addscore:10
			}
		},
		onLoad() {
		},
		mounted() {
			
		},
		onShow(){
			this.getUserInfo();
			this.getQiandaos();
		},
		methods: {
			switch1Change: function(e) {
				let flag = e.target.value;
				getQiandaoTx({flag}).then(res=>{
					this.getQiandaos()
					return this.$util.Tips({
						title: res.message
					});
				}).catch(err=>{
					return this.$util.Tips({
						title: err
					});
				})
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			
			qiandao() {
				getQiandao().then(res =>{
					this.addscore = res.data
					this.today = true
					this.$refs.popup2.open()
					this.getQiandaos()
				}).catch(err => {
					return this.$util.Tips({
						title: err
					});
				})
				
			},

			// 签到弹框 关闭
			close() {
				this.$refs.popup2.close()
			},
			/**
			 * 获取商家信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.userInfo = res.data;
					that.mer_name = that.userInfo.merchant.mer_name
					that.mer_avatar = that.userInfo.merchant.mer_avatar
					that.merchant_level_id = that.userInfo.merchant.merchant_level_id
				});
			},
			/**
			 * 查询用户签到
			 */
			getQiandaos(){
				let that = this;
				getQiandaoInfo().then(res =>{
					that.list = res.data.list
					that.today = res.data.today
					that.score = Number(res.data.score)
					that.switch_tx = res.data.switch_tx
					that.days = res.data.days
				})
			}
		}
	}
</script>


<style lang="less" scoped>
	.points-mall_index {
		.top_body {
			position: relative;
			// height: 282rpx*2;
			// margin-top: -10rpx*2;

			.top_content {
				justify-content: flex-start;
				margin-top: -110rpx*2;
				margin-left: 28rpx;
				margin-bottom: 8rpx*2;

				.top_img {
					position: relative;
					width: 92rpx;
					height: 92rpx;
					border-radius: 50%;
				}

				.top_text {
					margin-left: 9rpx*2;
					z-index: 10;

					.name {
						font-size: 15rpx*2;
						font-weight: 500;
						color: #FFFFFF;
						margin-bottom: 6rpx*2;
					}

					.badge {
						width: 94rpx;
						height: 36rpx;
						background: rgba(255, 255, 255, 0.3);
						border-radius: 22rpx;
						font-size: 13rpx*2;
						font-family: AlibabaPuHuiTi;
						color: #333333;
						text-align: center;
					}
				}
			}

			.fixed_bolck {
				position: absolute;
				top: 138rpx;
				right: 0;
				width: 135rpx;
				height: 57rpx;
				background: linear-gradient(76deg, rgba(123, 220, 235, 0.22) 0%, rgba(255, 255, 255, 0.22) 100%);
				// opacity: 0.22/2;
				border-radius: 100rpx*2 0rpx*2 0rpx*2 100rpx*2;
				font-size: 12rpx*2;
				font-weight: bold;
				color: #FFFFFF;
				z-index: 10;
			}

			.tab_body {
				width: 731rpx;
				height: 244rpx;
				margin: auto;
				position: relative;
				padding: 0 57rpx;

				image {
					width: 100%;
					position: absolute;
					top: 0;
					left: 0;
				}

				.left_block {
					z-index: 10;

					.title {
						font-size: 12rpx*2;
						color: #999999;
					}

					.number {
						font-size: 52rpx;
						font-weight: bold;
						color: #1698AE;
					}
				}

				.right_btn {
					width: 80rpx*2;
					height: 30rpx*2;
					background: linear-gradient(-87deg, #1698AE, #5ED8ED);
					box-shadow: 0rpx*2 5rpx 5rpx*2.2 0rpx*2 rgba(35, 164, 185, 0.26);
					border-radius: 15rpx*2;
					font-size: 14rpx*2;
					font-weight: 500;
					color: #FFFFFF;
				}
			}

		}

		.news_block {
			font-size: 12rpx*2;
			font-weight: 500;
			color: #999999;
			padding: 0 15rpx*2;
			justify-content: flex-start;
			padding-bottom: 15rpx*2;

			image {
				width: 52rpx;
				height: 52rpx;
				margin-right: 15rpx;
				border-radius: 50%;
			}

			.name {
				color: #000000;
				margin-right: 15rpx;
			}

			.blue {
				color: #1698AE;
				margin: 0 15rpx;
			}
		}

		.block {
			background: #fff;
			padding: 20rpx*2 15rpx*2;
			margin: 15rpx*2;
			border-radius: 5rpx*2;
		}

		.sign-in_block {
			.left_block {
				font-size: 19rpx*2;
				font-weight: 500;
				color: #333333;

				.blue {
					margin-left: 15rpx;
				}
			}

			.right_blcok {
				font-size: 12rpx*2;
				color: #666666;

				switch {
					margin-left: 5rpx*2;
					transform: scale(0.6)
				}
			}

			.tomrow {
				font-size: 10rpx*2;
				color: #999999;

				.blue {
					margin: 0 5rpx*2;
				}
			}

			.sign-in_list {
				margin-top: 14rpx*2;

				.list_item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 50rpx*2;

					image {
						width: 56rpx;
						height: 56rpx;
					}

					text {
						margin-top: 5rpx*2;
						font-size: 12rpx*2;
						font-weight: 500;
						color: #999999;
					}
				}
			}

			.sign_btn {
				width: 465rpx;
				height: 75rpx;
				background: #E4E4E4;
				box-shadow: 0rpx*2 5rpx*2 10rpx*2 0rpx*2 rgba(104, 114, 255, 0.25);
				border-radius: 38rpx;
				font-size: 15rpx*2;
				font-weight: 500;
				color: #7F7F7F;
				margin: auto;
				margin-top: 56rpx;
			}
			.color {
				background: linear-gradient(90deg, #FFC92D, #FF8435);
				color: #FFFFFF;
			}
		}

		.task_block {
			.title {
				font-size: 18rpx*2;
				font-weight: bold;
				color: #333333;
				position: relative;
				padding-left: 8rpx*2;
				margin-bottom: 52rpx;

				&::after {
					content: ' ';
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					margin: auto;
					width: 3rpx*2;
					height: 34rpx;
					background: #1698AE;
				}

				text {
					margin-left: 10rpx*2;
					font-size: 12rpx*2;
					color: #999999;
					font-weight: 400;
				}
			}

			.task_item {
				margin: 12rpx*2 0 24rpx*2;

				.left_block {

					image {
						width: 30rpx*2;
						height: 30rpx*2;
					}

					.text_block {
						margin-left: 12rpx*2;

						.name {
							font-size: 14rpx*2;
							font-weight: 500;
							color: #333333;
							margin-bottom: 5rpx*2;
						}

						.content {
							font-size: 12rpx*2;
							color: #999999;
						}
					}
				}

				button {
					width: 40rpx*2;
					height: 20rpx*2;
					background: linear-gradient(-87deg, #1698AE, #5ED8ED);
					border-radius: 10rpx*2;
					font-size: 10rpx*2;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
		}

		.popup_content {
			width: 490rpx;
			height: 531rpx;
			padding: 0;
			border-radius: 0;
			background: none;

			position: relative;

			image {
				// position: absolute;
				// left: 0;
				// top: 0;
				width: 100%;
				height: 531rpx !important;
			}

			.text_block {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				flex-direction: column;
				justify-content: flex-start;
				padding-top: 47rpx;

				image {
					width: 86rpx;
					height: 76rpx !important;
				}

				.title {
					font-size: 18rpx*2;
					font-weight: 500;
					color: #FFFFFF;
					margin: 15rpx*2 0 111rpx;
				}

				.title2 {
					font-size: 18rpx*2;
					font-weight: 500;
					color: #FFFFFF;
					margin: 15rpx*2 0 78rpx;
				}

				.number_title {
					font-size: 16rpx*2;
					font-weight: bold;
					color: #333333;
					margin-bottom: 5rpx*2;
				}

				.number {
					font-size: 15rpx*2;
					font-family: PingFang SC;
					color: #000000;
					margin-bottom: 33rpx*2;
				}

				button {
					width: 223rpx;
					height: 30rpx*2;
					background: linear-gradient(-90deg, #1E9FB4, #5ED8ED);
					box-shadow: 0rpx*2 1.5rpx*2 4rpx*2 0rpx*2 rgba(49, 185, 203, 0.46);
					border-radius: 5rpx*2;
					font-size: 15rpx*2;
					font-weight: 500;
					color: #FFFFFF;
				}
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

	}
</style>
