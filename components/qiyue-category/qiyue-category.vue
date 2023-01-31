<template>
	<view>
		<view class="nav">
			<view class="nav-left">
				<scroll-view scroll-y :style="'height:'+windowHeight+'px'">
					<view class="nav-left-item" v-for="(item,index) in categoryList"
						@click="categoryClickMain(item,index)" :key="index"
						:style="index==defaultActive?'color:'+activeTextColor+';background-color:'+activeBackgroundColor:''">
						{{item.cate_name}}
					</view>
				</scroll-view>
			</view>
			<view class="nav-right">
				<!-- <scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation> -->
				<scroll-view style="height:80vh" scroll-y :scroll-top="scrollTop" @scroll="scroll" scroll-with-animation>
					<view class="nav-right-item" v-for="(item,index2) in subCategoryList" :key="index2">
						<view class="img_box flex-center" @click="toItem(item.product_id)">
							<image :src="item.image" mode="aspectFill" />
						</view>
						<view class="goods_box" @click="toItem(item.product_id)">
							<view class="goods_name clamp2">{{item.store_name}}</view>
							<text v-if="item.activity_type==1 || item.activity_type==2 " class="goods_tag">{{item.activity_name}}</text>
							<text v-else-if="item.activity_type==3" class="goods_tag">代理</text>
							<text v-else-if="item.activity_type==4" class="goods_tag">YBK</text>
							<text v-else-if="item.activity_type==5" class="goods_tag">特定价</text>
							<text v-else-if="item.activity_name" class="goods_tag">{{item.activity_name}}</text>
							<!-- <text v-else-if="item.activity_type==0" class="goods_tag">市场价</text> -->
							<view class="goods_price">
								¥{{$util.moneyAct(item.hd_price)}}
								<text v-show="item.activity_type>0"
									class="old_price">¥{{$util.moneyAct(item.ot_price)}}</text>
							</view>
						</view>
						<image @tap="joinCart(item.product_id)" class="goods_add" src="/static/img/add.png"
							mode="widthFix"></image>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "category",
		data() {
			return {
				activity_type_tip: false,
				windowHeight: 0,
				scrollTop: 0,
				scrollHeight: 0,
				activeStyle: {
					color: this.activeTextColor,
					backgroundColor: this.activeBackgroundColor
				}
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight - 182;
					console.log(this.windowHeight, 'windowHeight');
				}
			});

		},
		updated() {
			
		},
		watch: {
			subCategoryList(newValue, oldValue) {

			}
		},

		props: {
			//主分类激活索引
			defaultActive: {
				type: Number,
				default: 0
			},
			//主分类List
			categoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			//侧边分类List
			subCategoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			activeTextColor: {
				type: String,
				default: '#1698ae'
			},
			activeBackgroundColor: {
				type: String,
				default: '#ffffff'
			},
			label: {
				type: String,
				default: 'name'
			},
			imgSrc: {
				type: String,
				default: 'logo'
			},
			//主分类点击事件
			categoryMainClick: {},
			//子分类点击事件
			categorySubClick: {}
		},
		methods: {
			joinCart: function(id) {
				this.$emit("pjoinCart", id)
			},
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			
			categoryClickMain(category, index) {
				this.$emit('categoryMainClick', category,index)
				this.scrollTop = -this.scrollHeight * index;
			},

			toItem(id) {
				uni.navigateTo({
					url: '/pages/goods_details/index?id=' + id
				})
			}
		}

	}
</script>

<style lang="less" scoped>
	.vhidden {
		visibility: hidden;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 32%;
		padding: 0 3rpx;
		background-color: #eff1f19c;
	}

	.nav-left-item {
		height: 100rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: left;
		padding-left: 10rpx;
		input{
			border: 1px solid #eee;
			background-color: #fff;
			width: 100%;
			height: 80%;
		}
	}

	.nav-right {
		width: 68%;

		.nav-right-item {
			background: #fff;
			display: flex;
			margin-bottom: 6rpx;
			padding: 32rpx 8rpx;
			position: relative;

			.img_box {
				width: 198rpx;
				height: 198rpx;

				image {
					width: 198rpx;
					height: 198rpx;
				}
			}

			.goods_box {
				padding-top: 9rpx;
				padding-left: 16rpx;

				.goods_name {
					font-size: 28rpx;
					// font-weight: bold;
					color: #333333;
					height: 56rpx;
					line-height: 28rpx;
					margin-bottom: 17rpx;
				}

				.goods_tag {
					padding: 5rpx 5rpx;
					border: 2rpx solid #FF5061;
					font-size: 24rpx;
					color: #FF5061;
				}

				.goods_price {
					font-size: 32rpx;
					font-weight: bold;
					color: #F7302A;
					margin-top: 40rpx;

					.old_price {
						font-size: 24rpx;
						text-decoration: line-through;
						color: #BFBDBD;
						margin-left: 22rpx;
					}
				}
			}

			.goods_add {
				position: absolute;
				bottom: 100rpx;
				right: 29rpx;
				width: 48rpx;
				height: 48rpx;
			}
		}
	}
</style>
