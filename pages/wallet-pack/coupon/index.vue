<template>
	<!-- 钱包-优惠券 -->
	<view class="page wallet_coupon tabs_body">
		<view class="tab_body flex-bt">
			<view class="tab_item flex-center" @click="changetabs(1)" :class="{active:active==1}">待使用</view>
			<view class="tab_item flex-center" @click="changetabs(2)" :class="{active:active==2}">已使用</view>
			<view class="tab_item flex-center" @click="changetabs(3)" :class="{active:active==3}">已过期</view>
		</view>
		<view class="content_body">
			<view class="content_list" v-if="active==1">
				<mynull :imgSrc="'/static/img/null3.png'" :text="'您暂时没有可用优惠券哟~'" v-if="list1==''"></mynull>
				<view class="list_item flex-bt" v-for="(item,index) in list1" :key="index">
					<image class="img-bg" :src="item.price ===100?'/static/img/coupon100.png':'/static/img/coupon300.png'" mode="widthFix"></image>
					<view class="item_left flex-center">
						<view class="price">
							<text>￥</text>{{item.price}}
						</view>
						<text class="tirm">满99可用</text>
					</view>
					<view class="item_mid  flex-center">
						<view class="name clamp">
							欢庆五一节日促销神券欢庆五一节日促销神券欢庆五一节日促销神券欢庆五一节日促销神券
						</view>
						<view class="time">
							2020.10.21-2025.10.03
						</view>
						<view class="hr" style="width: 100%;"></view>
						<view class="tirm">购买指定商品可用</view>
					</view>
					<button hover-class="none" type="default" class="item_btn flex-center">立即使用</button>
				</view>
			</view>
			<view class="content_list content_list2" v-if="active==2">
				<mynull :imgSrc="'/static/img/null3.png'" :text="'您暂时没有可用优惠券哟~'" v-if="list2==''"></mynull>
				<view class="list_item flex-bt" v-for="(item,index) in list2" :key="index">
					<image class="img-bg" src="/static/img/coupon0.png" mode="widthFix"></image>
					<image class="img-state" src="/static/img/use.png" mode="widthFix"></image>
					<view class="item_left flex-center">
						<view class="price">
							<text>￥</text>{{item.price}}
						</view>
						<text class="tirm">满99可用</text>
					</view>
					<view class="item_mid">
						<view class="name clamp">
							欢庆五一节日促销神券欢庆五一节日促销神券欢庆五一节日促销神券欢庆五一节日促销神券
						</view>
						<view class="time">
							2020.10.21-2025.10.03
						</view>
						<view class="hr" style="width: 100%;"></view>
						<view class="tirm">购买指定商品可用</view>
					</view>
					<button hover-class="none" type="default" class="item_btn flex-center">立即使用</button>
				</view>
			</view>
			<view class="content_list content_list2" v-if="active==3">	<mynull :imgSrc="'/static/img/null3.png'" :text="'您暂时没有可用优惠券哟~'" v-if="list2==''"></mynull>
				<view class="list_item flex-bt" v-for="(item,index) in list2" :key="index">
					<image class="img-bg" src="/static/img/coupon0.png" mode="widthFix"></image>
					<image class="img-state" src="/static/img/use2.png" mode="widthFix"></image>
					<view class="item_left flex-center">
						<view class="price">
							<text>￥</text>{{item.price}}
						</view>
						<text class="tirm">满99可用</text>
					</view>
					<view class="item_mid">
						<view class="name clamp">
							欢庆五一节日促销神券欢庆五一节日促销神券欢庆五一节日促销神券欢庆五一节日促销神券
						</view>
						<view class="time">
							2020.10.21-2025.10.03
						</view>
						<view class="hr" style="width: 100%;"></view>
						<view class="tirm">购买指定商品可用</view>
					</view>
					<button hover-class="none" type="default" class="item_btn flex-center">立即使用</button>
				</view>
		</view>
		</view>
	</view>
</template>

<script>
	import mynull from "../../../components/my-components/mynull.vue"
	export default {
		components: {
			mynull
		},
		data() {
			return {
				imgSrc: "",
				text: '',
				active: 1,
				list1: [{
						id: 1,
						price: 100
					},
					{
						id: 2,
						price: 100
					},
					{
						id: 3,
						price: 200
					},
					{
						id: 4,
						price: 300
					},
				],
				list2: [{
						id: 1,
						price: 100
					},
					{
						id: 2,
						price: 100
					}
				],
			}
		},
		mounted() {

		},
		methods: {
			changetabs(active) {
				this.active = active;
			},
		}
	}
</script>

<style lang="less" scoped>
	.wallet_coupon {
		.tab_body{
			top: 0;
		}
		.content_body {
			padding: 21px/2 15px;

			.content_list {
				.list_item {
					position: relative;
					margin-bottom: 10px;

					.img-bg {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						z-index: 1;
					}

					.item_left,
					.item_mid,
					.item_btn {
						z-index: 10;
					}

					.item_left {
						flex-direction: column;
						flex-basis: 110px;
						flex-grow: 0;
						flex-shrink: 0;
height: 104px;
						.price {
							font-size: 68px/2;
							font-weight: 500;
							color: #FFFFFF;

							text {
								font-size: 30px/2;
							}
						}

						.tirm {
							font-size: 28px/2;
							font-weight: 500;
							color: #FFFFFF;
						}
					}

					.item_mid {
						padding-left: 10px;
						padding-right: 10px;
						// flex-basis: 470px/2;
						// flex-grow: 0;
						// flex-shrink: 0;
flex: 1;
flex-direction: column;
align-items: flex-start;
						.name {
							font-size: 30px/2;
							font-weight: bold;
							color: #000000;
						}

						.time {
							margin-top: 27px/2;
							font-size: 24px/2;
							color: #999999;
						}

						.hr {
							margin: 6px 0;
						}

						.tirm {
							font-size: 24px/2;
							color: #999999;
						}
					}

					.item_btn {
						background: none;
						font-size: 28px/2;
						font-weight: bold;
						color: #FFFFFF;
						flex-basis: 65px/2;
						padding: 0 10px;
						flex-grow: 0;
						flex-shrink: 0;
						height: 104px;
						// padding-top: 10px;
					}
				}
			}

			.content_list2 {
				.list_item{
					position: relative;
					.img-state{
						position: absolute;
						top: 0;
						bottom: 0;
						right: 116px/2;
						margin: auto;
						width: 151px/2;
						height: 151px/2;
						z-index: 10;
					}
				}
				.item_mid {
					.name {
						opacity: 0.32;
					}

					.time {
						opacity: 0.6;
					}

					.tirm {
						opacity: 0.6;
					}

					.img-state {}
				}
			}
		}
	}
</style>
