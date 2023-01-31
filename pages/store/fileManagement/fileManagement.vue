<template>
	<!-- 管理功能-店铺管理 -->
	<view class="page cashier_body form_body">
		<view class="block">
			<view class="uni-form-item hr_shadow">
				<view class="title">客户名称</view>
				<input class="uni-input" :value="name" type="text" disabled />
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">选择服务项目</view>
				<picker @change="stateChange" :value="cate_index" :range="stateArr" range-key="title">
					<view class="uni-input">{{store_name?store_name:stateArr[cate_index].title}}</view>
				</picker>
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">费用</view>
				<input class="uni-input" type="text" v-model="price" placeholder="费用" />
			</view>
			<view class="uni-form-item hr_shadow flexStart">
				<view class="title" style="width: 150px;">添加图片</view>
				<view class="right_block flex-center" style="flex-wrap: wrap;">
					<view class="add-img" @click="addBanner">
						<image class="i-add" src="/static/img/i-add.png" mode="widthFix"></image>
					</view>
					<view class="img-item" v-for="(item,index) in image_input" :key="index">
						<image :src="item" mode="widthFix"></image>
						<view class="iconfont icon-guanbi1" @click="deleteImg(index)"></view>
					</view>
				</view>
			</view>
			<view class="uni-form-item hr_shadow">
				<textarea v-model="content" placeholder="填写案例内容" />
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
		getProjectCategory
	} from '@/api/store.js';
	import {
		getCasesSave,
		getArchivesDetail,
		getArchivesSave
	} from '@/api/api.js'
	export default {
		data() {
			return {
				color: '#1698ae',
				style: 'transform:scale(0.7)',
				price: 0,
				title: '',
				id: 0,
				mer_id: '',
				stateArr: '',
				cate_index: 0,
				category_id: '',
				uid: '',
				name: '',
				store_name: '',
				price: '',
				image_input: [],
				content: ''
			}
		},
		onLoad(option) {
			this.mer_id = getApp().globalData.mer_id
			this.id = option.id ? option.id : 0
			this.uid = option.uidstore_name
			this.getArchivesDetail()
			this.getProjectCategory()

		},
		methods: {
			stateChange(e) {
				console.log(Number(e.detail.value))
				console.log(this.stateArr[e.detail.value].category_id)
				this.cate_index = e.detail.value;
				this.category_id = this.stateArr[this.cate_index].category_id;
			},
			getProjectCategory() {
				let that = this
				getProjectCategory().then(res => {
					that.stateArr = res.data
				})
			},
			getArchivesDetail() {
				let data = {
					id: this.id
				}
				getArchivesDetail(this.mer_id, data).then(res => {
					this.archivesinfo = res.data.name
					this.store_name = res.data.store_name
					this.price = res.data.price
					this.image_input = res.data.image_input
					this.content = res.data.content
				})
			},
			addBanner() {
				var that = this
				that.$util.uploadImageOne('upload/image', function(res) {
					that.image_input.push(res.data.path);
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
				this.image_input.splice(index, 1)
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			submitForm() {
				let data = {
					id: this.id,
					uid: this.uid,
					project_id: this.category_id,
					price: this.price,
					image_input: this.image_input,
					content: this.content
				}
				getArchivesSave(this.mer_id, data).then(res => {
					uni.showToast({
						title: '成功'
					})
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
	.hr_shadow {
		border-bottom: 1px solid #eee;
		margin-top: 0;

		&:last-child {
			border-bottom: none;
		}
	}

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
