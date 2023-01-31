<template>
	<!-- 分享推广-商品海报 -->
	<view class="page share_extend">
		<image class="img-bg" src="/static/img/hb-bg2.png" mode="widthFix"></image>
		<view class="content_body">
			<image class="img-bg2" src="/static/img/hb-bg.png" mode="widthFix"></image>
			<view class="content_top">
				<image class="user-img" src="/static/img/user.jpg" mode="widthFix"></image>
				<text class="user-name">深圳翌芙莱</text>
			</view>
			<view class="content_text">
				<view class="text_item">
					每一份美味都值得珍藏
				</view>
				<view class="text_item">
					每一份好物都值得分享
				</view>
			</view>
			<image class="banner-img" src="/static/img/index_banner.jpg" mode="aspectFill"></image>
			<view class="content_dom">
				<image class="user-img" src="/static/img/user.jpg" mode="widthFix"></image>
				<view class="name_blcok">
					<view class="user-name">深圳翌芙莱</view>
					<view class="user-else">邀您一起共享好店</view>
				</view>
			</view>
			<view class="ewm_bloxk flex-center">
				<image src="/static/img/ewm.png" mode="widthFix"></image>
				<view class="ewm_text">长安小程序码参与活动</view>
			</view>
			<view class="button_block flex-center">
				<button hover-class="none" type="default" class="flex-center">保存到相册</button>
				<button hover-class="none" type="default" class="flex-center">
					<image src="/static/img/wx2.png" mode="widthFix"></image>微信分享
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.share_extend {
		.img-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: -1;
		}

		.content_body {
			position: absolute;
			top: 125px;
			left: 0;
			right: 0;
			margin: auto;
			width: 715px/2;
			padding: 69px/2 20px;

			.img-bg2 {
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
			}

			.content_top {
				z-index: 10;
				display: flex;
				align-items: flex-start;

				.user-img {
					flex-basis: 92px/2;
					flex-shrink: 0;
					flex-grow: 0;
					height: 92px/2;
					z-index: 10;
				}

				.user-name {
					z-index: 10;
					font-size: 14px;
					font-weight: 500;
					color: #000000;
					margin-left: 10px;
				}
			}

			.content_text {
				margin-top: 43px/2;

				.text_item {
					font-size: 18px;
					font-weight: bold;
					font-style: italic;
					text-align: center;
					margin-bottom: 6px;

					&:last-child {
						text-align: right;
						padding-right: 13px;
					}
				}
			}


			.banner-img {
				margin: auto;
				// margin-top: 10px;
				width: 635px/2;
				height: 347px/2;
			}

			.content_dom {
				z-index: 10;
				display: flex;
				align-items: flex-start;
				margin-top: 95px/2;

				.user-img {
					flex-basis: 40px;
					flex-shrink: 0;
					flex-grow: 0;
					height: 40px;
					z-index: 10;
					border-radius: 50%;
				}

				.name_blcok {
					margin-left: 10px;

					.user-name {
						z-index: 10;
						font-size: 14px;
						font-weight: bold;
						color: #020202;
						margin-bottom: 5px;
					}

					.user-else {
						font-size: 12px;
						font-weight: 500;
						color: #999999;
					}
				}

			}

			.ewm_bloxk {
				flex-direction: column;
				margin-top: 30px;

				image {
					width: 189px/2;
					height: 189px/2;
				}

				.ewm_text {
					margin-top: 10px;
					font-size: 14px;
					font-weight: 500;
					color: #999999;
				}
			}

			.button_block {
				position: absolute;
				bottom: -70px;
				left: 0;
				width: 100%;
				justify-content: center;
				button{
					width: 255px/2;
					height: 95px/2;
					box-shadow: 0px 1.5px 5px 0px rgba(103, 211, 230, 0.46);
					border-radius: 24px;
					margin: 0;
					font-size: 15px;
					font-weight: 500;
					color: #333333;
					image{
						width: 22px;
						height: 13px;
						margin-right: 3px;
					}
					&:last-child{
						margin-left: 127px/2;
					}
				}
			}
		}

	}
</style>
