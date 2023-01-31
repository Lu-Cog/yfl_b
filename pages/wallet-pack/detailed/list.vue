<template>
	<!-- 钱包-进货订单-账户明细 -->
	<view class="page purchase_detailed">
		<view class="top_body">
			<image class="img-bg" src="/static/img/bg.jpg" mode="widthFix"></image>
			<view class="calendar_blcok flex-bt">
				<view class="left flex-center" @click="open">
					<image class="i-date" src="/static/img/date.png" mode="widthFix"></image>
					<text class="date">当前 {{date}}</text>
				</view>
				<uni-calendar ref="calendar" :insert="false" @confirm="confirm"></uni-calendar>
				<image class="i-left" src="/static/img/jiantou_left2.png" mode="widthFix"></image>
			</view>
			<view class="price_block">
				<view class="flex-col">
					<view class="title">总资产(元)</view>
					<view class="price">889,9.68</view>
				</view>
				<view class="flex-row3 flex-bt">
					<view class="col flex-center">
						<view class="title">本月收入(元)</view>
						<view class="price">889,9.68</view>
					</view>
					<view class="col flex-center">
						<view class="title">本月支出(元)</view>
						<view class="price">889,9.68</view>
					</view>
					<view class="col flex-center">
						<view class="title">本月收入(元)</view>
						<view class="price">889,9.68</view>
					</view>
				</view>
			</view>
		</view>
		<view class="money_list">
			<view class="list_item hr_shadow" v-for="(item,index) in listContent" :key="index">
				<view class="row_1 flex-bt">
					<text class="name clamp">{{item.name}}</text><text class="state" :class="item.state===1?'':'red'">{{item.price}}</text>
				</view>
				<view class="row_2 flex-bt">
					<text class="time">{{item.time}}</text><text class="balance">余额{{item.balance}}</text>
				</view>
				<view class="row_3 flex-bt" v-if="item.endtime !=''">失效时间&nbsp;{{item.endtime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				date: '',
				listContent: [{
						id: 1,
						name: '充值赠送',
						state: 1,
						price: +1000,
						time: '04-02 12:23',
						balance: '130,234,214.25',
						endtime:""
					},
					{
						id: 2,
						name: '推广奖励额度',
						state: 0,
						price: -1000,
						time: '04-02 12:23',
						balance: '130,234,214.25',
						endtime:""
					},
					{
						id: 3,
						name: '充值赠送',
						state: 0,
						price: -1000,
						time: '04-02 12:23',
						balance: '130,234,214.25',
						endtime:"05-02  24:00"
					},
					{
						id: 4,
						name: '推广奖励额度推广奖励额度',
						state: 1,
						price: +1000,
						time: '04-02 12:23',
						balance: '130,234,214.25',
						endtime:"05-02  24:00"
					},
					{
						id: 5,
						name: '充值赠送',
						state: 1,
						price: +1000,
						time: '04-02 12:23',
						balance: '130,234,214.25',
						endtime:"05-02  24:00"
					},
				]
			}
		},
		mounted() {
			this.today();
		},
		methods: {
			open() {
				this.$refs.calendar.open();
			},
			// 当前日期
			today() {
				let myDate = new Date;
				let year = myDate.getFullYear(); //获取当前年
				let mon = myDate.getMonth() + 1; //获取当前月
				let date = myDate.getDate(); //获取当前日
				this.date = year + '-' + mon + '-' + date
			},
			// 日期选择
			confirm(e) {
				this.date = e.fulldate
			}
		}
	}
</script>

<style lang="less" scoped>
	.purchase_detailed {
		.top_body {
			position: relative;
			padding: 34px/2;

			.img-bg {
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				height: 214px !important;
			}

			.calendar_blcok {
				z-index: 10;
				margin-bottom: 22px;

				.left {
					z-index: 10;
					flex: 1;
					justify-content: flex-start;

					.i-date {
						width: 33px/2;
						height: 16px;
					}

					.date {
						font-size: 24px/2;
						color: #FFFFFF;
						margin-left: 7px;
					}
				}

				.i-left {
					width: 17px/2;
					height: 27px/2;
				}
			}

			.price_block {

				.flex-row3 {
					.col {
						width: 30%;
						flex-direction: column;

						.title {
							font-size: 24px/2;
							color: #FFFFFF;
							opacity: 0.64;
							z-index: 10;
							margin-bottom: 8px;
						}

						.price {
							font-size: 32px/2;
							font-weight: bold;
							color: #FFFFFF;
							z-index: 10;
						}
					}
				}

				.flex-col {
					z-index: 10;
					display: flex;
					flex-direction: column;
					padding-left: 15px;
					margin-bottom: 35px/2;

					.title {
						font-size: 24px/2;
						color: #FFFFFF;
						z-index: 10;
						margin-bottom: 13px;
					}

					.price {
						font-size: 72px/2;
						font-weight: bold;
						color: #FFFFFF;
						z-index: 10;
					}

				}

			}
		}

		.money_list {
			margin-top: 10px;
			background: #fff;
margin-bottom: 147px/2;
			.list_item {
				padding: 21px 25px/2;
				.row_1 {
					margin-bottom: 25px/2;

					.name {
						font-size: 32px/2;
						font-weight: 500;
						color: #333333;
					}

					.state {
						font-size: 32px/2;
						font-weight: bold;
						color: #333333;

						&.red {
							color: #FF2A2A;
						}
					}
				}

				.row_2 {
					text {
						font-size:12px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
					}
				}
				.row_3{
					margin-top: 25px/2;
						font-size:12px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
				}
			}
		}
	}
</style>
