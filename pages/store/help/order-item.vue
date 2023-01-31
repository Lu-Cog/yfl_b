<template>
	<!-- 助力活动-拼团详情 -->
	<view class="page help_order-item">
		<myhead :title="'拼团详情'"></myhead>
		<view class="time-end flex-center">
			距离结束还剩 <text class="flex-center">00</text>:<text class="flex-center">00</text>:<text class="flex-center">00</text>
		</view>
		<view class="item_body">
			<view class="card_block">
				<view class="banner-img">
					<image :src="img" mode="aspectFill"></image>
				</view>
				<view class="card_content">
					<view class="title clamp2">{{name}}</view>
					<view class="progress_body">
						<view class="now" :style="{width:rate}">目前进度</view>
						<text class="number">已拼{{number}}件</text>
						<text class="rate">{{rate}}</text>
					</view>
					<view class="flex-row flex-bt">
						<view class="price_block flex-center">
							<text class="price">¥{{price}}</text>
							<text class="badge flex-center">已降{{dow}}元</text>
						</view>
					</view>
					<view class="share-block flex-center">
						<image src="/static/img/share.png" mode="widthFix"></image><text>分享</text>
					</view>
				</view>
			</view>
			<view class="shadow_block">
				<view class="block_title">5人正在拼单，快来一起吧～</view>
				<!-- <view class="hr" style="width: 100%;"></view> -->
				<view class="block_list">
					<view class="list_item flex-bt">
						<image src="/static/img/user.jpg" mode="aspectFill"></image>
						<text class="time">剩余&nbsp;23:51:02</text>
						<view class="number">还差<text>1</text>人</view>
						<button hover-class="none" type="default" class="main_btn flex-center" @click="goto()">去拼团</button>
					</view>
					<view class="list_item flex-bt">
						<image src="/static/img/user.jpg" mode="aspectFill"></image>
						<text class="time">剩余&nbsp;23:51:02</text>
						<view class="number">还差<text>1</text>人</view>
						<button hover-class="none" type="default" class="main_btn flex-center" @click="goto()">去拼团</button>
					</view>
					<view class="list_item flex-bt">
						<image src="/static/img/user.jpg" mode="aspectFill"></image>
						<text class="time">剩余&nbsp;23:51:02</text>
						<view class="number">还差<text>1</text>人</view>
						<button hover-class="none" type="default" class="main_btn flex-center" @click="goto()">去拼团</button>
					</view>
				</view>
			</view>
			<view class="shadow_block">
				<text class="users_title flex-center">超过53人参与了该团购</text>
				<view class="users_list">
					<image class="users_img" src="/static/img/user.jpg" mode="aspectFill"></image>
					<image class="users_img" src="/static/img/user.jpg" mode="aspectFill"></image>
					<image class="users_img" src="/static/img/user.jpg" mode="aspectFill"></image>
					<image class="users_img" src="/static/img/user.jpg" mode="aspectFill"></image>
					<image class="users_img" src="/static/img/user.jpg" mode="aspectFill"></image>
					<image class="users_img" src="/static/img/user.jpg" mode="aspectFill"></image>
					<image class="users_img" src="/static/img/user.jpg" mode="aspectFill"></image>
					<image class="users_img" src="/static/img/user.jpg" mode="aspectFill"></image>
					<image class="users_img" src="/static/img/user.jpg" mode="aspectFill"></image>
				</view>
			</view>
			<view class="rich_body">
				<image src="/static/img/rich.png" mode="widthFix"></image>
			</view>
			<view class="bottom-bg"></view>
		</view>
		<uni-goods-nav :fill="false" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
	</view>
</template>

<script>
	import myhead from "../../../components/my-components/myhead.vue"
	export default {
		components: {
			myhead
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
		},
		data() {
			return {
				title: '',
				active: 2,
				id: 1,
				img: "http://imgxcx.yifulai.com/index_banner.jpg",
				state: 0,
				name: "补水护理(一般就是只清洁、补水、上面膜、头、 肩、颈按摩)",
				number: 100,
				rate: "40%",
				price: "160.00",
				dow: "28",
				// 底部导航
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'headphones',
					text: '客服'
				}],
				buttonGroup: [{
						text: '单独购买',
						backgroundColor: '#61b9c8',
						color: '#fff'
					},
					{
						text: '发起拼团',
						backgroundColor: '#1698AE',
						color: '#fff'
					}
				]
			}
		},
		mounted() {},
		methods: {
			onClick(e) {
				// 单独购买
				console.log(e)
			},
			buttonClick(e) {
				// 发起拼团
				console.log(e)
				uni.navigateTo({
					url: '/pages/users/help/order'
				})
			},
			changetabs(active) {
				this.active = active;
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.bottom-bg {
		background: #f7f7f7;
		width: 100%;
		height: 44px+122px/2;
	}

	.help_order-item {
		position: relative;

		.time-end {
			position: absolute;
			top: 184px/2;
			left: 0;
			right: 0;
			margin: auto;
			z-index: 999;
			margin: 0 23px/2;
			font-size: 28px/2;
			font-weight: 500;
			color: #FFFFFF;

			text {
				width: 80px/2;
				height: 45px/2;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 10px/2;
				margin: 0 13px/2;
				color: #000;
				font-size: 32px/2;
			}
		}

		.item_body {
			box-shadow: 0px 5px/2 6p/2x 0px rgba(193, 227, 255, 0.24);
			border-radius: 8px/2;
			position: absolute;
			top: 250px/2;
			z-index: 999;
			margin: 0 23px/2;
			background: #fff;

			.card_block {
				.card_content {
					position: relative;

					.share-block {
						position: absolute;
						bottom: 30px;
						right: 57px/2;
						flex-direction: column;
						font-size: 20px/2;
						font-weight: 500;
						color: #333333;

						image {
							margin-top: 5px;
							width: 34px/2;
							height: 36px/2;
						}
					}
				}
			}

			.shadow_block {
				margin: 0 10px;
				padding: 15px 11px;
				margin-bottom: 21px;

				.block_title {
					font-size: 24px/2;
					color: #333333;
					padding-bottom: 10px;
				}

				.block_list {
					.list_item {
						position: relative;
						padding: 10px 0;

						&::after {
							position: absolute;
							content: ' ';
							left: 0;
							right: 0;
							top: 0;
							margin: auto;
							height: 1px;
							width: 100%;
							box-shadow: inset 1px -1px 1px -1px #E4E4E4;
						}

						image {
							width: 54px/2;
							height: 54px/2;
							border-radius: 50%;
						}

						.time {
							margin-left: 13px/2;
							margin-right: 45px/2;
							font-size: 28px/2;
							font-weight: 500;
							color: #333333;
						}

						.number {
							font-size: 24px/2;
							font-weight: 500;
							color: #666666;

							text {
								color: #FF002B;
								margin: 0 5px;
							}
						}

						button {
							margin-left: 51px/2;
						}
					}
				}

				.users_title {
					font-size: 12px;
					color: #333333;
					padding-bottom: 10px;

				}

				.users_img {
					margin: 27px/4 3.7px;
					width: 54px/2;
					height: 54px/2;
					border-radius: 50%;
				}
			}
		}

		.uni-goods-nav {
			position: fixed;
			bottom: 0;
			z-index: 999;
			width: 100%;
		}
	}
</style>
