<template>
	<view class="body">
		<image src="http://imgxcx.yifulai.com/e07b4202203141843202346.jpg" mode="widthFix"></image>
		<!-- <view @click="getdatails(link_ids[0])">
			<image src="http://imgxcx.yifulai.com/6752020220307115228173.jpg" mode="widthFix"></image>
		</view>
		<view @click="getdatails(link_ids[1])">
			<image src="http://imgxcx.yifulai.com/9ef91202203071152287586.jpg" mode="widthFix"></image>
		</view>
		<view @click="getdatails(link_ids[2])">
			<image src="http://imgxcx.yifulai.com/e2248202203071155573284.jpg" mode="widthFix"></image>
		</view>
		<view @click="getdatails(link_ids[3])">
			<image src="http://imgxcx.yifulai.com/3aaf520220307115228597.jpg" mode="widthFix"></image>
		</view>
		<view @click="getdatails(link_ids[4])">
			<image src="http://imgxcx.yifulai.com/f7ac0202203071152283285.jpg" mode="widthFix"></image>
		</view>
		<view @click="getdatails(link_ids[5])">
			<image src="http://imgxcx.yifulai.com/b120a202203071152294928.jpg" mode="widthFix"></image>
		</view>
		<view @click="getdatails(link_ids[6])">
			<image src="http://imgxcx.yifulai.com/09574202203071152296040.jpg" mode="widthFix"></image>
		</view>
		<image src="http://imgxcx.yifulai.com/7f139202203071152282713.jpg" mode="widthFix"></image>
		<view @click="getdatails(link_ids[7])">
			<image src="http://imgxcx.yifulai.com/1d2e820220307115229691.jpg" mode="widthFix"></image>
		</view>
		<view @click="getdatails(link_ids[8])">
			<image src="http://imgxcx.yifulai.com/fb0b1202203071152293765.jpg" mode="widthFix"></image>
		</view>
		<view @click="getdatails(link_ids[9])">
			<image src="http://imgxcx.yifulai.com/9188a202203071152289822.jpg" mode="widthFix"></image>
		</view>
		<image src="http://imgxcx.yifulai.com/b97c0202203071152287605.jpg" mode="widthFix"></image> -->
	
		<!-- <view class="first">
			<image src="https://imgxcx.yifulai.com/1112_06.jpg" mode="widthFix"></image>
			<view class="nav">
				<view @click="getdatails(link_ids[2])"></view>
				<view @click="getdatails(link_ids[3])"></view>
			</view>
		</view> -->

		<view class="list" v-if="proList.length!=0">
			<view class="list_item" v-for="(item,index) in proList" :key="index" @click="getdatails(item.product_id)">
				<image :src="item.image" mode="widthFix"></image>
				<!-- <image class="s11" src="/static/images/3.png" mode="widthFix"></image> -->
				<view class="item_text">
					<view class="name clamp">
						{{item.store_name}}
					</view>
					<view class="price_block flex-center">
						<view class="price">
							<text>￥</text>{{item.price}}
						</view>
						<text class="old_price">￥{{item.ot_price}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getProductHot
	} from '@/api/store.js'
	export default {
		data() {
			return {
				proList: [],
				page: 1,
				link_ids: []
			};
		},
		onShow() {
			this.getProductHot()
			getApp().globalData.act_open = 100
		},
		onReachBottom() {
			this.getProductHot(true)
		},
		methods: {
			getdatails(id) {
				if (id != "#" && Number(id) > 0) {
					uni.navigateTo({
						url: '/pages/goods_details/index?id=' + id
					})
				}
			},
			getProductHot(isA) {
				let that = this
				if (!isA) {
					that.proList = []
					that.page = 1
				}
				getProductHot(that.page).then(res => {
					this.link_ids = res.data.link_ids
					let list = []
					if (res.data.list.length > 0) {
						list = that.proList.concat(res.data.list)
						that.$set(that, 'proList', list)
						that.page++
					} else {
						// uni.showToast({
						// 	title: '没有内容了',
						// 	icon: 'none'
						// })
					}

				})
			}
		}
	}
</script>

<style lang="scss">
	* {
		padding: 0;
		margin: 0;
	}

	.body {
		// background-color: #EA4C41;
	}

	image {
		display: block;
		width: 100%;
		// vertical-align:top;
		// float:left;	
	}

	.first {
		position: relative;

		.nav {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			display: flex;

			view {
				width: 50%;
				height: auto;
			}
		}
	}

	.list {
		padding: 15rpx;
		min-height: 30vh;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		// background-color: #EA4C41;
		background: url(http://imgxcx.yifulai.com/cfe6b20220307115228170.jpg) repeat-y 100% center;

		.list_item {
			position: relative;
			width: 48%;
			margin-bottom: 45rpx;
			padding-bottom: 35rpx;
			box-shadow: 0px 0px 9px 4px rgba(0, 0, 0, 0.3);
			background-color: #fff;
			border-radius: 10rpx;
			overflow: hidden;

			image {
				width: 100%;
				height: 400rpx;
			}

			.s11 {
				width: 100rpx;
				height: 100rpx;
				position: absolute;
				top: 0;
				right: 0;
			}

			.item_text {
				padding: 0 4px;

				.name {
					font-size: 14px;
					color: #000000;
					margin-top: 5px;
				}

				.price_block {
					justify-content: flex-start;
					align-items: flex-end;
					margin-top: 5px;

					.price {
						font-size: 18px;
						line-height: 18px;
						font-weight: 500;
						color: #FF4242;

						text {
							font-size: 12px;
						}
					}

					.old_price {
						margin-left: 23rpx;
						font-size: 12px;
						font-weight: 500;
						text-decoration: line-through;
						color: #999999;
					}
				}
			}
		}
	}
</style>
