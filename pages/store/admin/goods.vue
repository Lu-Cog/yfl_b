<template>
	<!-- 管理功能-商品管理 -->
	<view class="page admin_godds tabs_body">
		<view class="tab_body flex-bt" style="top: 0;">
			<view class="tab_item flex-center" @click="changetabs(0)" :class="{active:active==0}">销售中</view>
			<view class="tab_item flex-center" @click="changetabs(1)" :class="{active:active==1}">促销商品</view>
			<view class="tab_item flex-center" @click="changetabs(2)" :class="{active:active==2}">已下架</view>
		</view>
		<view class="content_body">
			<view class="content_list">
				<view v-if="list.length!=0">
					<view class="order_block" v-for="(item,index) in list" :key="index">
						<!-- <view class="order-header flex-bt">
							<text class="order">商品型号：&nbsp;{{item.product_id}}</text>
						</view> -->
						<view class="order_mid">
							<image class="order-img" :src="item.image" mode="aspectFill"></image>
							<view class="order_content">
								<view class="name clamp2">{{item.store_name}}</view>
								<view class="price_block">售价：<text class="price">¥{{item.price}}</text></view>
								<view class="stu">库存：x&nbsp;{{item.stock}}</view>
							</view>
							<view class="button_block flex-bt">
								<button hover-class="none" class="flex-center"
									@click="changeShow(item.product_id,item.is_show,item.unique)">{{item.is_show==1?'下架':'上架'}}</button>
								<button v-if="active!=2" hover-class="none" class="flex-center yes"
									@click="goto(item)">编辑</button>
							</view>
						</view>
					</view>
				</view>
				<view v-else style="text-align: center; margin-top: 100rpx; color: rgb(153, 153, 153);">
					<text>暂无产品</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getGoodsInfo,
		getEditProduct
	} from '@/api/store.js';
	export default {
		components: {},
		data() {
			return {
				active: 0,
				mer_id: 0,
				count: 0,
				page: 1,
				list: [],
			}
		},
		onLoad(options) {
			let {
				mer_id
			} = options
			this.mer_id = mer_id
		},
		onShow() {
			this.getGoodsInfo(this.mer_id)
		},
		mounted() {

		},
		onReachBottom() {
			this.getGoodsInfo(this.mer_id,true)
		},
		methods: {
			changetabs(active) {
				this.active = active;
				this.getGoodsInfo(this.mer_id)
			},
			goto(data) {
				uni.navigateTo({
					url: '/pages/store/goods-edit/goods-edit?mer_id=' + this.mer_id + '&product=' + JSON.stringify(
						data)
				})
			},

			// 跳转拼团详情页
			toItem(id) {
				uni.navigateTo({
					url: '/pages/users/help/order-item?id=' + id
				});
			},
			getGoodsInfo(id,isClear) {
				if (!isClear) {
					this.list = []
					this.page = 1
				}
				let that = this
				let data = {
					'type': that.active,
					'page': that.page,
					'limit': 20
				}
				getGoodsInfo(id, data).then(res => {
					let list1 = []
					if (res.data.list.length > 0) {
						list1 = that.list.concat(res.data.list)
						that.$set(that, 'list', list1);
						that.page++
					} else {
						uni.showToast({
							title: '没有内容了',
							icon: 'none',
							duration: 1000
						});
					}
					that.count = res.data.count
				})
			},
			changeShow(id, show, unique) {
				let that = this
				if (show == 1) {
					show = 0
				} else {
					show = 1
				}
				let data = {
					is_show: show,
					unique: unique
				}
				getEditProduct(this.mer_id, id, data).then(res => {
					that.$util.Tips({
						title: res.message
					});
					that.getGoodsInfo(that.mer_id)
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.admin_godds {
		.content_body {
			margin-top: 11rpx*2;

			.order_block {
				padding-bottom: 0;
				margin-bottom: 0;
				position: relative;
				border-bottom: 2rpx solid #E4E4E4;

				&::after {
					position: absolute;
					bottom: 0;
					left: 0;
					content: ' ';
					width: 100%;
					height: 1rpx*2;
					box-shadow: inset 1rpx*2 -1rpx*2 1rpx*2 -1rpx*2 #E4E4E4;
				}

				&:last-child {
					&::after {
						display: none;
					}
				}

				.order_mid {
					padding: 37rpx*2/2 0;
					margin-top: 0;



					.order-img {
						width: 172rpx*2/2;
						height: 152rpx*2/2;
					}

					.order_content {
						margin-left: 17rpx*2/2;

						.name {
							font-size: 28rpx*2/2;
							width: 380rpx;
							font-weight: 500;
							color: #333333;
						}

						.price_block {
							font-size: 24rpx*2/2;
							color: #7B7A7A;
							margin: 16rpx*2/2 0;
						}

						.stu {
							font-size: 12rpx*2;
							color: #7B7A7A;
						}
					}

					.button_block {
						flex-direction: column;
						justify-content: space-around;
						width: 180rpx;

						button {
							width: 110rpx;
							margin-left: 0 !important;
						}
					}
				}
			}
		}
	}
</style>
