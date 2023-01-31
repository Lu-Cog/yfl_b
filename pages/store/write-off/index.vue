<template>
	<!-- 预约管理-首页 -->
	<view class="page write-off_index">
		<view class="card_block">
			<view class="banner-img">
				<image :src="image" mode="aspectFill"></image>
			</view>
			<view class="card_content flex-bt">
				<view class="card_left">
					<!-- 没有标签的时候 加 no-badge -->
					<view class="title clamp2">{{store_name}}</view>
					<text v-if="type!=2" class="price">¥{{price}}</text>
					<view class="time">{{type==2?'下单日期':'预约日期'}}：{{yydate}}</view>
				</view>
				<button v-if="type!=2" hover-class="none" class="edit flex-center" type="default" @click="open">修改价格</button>
			</view>
		</view>
		<button hover-class="none" class="write-off_btn flex-center" type="default" @click="getOrderHx()">确认核销</button>
		<uni-popup ref="popup" type="center">
			<view class="popup_content">
				<view class="title">修改价格</view>
				<input type="text" v-model="newPrice" placeholder="输入新价格（元）" />
				<textarea v-model="price_note" placeholder="输入备注信息" />
				<button hover-class="none" type="default" class="flex-center" @click="close()">确认</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { 
		getOrderDeteil,
		getUpdatePrice,
		getOrderHx
	} from '@/api/store.js'
	import {
		mapGetters
	} from "vuex";
	export default {
		computed: mapGetters(['store_id']),
		components: {},
		data() {
			return {
				price_note:'',
				newPrice:'',
				image: "",
				store_name: "",
				price: "",
				order_id:'',
				project_id:'',
				yydate:'',
				type:''
			}
		},
		onLoad(option) {
			this.order_id = option.order_id
			this.project_id = option.project_id
			this.type = option.type
			this.getOrderDeteil()
		},
		mounted() {

		},
		methods: {
			getOrderHx(){
				let mer_id = getApp().globalData.mer_id
				let data = {
					type: this.type,
					order_id : this.order_id
				}
				getOrderHx(mer_id,data).then(res=>{
					uni.showToast({
						title:res.message,
						icon:'none',
					})
					setTimeout(function(){
						uni.navigateBack({
							delta:1
						})
						// uni.navigateTo({
						// 	url:'pages/store/admin/appoint'
						// })
					},2000)
				}).catch(res=>{
					uni.showToast({
						title:res,
						icon:'none',
					})
				})
			},
			getOrderDeteil(){
				let mer_id = getApp().globalData.mer_id
				let data = {
					order_id : this.order_id,
					type : this.type,
					mer_id : mer_id
				}
				getOrderDeteil(mer_id,data).then(res=>{
					this.store_name = res.data.store_name
					this.image = res.data.image
					this.price = res.data.price
					this.yydate = res.data.yydate
				}).catch(res=>{
					uni.showToast({
						title:res,
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
				})
			},
			open() {
				this.$refs.popup.open()
				
			},
			close() {
				let mer_id = getApp().globalData.mer_id
				let data = {
					order_id : this.order_id,
					price : this.newPrice,
					price_note : this.price_note
				}
				getUpdatePrice(mer_id,data).then(res=>{
					this.getOrderDeteil()
					uni.showToast({
						title:'修改成功',
						icon:'none'
					})
					this.$refs.popup.close()
				}).catch(res=>{
					uni.showToast({
						title:'修改失败',
						icon:'none'
					})
					this.$refs.popup.close()
				})
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.write-off_index {
		padding: 10px 15px;

		.write-off_btn {
			margin: auto;
			margin-top: 126rpx;
			width: 664rpx;
			height: 88rpx;
			background: #1698AE;
			border-radius: 15rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #FFFFFF;
		}

		.card_block {
			box-shadow: 0px 5rpx 6rpx 0px rgba(193, 227, 255, 0.24);

			.flex-row {
				padding: 14px 0;
			}

			.banner-img {
				image {
					border-radius: 5px 5px 0px 0px;
					// width: 690rpx;
					height: 290rpx;
				}
			}

			.card_content {
				padding: 10px;
				position: relative;


				.price {
					font-size: 40rpx;
					font-weight: bold;
					color: #FF002B;
				}

				.time {
					font-size: 24rpx;
					color: #999999;
					margin-top: 42rpx;
				}

				.edit {
					position: absolute;
					bottom: 60px;
					right: 28rpx;
					width: 164rpx;
					height: 55rpx;
					border: 1px solid #1698AE;
					border-radius: 28rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #1698AE;
					background: #fff;
				}
			}

		}

		.popup_content {
			padding: 63rpx 76rpx;

			.title {
				text-align: center;
				font-size: 36rpx;
				font-weight: 500;
				color: #1698AE;
				margin-bottom: 55rpx;
			}

			input {
				width: 357rpx;
				height: 75rpx;
				border: 1px solid #BFBFBF;
				font-size: 28rpx;
				font-weight: 500;
				color: #B2B2B2;
				padding: 0 16rpx;
				margin-bottom: 25px;
			}

			textarea {
				width: 528rpx;
				height: 148rpx;
				border: 1px solid #BFBFBF;
				font-size: 28rpx;
				font-weight: 500;
				color: #B2B2B2;
				padding: 0 16rpx;
			}

			button {
				width: 269rpx;
				height: 74rpx;
				margin: auto;
				margin-top: 30px;
				background: #1698AE;
				border-radius: 10rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
</style>
