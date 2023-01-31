<template>
	<!-- 进货-商品详情 -->
	<view class="page purchase-item">
		<view class="card_block">
			<view class="banner-img">
				<image :src="img" mode="aspectFill"></image>
			</view>
			<view class="card_content">
				<view class="title clamp2">{{name}}</view>
				<view class="flex-row flex-bt">
					<view class="price_block flex-center">
						<text class="price">¥{{price}}</text><text class="old-price">¥260.00</text>
					</view>
				</view>
				<view class="share_block flex-center">
					<image src="/static/img/share.png" mode="widthFix"></image>
					<text>分享</text>
				</view>
				<view class="hr"></view>
				<view class="dow-row flex-bt">
					<text>运费：免运费</text>
					<text>仅剩：45</text>
					<text>销量：2.5万</text>
				</view>
			</view>
		</view>

		<view class="notice_list">
			<uni-list class="">
				<uni-list-item link to="" rightText="领券">
					<template slot="header">
						<view class="header">
							优惠<text class="badge">店铺优惠券</text><text class="org">最高减免99元</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item link to="" rightText="默认规格">
					<template slot="header">
						<view class="header">
							规格：
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>

		<view class="rich_body">
			<view class="title flex-center">—商品详情—</view>
			<image src="/static/img/rich.png" mode="widthFix"></image>
		</view>
		<uni-goods-nav :fill="false" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
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
						text: '加入购物车',
						backgroundColor: '#61b9c8',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#1698AE',
						color: '#fff'
					}
				]
			}
		},
		mounted() {

		},
		methods: {
			onClick(e) {
				// 左侧点击事件
				console.log('加入购物车', e)
			},
			buttonClick(e) {
				// 右侧点击事件
				let i = Number(e.index);
				if (i === 0) {
					// 加入购物车
				} else if (i === 1) {
					// 立即购买
					uni.navigateTo({
						url: '/pages/purchase/confirm-order'
					})
				}else{
					alert('出错,i==',i)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.purchase-item {
		.banner-img {
			border-radius: 0;
			height: 444px/2;

			image {
				height: 444px/2;
				border-radius: 0;
			}
		}

		.card_block {
			.card_content {
				position: relative;
				padding: 0 33px/2;
				padding-top: 29px/2;

				.share_block {
					position: absolute;
					top: 144px/2;
					right: 23px/2;
					flex-direction: column;
					width: 40px;

					image {
						width: 34px/2;
						height: 36px/2;
					}

					text {
						font-size: 20px/2;
						font-weight: 500;
						color: #333333;
					}
				}

				.title {
					margin-bottom: 0;
				}

				.flex-row {
					padding: 52px/2 0 35px/2;

					.price_block {
						.old-price {
							text-decoration: line-through;
							color: #999999;
							margin-left: 10px;
						}
					}
				}

				.dow-row {
					padding-top: 26px/2;
					padding-bottom: 39px/2;

					text {
						font-size: 24px/2;
						font-weight: 500;
						color: #999999;
					}
				}
			}
		}

		.notice_list {
			.uni-list {
				margin-bottom: 10px;

				&:last-child {
					margin-bottom: 0;
				}

				.uni-list-item {
					.header {
						font-size: 24px/2;
						font-weight: 500;
						color: #999999;

						.badge {
							font-size: 20px/2;
							font-weight: 500;
							padding: 0 5px;
							color: #FF6D46;
							height: 26px/2;
							background: #FBE8E2;
							border-radius: 13px/2;
							margin-left: 36px/2;
						}

						.org {
							margin-left: 69px/2;
							font-size: 20px/2;
							font-weight: 500;
							color: #FF6D46;
						}
					}

				}

			}
		}

		.rich_body {
			padding-top: 0;
			padding-bottom: 100px;

			.title {
				height: 108px/2;
			}

			image {
				width: 100%;
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
