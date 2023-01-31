<template>
	<!-- 积分商城-首页 -->
	<view class="page points-mall_index">
		<view class="top_body">
			<myhead :title="'积分商城'"></myhead>
			<view class="top_content flex-center">
				<view class="title">0</view>
				<view class="subtitle">我的积分</view>
			</view>
			<view class="fixed_bolck flex-center" @click="goto('/pages/points-mall/rule')">积分规则</view>
			<view class="tab_body flex-bt" style="top: 0;">
				<navigator hover-class="none" class="tab_item flex-center" url="/pages/points-mall/record">
					<image src="http://imgxcx.yifulai.com/pot1.png" mode="aspectFill"></image>兑换记录  
				</navigator>
				<navigator hover-class="none" class="tab_item flex-center" url="/pages/points-mall/details">
					<image src="http://imgxcx.yifulai.com/pot2.png" mode="aspectFill"></image>积分明细
				</navigator>
				<navigator hover-class="none" class="tab_item flex-center" url="/pages/points-mall/qiandao">
					<image src="http://imgxcx.yifulai.com/pot3.png" mode="aspectFill"></image>每日签到 
				</navigator>
				<navigator hover-class="none" class="tab_item flex-center" url="/pages/points-mall/luck">
					<image src="http://imgxcx.yifulai.com/pot4.png" mode="aspectFill"></image>去抽奖
				</navigator>
			</view>
		</view>
		<view class="news_block flex-center">
			<image src="/static/img/user.jpg" mode="aspectFill"></image><text class="name">尬博</text>刚刚兑换了<text class="blue">小碎花马克杯</text>积分
		</view>
		<view class="change_list">
			<view class="list_title flex-bt">
				<view class="left flex-center">
					积分兑换<text class="ccc">小积分换大奖</text>
				</view>
				<view class="right flex-center">
					更多<image src="http://imgxcx.yifulai.com/right_jiantou.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="list_item flex-bt">
				<image class="item_img" src="/static/img/user.jpg" mode="aspectFill"></image>
				<view class="item_right">
					<view class="name clamp2">yifulai正品翌芙莱一品莲翌芙 莱祛斑液正品 15ml小瓶</view>
					<view class="number">234人已领</view>
					<view class="jifen">675<text>积分</text></view>
				</view>
				<button hover-class="none"  type="default" class="btn flex-center" @click="goto('/pages/points-mall/item')">立即兑换</button>
			</view>
			<view class="list_item flex-bt">
				<image class="item_img" src="/static/img/user.jpg" mode="aspectFill"></image>
				<view class="item_right">
					<view class="name clamp2">yifulai正品翌芙莱一品莲翌芙 莱祛斑液正品 15ml小瓶</view>
					<view class="number">234人已领</view>
					<view class="jifen">675<text>积分</text></view>
				</view>
				<button hover-class="none"  type="default" class="btn flex-center" @click="goto('/pages/points-mall/item')">立即兑换</button>
			</view>
			<view class="list_item flex-bt">
				<image class="item_img" src="/static/img/user.jpg" mode="aspectFill"></image>
				<view class="item_right">
					<view class="name clamp2">yifulai正品翌芙莱一品莲翌芙 莱祛斑液正品 15ml小瓶</view>
					<view class="number">234人已领</view>
					<view class="jifen">675<text>积分</text></view>
				</view>
				<button hover-class="none"  type="default" class="btn flex-center" @click="goto('/pages/points-mall/item')">立即兑换</button>
			</view>
		</view>
		<view class="more">上拉加载更多</view>
	</view>
</template>

<script>
	import myhead from "../../components/my-components/myhead.vue"
	// import mynull from "../../../components/my-components/mynull.vue"
	export default {
		components: {
			myhead
		},
		data() {
			return {
				title: '',
				active: 2,
				cardList: [{
					id: 1,
					img: "http://imgxcx.yifulai.com/index_banner.jpg",
					state: 0,
					name: "补水护理(一般就是只清洁、补水、上面膜、头、 肩、颈按摩)",
					number: 100,
					rate: "40%",
					price: "160.00",
					dow: "28"
				}, {
					id: 2,
					img: "http://imgxcx.yifulai.com/index_banner.jpg",
					state: 1,
					name: "补水护理222",
					number: 100,
					rate: "50%",
					price: "160.00",
					dow: "28"
				}]
			}
		},
		mounted() {},
		methods: {
			changetabs(active) {
				this.active = active;
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},

			// 跳转拼团详情页
			toItem(id) {
				uni.navigateTo({
					url: '/pages/users/help/order-item?id=' + id
				});
			}
		}
	}
</script>


<style lang="less" scoped>
	.points-mall_index {
		.top_body {
			position: relative;
			height: 282px;

			.top_content {
				flex-direction: column;

				.title {
					margin-top: -190px;
					font-size: 60px/2;
					font-weight: bold;
					color: #FFFFFF;
					z-index: 10;
				}

				.subtitle {
					margin-top: 12px/2;
					font-size: 24px/2;
					color: #FFFFFF;
					z-index: 10;

				}

				.users_list {
					z-index: 10;

					image {
						width: 54px/2;
						height: 54px/2;
						margin: 0 15px/2;
						border-radius: 50%;
					}
				}

				.number {
					z-index: 10;
					margin-top: 13px;
					font-size: 24px/2;
					color: #FFFFFF;
				}
			}

			.fixed_bolck {
				position: absolute;
				top: 192px/2;
				right: 0;
				width: 135px/2;
				height: 57px/2;
				background: linear-gradient(76deg, rgba(123, 220, 235, 0.22) 0%, rgba(255, 255, 255, 0.22) 100%);
				// opacity: 0.22/2;
				border-radius: 29px/2;
				font-size: 12px;
				font-weight: bold;
				color: #FFFFFF;
				z-index: 10;
			}

			.tab_body {
				background: #FFFFFF;
				box-shadow: 0px 3px/2 21px/2 0px rgba(32, 160, 182, 0.26);
				border-radius: 10px/2;
				width: 690px/2;
				// height: 210px/2;
				padding-top: 31px/2;
				padding-bottom: 25px;
				position: absolute;
				left: 0;
				right: 0;
				margin: 0 auto;
				margin-top: 156px;

				.tab_item {
					width: 25%;
					flex-direction: column;
					font-size: 24px/2;
					font-weight: 500;
					color: #333333;

					image {
						width: 86px/2;
						height: 86px/2;
						margin-bottom: 20px/2;
					}

					&.active {
						color: #1698AE;
					}
				}
			}

		}

		.news_block {
			font-size: 12px;
			font-weight: 500;
			color: #999999;
			padding: 0 15px;
			justify-content: flex-start;
			padding-bottom: 15px;

			image {
				width: 52px/2;
				height: 52px/2;
				margin-right: 15px/2;
				border-radius: 50%;
			}

			.name {
				color: #000000;
				margin-right: 15px/2;
			}

			.blue {
				color: #1698AE;
				margin: 0 15px/2;
			}
		}

		.change_list {
			background: #ffffff;
			margin: 0 15px;
			padding: 0 25px/2;

			.list_title {
				padding: 44px/2 0 39px/2;

				.left {
					font-size: 36px/2;
					line-height: 18px;
					font-weight: bold;
					color: #333333;
					padding-left: 10px;
					position: relative;

					&::after {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						content: ' ';
						width: 6px/2;
						height: 34px/2;
						margin: auto;
						background: #1698AE;
					}

					text {
						font-size: 12px;
						color: #999999;
						margin-left: 10px;
					}
				}

				.right {
					font-size: 12px;
					font-weight: 500;
					color: #666666;

					image {
						width: 15px/2;
						height: 25px/2;
						margin-left: 4px;
					}
				}
			}

			.list_item {
				position: relative;
				padding: 20px 0;

				.item_img {
					flex-basis: 201px/2;
					flex-grow: 0;
					flex-shrink: 0;
					height: 201px/2;
					border-radius: 4px;
				}

				.item_right {
					margin-left: 22px;

					.name {
						height: 70px/2;
						font-size: 28px/2;
						font-weight: bold;
						color: #333333;
						line-height: 35px/2;
					}

					.number {
						font-size: 20px/2;
						font-weight: bold;
						color: #CCCCCC;
						margin: 53px/2 0 27px/2;
					}

					.jifen {
						font-size: 36px/2;
						font-weight: bold;
						color: #FF0225;

						text {
							font-size: 12px;
						}
					}
				}

				.btn {
					position: absolute;
					right: 0;
					bottom: 25px;
					width: 152px/2;
					height: 56px/2;
					background: #e7f4f7;
					border-radius: 28px/2;
					font-size: 14px;
					font-weight: bold;
					color: #1698AE;
				}
			}


		}

		.more {
			font-size: 12px;
			font-weight: bold;
			color: #C0C0C0;
			padding: 20px 0;
			text-align: center;
		}
	}
</style>
