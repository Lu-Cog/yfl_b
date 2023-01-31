<template>
	<!-- 积分商城-每日抽奖 -->
	<view class="page points-mall_luck">
		<view class="top_body">
			<myhead :title="'每日抽奖'" :imgSrc="'http://imgxcx.yifulai.com/top.jpg'"></myhead>
		</view>
		<view class="badge flex-center">
			抽奖规则
		</view>
		<view class="mid_body">
			<LuckyGrid class='lucky flex-center' ref="luckyGrid" :rows="grid.rows" :cols="grid.cols" :defaultStyle="defaultStyle"
				:blocks="grid.blocks" :prizes="grid.prizes" :button="grid.button" @start="gridStart" @end="gridEnd" />
			<!-- <image class="bg-img" src="/static/img/bg-k.png" mode="widthFix"></image> -->
			<image class="bg-img" src="http://imgxcx.yifulai.com/zhong.png" mode="widthFix"></image>
			<view class="mid_title title_block flex-center">
				<image class="left-img" src="/static/img/yuan1.png" mode="widthFix"></image>
				<view class="title">
					您有<text class="yellow">{{isnum}}</text>次抽奖机会
				</view>
				<image class="right-img" src="/static/img/yuan2.png" mode="widthFix"></image>
			</view>
			<view class="more flex-center">剩余积分540</view>
		</view>
		<view class="order_block">
			<view class="title_block flex-center">
				<image class="left-img" src="/static/img/yuan1.png" mode="widthFix"></image>
				<view class="title">
					您有<text class="yellow">{{isnum}}</text>次抽奖机会
				</view>
				<image class="right-img" src="/static/img/yuan2.png" mode="widthFix"></image>
			</view>
			<view class="order_list-bg">
				<view class="order_list">
					<swiper :autoplay="true" :interval="3000" :duration="1000" :vertical="true" :display-multiple-items='8' :circular='true'>
						<swiper-item class="list_item flex-bt" v-for="(item,index) in orderList" :key="index">
							<view class="item_left flex-center">
								<image src="" mode="widthFix"></image>
								<text class="name">名字</text>
								刚刚兑换了<text class="blue">600</text>积分
							</view>
							<text class="item_right">{{item.time}}</text>
						</swiper-item>
					</swiper>
					
					<!-- <view class="list_more flex-center">
						<text>更多中奖记录</text>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myhead from "../../components/my-components/myhead2.vue"
	import LuckyGrid from '@/components/uni-luck-draw/lucky-grid'
	export default {
		components: {
			myhead,
			LuckyGrid
		},
		data() {
			return {
				defaultStyle:{
					fontSize : "30rpx",
				},
				isnum:5,
				title: '',
				imgSrc: '',
				orderList: [{
						time: "2分钟前"
					},
					{
						time: "2分钟前"
					},
					{
						time: "2分钟前"
					},
					{
						time: "2分钟前"
					},
					{
						time: "2分钟前"
					},
					{
						time: "2分钟前"
					},
					{
						time: "2分钟前"
					},
					{
						time: "2分钟前"
					},
					{
						time: "2分钟前"
					},
				],
				grid: {
					rows: 3,
					cols: 3,
					blocks: [{
						padding: '6px',
						// background: '#ff4a4c',
						borderRadius: 10
					}],
					prizes: [{
							x: 0,
							y: 0,
							fonts: [{
								text: '10积分',
								top: 60
							}],
							imgs:[{
								src:'../../static/img/q_4.png',
								top: 15
							}]
						},
						{
							x: 1,
							y: 0,
							fonts: [{
								text: '500积分',
								top: 60
							}],
							imgs:[{
								src:'../../static/img/q_5.png',
								top: 15
							}]
						},
						{
							x: 2,
							y: 0,
							fonts: [{
								text: '20积分',
								top: 60
							}],
							imgs:[{
								src:'../../static/img/q_6.png',
								top: 15
							}]
						},
						{
							x: 2,
							y: 1,
							fonts: [{
								text: '500积分',
								top: 60
							}],
							imgs:[{
								src:'../../static/img/q_7.png',
								top: 15
							}]
						},
						{
							x: 2,
							y: 2,
							fonts: [{
								text: '30积分',
								top: 60
							}],
							imgs:[{
								src:'../../static/img/q_8.png',
								top: 15
							}]
						},
						{
							x: 1,
							y: 2,
							fonts: [{
								text: '500积分',
								top: 60
							}],
							imgs:[{
								src:'../../static/img/q_9.png',
								top: 15
							}]
						},
						{
							x: 0,
							y: 2,
							fonts: [{
								text: '40积分',
								top: 60
							}],
							imgs:[{
								src:'../../static/img/q_10.png',
								top: 15
							}]
						},
						{
							x: 0,
							y: 1,
							fonts: [{
								text: '500积分',
								top: 60
							}],
							imgs:[{
								src:'../../static/img/q_11.png',
								top: 15
							}]
						}
					],
					button: {
						x: 1,
						y: 1,
						fonts: [{
							text: '开始',
							top: 30
						}],
					},
				}
			}
		},
		mounted() {},
		methods: {
			gridStart() {
				if(this.isnum<1){
					return uni.showToast({
						title:'抽奖机会不够',
						icon:'none'
					})
				}
				this.isnum--
				let arr = [0,0,0,0,2,2,2,4,4,6]
				let random = Math.floor(Math.random()*10)
				let arr_item = arr[random]
				console.log(random,arr_item);
				this.$refs.luckyGrid.play()
				setTimeout(() => {
					this.$refs.luckyGrid.stop(arr_item)
				}, 3000)
			},
			gridEnd(prize) {
				// console.log(prize);
				uni.showToast({
					title:'恭喜你抽中'+prize.fonts[0].text,
					icon:'none'
				})
				
			},
		}
	}
</script>

<style lang="less" scoped>
	swiper{
		height: 300px;
	}
	.lucky{
		position: absolute;
		top: 22.5%;
		left: 50%;
		transform: translate(-50%);
		font-size: 24rpx;
	}
	.points-mall_luck {
		.top_body {
			height: 447px/2;
		}

		.badge {
			font-size: 12px;
			font-weight: 500;
			color: #FFFFFF;
			width: 133px/2;
			height: 54px/2;
			background: rgba(255, 255, 255, 0.22);
			border-radius: 200px 0px 0px 200px;
			position: absolute;
			top: 187px/2;
			right: 0;
			z-index: 10;
		}

		.title_block {
			image {
				width: 97px/2;
				height: 11px;
			}

			.left-img {}

			.right-img {}

			.title {
				font-size: 18px;
				font-weight: bold;
				color: #FFFFFF;
				padding: 0 37px/2;
			}
		}

		.mid_body {
			position: relative;
			background: linear-gradient(3deg, #1698AE, #5ED8ED);

			.bg-img {
				// position: absolute;
				// top: 0;
				// left: 0;
				width: 100%;
				// z-index: -1;
			}

			.title_block {
				position: absolute;
				top: 20px;
				left: 0;
				right: 0;
				margin: auto;

			}

			.more {
				position: absolute;
				top: 50px;
				left: 0;
				right: 0;
				margin: auto;
				font-size: 12px;
				color: #FFFFFF;
				width: 190px/2;
				height: 20px;
				background: #1698AE;
				border-radius: 10px;
			}

		}

		.order_block {
			height: 500px;
			background: linear-gradient(-65deg, #1698AE, #5ED8ED);
			margin-bottom: 0;

			.title_block {
				padding: 25px 0;
			}

			.order_list-bg {
				width: 690px/2;
				width: auto;
				max-height: 340px;
				background: rgba(99, 47, 181, 0);
				box-shadow: -5px/2 -2px 15px 0px rgba(255, 221, 239, 0.38), 1.5px 1.5px 7.5px 0px rgba(78, 253, 228, 0.4);
				border-radius: 10px;
				padding: 14px 10px;

				.order_list {
					position: relative;
					background: #fff;
					border-radius: 5px;
					padding: 0 10px;

					.list_item {
						font-size: 12px;
						font-weight: 500;
						color: #666666;
						// padding: 10px 0;

						image {
							width: 54px/2;
							height: 54px/2;
							border-radius: 50%;
						}

						.name {
							font-size: 12px;
							font-weight: 500;
							color: #000000;
							margin: 0 5px;
						}

						.blue {
							margin: 0 5px;
						}

						.item_right {
							color: #B6B6B6;
						}
					}
				}

				.list_more {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-image: linear-gradient(rgba(255, 255, 255, 0), #ffffff);
					align-items: flex-end;
					border-radius: 10px;

					text {
						font-size: 12px;
						font-weight: 500;
						color: #999999;
						border-bottom: 1px solid #999999;
						display: inline-block;
						margin-bottom: 20px;

					}
				}
			}
		}

	}
</style>
