<template>
	<!-- 积分商城-兑换记录 -->
	<view class="page points-mall_record">
		<view class="order_block" v-for="(item,index) in contentList" :key="index">
			<view class="order-header flex-bt">
				<text class="order">订单号&nbsp;201908202858</text>
				<text class="state ccc" v-if="item.state===0">完成</text>
				<text class="state" v-else>{{item.state===1?'待发货':'卖家已发货'}}</text>
			</view>
			<view class="order_mid">
				<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
				<view class="order_content" @click="toItem(item.id)">
					<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
					<text class="number2">x3</text>
				</view>
			</view>
			<view v-if="item.state !=1">
				<view class="hr"></view>
				<view class="button_block flex-bt">
					<button class="flex-center" hover-class="none" >查看物流</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				contentList: [{
						id: 1,
						state: 1, // 0完成，1待发货，2已发货
					},
					{
						id: 2,
						state: 2,
					},
					{
						id: 3,
						state: 0,
					},
					{
						id:4,
						state: 1,
					},
					{
						id:5,
						state: 1,
					},
				]
			}
		},
		mounted() {

		},

		methods: {
			toItem(id){
				uni.navigateTo({
					url:'/pages/points-mall/item?id='+id
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.points-mall_record {
		padding-bottom: 138px/2;
		.order_block {
			margin: 0 15px;
			margin-top: 10px;

			.order-header {
				.ccc {
					color: #999999;
				}
			}

			.order_mid {
				margin-top: 24px;

				.order-img {
					flex-basis: 128px/2;
					height: 128px/2;
				}

				.order_content {
					margin-left: 10px;

					.name {
						font-size: 14px;
						line-height: 18px;
						height: 36px;
						font-weight: bold;
						margin-bottom: 10px
					}

					.number2 {
						font-size: 12px;
						font-weight: 500;
						color: #999999;
					}
				}

			}

			.hr {
				margin: 13px 0 5px;
			}
		}
	}
</style>
