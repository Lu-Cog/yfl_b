<template>
	<!-- 钱包-进货订单 -->
	<view class="page admin_purchase-order tabs_body">
		<view class="tab_body flex-bt">
			<view class="tab_item flex-center" @click="changetabs(1)" :class="{active:active==1}">全部</view>
			<view class="tab_item flex-center" @click="changetabs(2)" :class="{active:active==2}">待支付</view>
			<view class="tab_item flex-center" @click="changetabs(3)" :class="{active:active==3}">待支付</view>
			<view class="tab_item flex-center" @click="changetabs(4)" :class="{active:active==4}">已完成</view>
		</view>
		<view class="content_body">
			<view class="content_list" v-if="active==1">
				<mynull :imgSrc="'/static/img/null2.png'" :text="'暂无订单，快去逛逛吧~'" v-if="list==''"></mynull>
			</view>
			<view class="content_list" v-if="active==2">
				<view class="order_block">
					<view class="order-header flex-bt">
						<text class="order">
							<image src="/static/img/hanbao.png" mode="widthFix"></image>订单号&nbsp;201908202858
						</text>
						<text class="state">2020-01-20</text>
					</view>
					<view class="order_mid">
						<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
						<view class="order_content">
							<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
							<view class="attribute">商品规格：3 件</view>
							<view class="all">小计&nbsp;1000元&nbsp;X&nbsp;3</view>
						</view>
					</view>
					<view class="order_mid">
						<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
						<view class="order_content">
							<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
							<view class="attribute">商品规格：3 件</view>
							<view class="all">小计&nbsp;1000元&nbsp;X&nbsp;3</view>
						</view>
					</view>
					<view class="order_mid">
						<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
						<view class="order_content">
							<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
							<view class="attribute">商品规格：3 件</view>
							<view class="all">小计&nbsp;1000元&nbsp;X&nbsp;3</view>
						</view>
					</view>


					<view class="hr"></view>
					<view class="flex-bt">
						<text class="git yes">已付款</text>
						<view class="order_dow">
							商品: <text>2</text>件 ; 共计：<text>12000</text> 元
						</view>
					</view>
					<view class="button_block flex-center">
						<button hover-class="none" class="flex-center" @click="goto('/pages/purchase/logistics')">查看物流</button>
						<button hover-class="none" class="flex-center" @click="goto('/pages/purchase/order-item')">查看详情</button>
					</view>
				</view>
				<view class="order_block">
					<view class="order-header flex-bt">
						<text class="order">
							<image src="/static/img/hanbao.png" mode="widthFix"></image>订单号&nbsp;201908202858
						</text>
						<text class="state">2020-01-20</text>
					</view>
					<view class="order_mid">
						<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
						<view class="order_content">
							<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
							<view class="attribute">商品规格：3 件</view>
							<view class="all">小计&nbsp;1000元&nbsp;X&nbsp;3</view>
						</view>
					</view>
					<view class="order_mid">
						<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
						<view class="order_content">
							<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
							<view class="attribute">商品规格：3 件</view>
							<view class="all">小计&nbsp;1000元&nbsp;X&nbsp;3</view>
						</view>
					</view>
					<view class="order_mid">
						<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
						<view class="order_content">
							<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
							<view class="attribute">商品规格：3 件</view>
							<view class="all">小计&nbsp;1000元&nbsp;X&nbsp;3</view>
						</view>
					</view>


					<view class="hr"></view>
					<view class="flex-bt">
						<text class="git">未付款</text>
						<view class="order_dow">
							商品: <text>2</text>件 ; 共计：<text>12000</text> 元
						</view>
					</view>
					<view class="button_block flex-center">
						<button hover-class="none" class="flex-center">查看物流</button>
						<button hover-class="none" class="flex-center" @click="goto('/pages/purchase/order-item')">查看详情</button>
					</view>
				</view>
			</view>
			<view class="content_list" v-if="active==3">
				<mynull :imgSrc="'/static/img/null2.png'" :text="'暂无订单，快去逛逛吧~'" v-if="list==''"></mynull>
			</view>
			<view class="content_list" v-if="active==4">
				<mynull :imgSrc="'/static/img/null2.png'" :text="'暂无订单，快去逛逛吧~'" v-if="list==''"></mynull>
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
				imgSrc: "",
				text: '',
				active: 2,
				list: []
			}
		},
		mounted() {

		},
		methods: {
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
	.admin_purchase-order {
		.tab_body{
			top:0
			}
		.content_body {
			padding: 15px;

			.order_block {
				.order-header {
					margin-bottom: 30px;

					.order {
						font-size: 28px/2;
						color: #7B7A7A;

						image {
							width: 34px/2;
							height: 21px/2;
							margin-right: 10px;
						}
					}

					.state {
						font-size: 24px/2;
						color: #7B7A7A;
					}
				}
			}

			.order_mid {
				margin-top: 0;
				margin-bottom: 10px;

				.order-img {
					width: 172px/2;
					height: 152px/2;
					border-radius: 10px/2;
				}

				.order_content {
					.name {
						font-size: 26px/2;
						line-height: 30px/2;
						height: 30px;
						font-weight: 500;
						color: #333333;
					}

					.attribute {
						font-size: 24px/2;
						color: #7B7A7A;
						margin-top: 23px/2;
					}

					.all {
						margin-top: 23px/2;
						font-size: 24px/2;
						color: #7B7A7A;
					}
				}
			}

			.git {
				font-size: 28px/2;
				font-weight: 500;
				color: #FF3131;

				&.yes {
					color: #1698AE;
				}
			}
		}
	}
</style>
