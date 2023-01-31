<template>
	<view class="page form_body">
		<form @submit="formSubmit" report-submit='true'>
			<view class="block">
				<view class="uni-form-item hr_shadow">
					<view class="title">订单金额（元）</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='price' type="digit" v-model="price"
							placeholder="请填写订单金额" />
					</view>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">选择项目类型</view>
					<picker @change="stateChange" :value="cate_index" :range="stateArr" range-key="title">
						<view class="uni-input">{{stateArr[cate_index].title}}</view>
					</picker>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">获得佣金（元）</view>
					<view class="right_block flex-center">
						<input style="text-align: right;color: #999;" name='cprice' type="text" disabled
							:value="cprice" />
					</view>
				</view>
				<view class="uni-form-item" style="height: 300rpx;">
					<textarea :value="content" placeholder="请填写订单中所购买的产品和做过的项目" name="content" />
				</view>
			</view>
			<button hover-class="none" class="submit_btn flex-center" form-type="submit">保存</button>
		</form>

	</view>
</template>

<script>
	import {
		setPromoterOrder
	} from '@/api/user.js';
	export default {
		onLoad(options) {
			this.uid = options.uid ? options.uid : 0
			this.rate_product = options.rate_product ? options.rate_product * 0.01 : 0
			this.rate_project = options.rate_project ? options.rate_project * 0.01 : 0
		},
		data() {
			return {
				cate_index: 0,
				stateArr: [{
						title: '请选择项目类型',
						value: 0
					},
					{
						title: '产品订单',
						value: 1
					},
					{
						title: '项目订单',
						value: 2
					}
				],
				price: '',
				content: '',
				uid: '',
				rate_product: 0,
				rate_project: 0
			};
		},
		computed: {
			cprice() {
				if (this.cate_index == 1) {
					return parseInt(this.price * this.rate_product)
				} else if (this.cate_index == 2) {
					return parseInt(this.price * this.rate_project)
				} else {
					return 0
				}
			}
		},
		methods: {
			stateChange(e) {
				this.cate_index = e.detail.value;
			},
			formSubmit: function(e) {
				let that = this,
					value = e.detail.value;
				if (!value.price) return that.$util.Tips({
					title: '请填写订单金额'
				});
				uni.showLoading({
					title: '保存中',
					mask: true
				})
				let data = {
					uid: that.uid,
					order_money: value.price,
					category: that.cate_index,
					mark: value.content
				}
				console.log(data);
				setPromoterOrder(data).then(res => {
					that.$util.Tips({
						title: '添加成功',
						icon: 'success'
					});
					setTimeout(function() {
						uni.navigateBack()
					}, 1000);
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.block {
		background-color: #eee;
		// margin-bottom: 0;
		// padding-bottom: 107rpx;

		.uni-form-item {
			border-top: 1rpx solid #eee;
			background-color: #fff;
			margin-top: 0;

			.i-add {
				max-height: 100rpx;
			}

			textarea {
				width: 800rpx;
				margin: 40rpx 0;
				border: 1rpx solid #eee;
			}
		}

		.flexD {
			flex-direction: column;
			height: 200rpx;
			align-items: flex-start;
			justify-content: space-around;

			>view {
				display: flex;
				justify-content: space-between;
				width: 100%;
			}
		}
	}

	.submit_btn {
		margin-bottom: 166rpx;
		width: 60%;
	}
</style>
