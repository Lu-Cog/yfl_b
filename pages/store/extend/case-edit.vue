<template>
	<!-- 管理功能-店铺管理 -->
	<view class="page cashier_body form_body">
		<view class="block">
			<view class="uni-form-item hr_shadow">
				<textarea v-model="content" placeholder="填写案例内容" />
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">案例时间</view>
				<input class="uni-input" type="text" v-model="used_time" placeholder="年-月-日" />
				<!-- <image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png"
					mode="widthFix"></image> -->
			</view>
			<view class="uni-form-item hr_shadow flexStart">
				<view class="title" style="width: 150px;">添加图片</view>
				<view class="right_block flex-center" style="flex-wrap: wrap;">
					<view class="add-img" @click="addBanner">
						<image class="i-add" src="/static/img/i-add.png" mode="widthFix"></image>
					</view>
					<view class="img-item" v-for="(item,index) in imgList" :key="index">
						<image :src="item" mode="widthFix"></image>
						<view class="iconfont icon-guanbi1" @click="deleteImg(index)"></view>
					</view>
				</view>
			</view>
			<!-- <view class="uni-form-item hr_shadow">
				<view class="title"></view>
				<image class="i-add" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/i-add.png"
					mode="widthFix"></image>
			</view> -->
		</view>
		<button class="submit_btn flex-center" hover-class="none" @click="submitForm()">保存</button>
	</view>
</template>

<script>
	import {
		getCasesSave,
		getArticleDetail,
	} from '@/api/api.js'
	export default {
		data() {
			return {
				color: '#1698ae',
				style: 'transform:scale(0.7)',
				price: 0,
				title: '',
				number: '',
				imgList: [],
				article: '',
				content: '',
				sort: '',
				article_id: 0,
				mer_id: '',
				used_time: ""
			}
		},
		onLoad(option) {
			this.mer_id = getApp().globalData.mer_id
			this.article_id = option.article_id
			if (option.article_id) {
				this.getArticleDetail()
			}

		},
		methods: {
			getArticleDetail() {
				getArticleDetail(this.article_id).then(res => {
					this.imgList = res.data.image_input.split(',')
					this.content = res.data.content
					this.used_time = res.data.used_time
				})
			},
			addBanner() {
				var that = this
				that.$util.uploadImageOne('upload/image', function(res) {
					that.imgList.push(res.data.path);
				});
				// uni.chooseImage({
				// 	success(res) {
				// 		// console.log(res.tempFilePaths);
				// 		that.imgList = that.imgList.concat(res.tempFilePaths)
				// 	}
				// })
			},
			// 删除图片
			deleteImg(index) {
				this.imgList.splice(index, 1)
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			submitForm() {
				let data = {
					article_id: this.article_id,
					content: this.content,
					used_time: this.used_time,
					image_input: this.imgList.join(','),
				}
				getCasesSave(this.mer_id, data).then(res => {
					uni.navigateBack({
						delta: 1
					})
				})
			},

			// 售价切换
			priceChange: function(e) {
				console.log('售价：' + e.detail.value)
				this.price = e.detail.value
			},

		}
	}
</script>

<style lang="less" scoped>
	.uni-form-item {
		height: auto;
		min-height: 55px;
	}

	textarea {
		box-sizing: border-box;
		width: 100%;
		border: 0.5px solid #eee;
		margin-top: 10px;
	}

	.flexStart {
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-around;
		height: auto;

		view {
			margin: 8rpx 0;
		}
	}

	.img-item {
		position: relative;

		image {
			width: 80rpx;
			height: 80rpx;
			margin-right: 22rpx;
		}

		.iconfont {
			position: absolute;
			right: 7rpx;
			top: -16rpx;
			font-size: 30rpx;
			color: #DDDDDD;
		}
	}

	.cashier_body {
		.red {
			color: #FF2A2A;
		}

		.block {
			margin: 15px;
			margin-bottom: 0;
			padding-bottom: 70px;
		}

		.submit_btn {
			margin-bottom: 166px/2;
		}

		.top_body {
			flex-direction: column;
			height: 300px/2;
			background: #FFFFFF;
			border-radius: 5px;

			.ccc {
				font-size: 12px;
				color: #333333;
			}

			.price {
				font-size: 70px/2;
				font-weight: 500;
				color: #000000;
				margin: 25px/2 0 36px/2;

				text {
					font-size: 15px;
				}
			}
		}
	}
</style>
