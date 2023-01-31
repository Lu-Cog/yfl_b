<template>
	<!-- 积分商城-账单明细 -->
	<view class="page points-mall_details">
		<view class="top_body">
			<image class="top-bg" src="http://imgxcx.yifulai.com/jifen.png" mode="widthFix"></image>
			<view class="top_text flex-center">
				<text class="name">总积分</text>
				<text class="number">600.00</text>
			</view>
		</view>
		<view class="tabs_body">
			<view class="tab_body flex-bt">
				<view class="tab_item flex-center" @click="changetabs(1)" :class="{active:active==1}">
					<image :src="active==1?'/static/img/zhi_s.png':'/static/img/zhi.png'" mode="widthFix"></image>收入
				</view>
				<view class="tab_item flex-center" @click="changetabs(2)" :class="{active:active==2}">
					<image :src="active==2?'/static/img/zhi_s.png':'/static/img/zhi.png'" mode="widthFix"></image>支出
				</view>
			</view>
			<view class="content_body">
				<view class="content_list" v-if="active==1">
					<mynull :imgSrc="'http://imgxcx.yifulai.com/null.png'" :text="'暂无消息'" v-if="moneyList==!''"></mynull>
					<view class="list_item flex-bt hr_shadow" v-for="(item,index) in moneyList" :key="index">
						<view class="item_left">
							<view class="title clamp">{{item.title}}</view>
							<view class="time">{{item.time}}</view>
						</view>
						<view class="item_right">{{item.money}}</view>
					</view>
				</view>
				<view class="content_list" v-if="active==2">
					<mynull :imgSrc="'http://imgxcx.yifulai.com/null.png'" :text="'暂无消息'" v-if="moneyList==!''"></mynull>
					<view class="list_item flex-bt hr_shadow" v-for="(item,index) in moneyList" :key="index">
							<view class="item_left">
								<view class="title clamp">{{item.title}}</view>
								<view class="time">{{item.time}}</view>
							</view>
							<view class="item_right">{{item.money}}</view>
						</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mynull from "../../components/my-components/mynull.vue"
	export default {
		components: {
			mynull
		},
		data() {
			return {
				active: 1,
				imgSrc: "",
				text: "",
				moneyList:[
					{id:1,title:'完成每日签到任务',time:'2019-2-20',money:'+50'},
					{id:2,title:'每日抽奖获得',time:'2019-2-20',money:'+50'},
					{id:3,title:'完成每日签到任务',time:'2019-2-20',money:'+50'},
					{id:4,title:'完成每日签到任务',time:'2019-2-20',money:'+50'},
					{id:5,title:'完成每日签到任务',time:'2019-2-20',money:'+50'},
				]
			}
		},
		mounted() {

		},

		methods: {
			changetabs(active) {
				this.active = active;
			}
		},
	}
</script>

<style lang="less" scoped>
	page {
		background: #fff;
	}

	.points-mall_details {
		.top_body {
			padding: 6px 8px;
			padding-bottom: 0;
			position: relative;
			background: #f7f7f7;

			.top-bg {
				width: 100%;
			}

			.top_text {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				flex-direction: column;

				.name {
					font-size: 15px;
					font-weight: bold;
					color: #FEFEFE;
				}

				.number {
					font-size: 36px;
					font-weight: bold;
					color: #FEFEFE;
					margin-top: 15px;
				}
			}
		}
	}

	.tabs_body {
		margin-top: -5px;

		.tab_body {
			box-shadow: 0px -16px 26px 1px rgba(22, 152, 174, 0.72);

			.tab_item {
				font-size: 15px;

				image {
					margin-right: 9px;
					width: 15px;
					height: 15px;
				}
			}
		}

		.content_body {
			.content_list {
				.list_item{
					padding: 20px 14px;
					.title{
						font-size: 14px;
						color: #151515;
						margin-bottom: 10px;
					}
					.time{
						font-size: 13px;
						color: #999999;
					}
					.item_right{
						font-size: 35px/2;
						font-weight: bold;
						color: #FF2A2A;
					}
				}
			}
		}

	}
</style>
