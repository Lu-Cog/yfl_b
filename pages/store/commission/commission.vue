<template>
	<view class="page form_body">
		<form @submit="formSubmit" report-submit='true'>
			<view class="block">
				<view class="uni-form-item hr_shadow">
					<view class="title">产品销售佣金</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='rate_product' type="digit" :value="rate_product"
							placeholder="佣金" />
					</view>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">项目销售佣金</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='rate_project' type="digit" :value="rate_project"
							placeholder="佣金" />
					</view>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">抢多多可开团数量</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='qdd_num' type="number" :value="qdd_num"
							placeholder="数量" />
					</view>
				</view>
				<view class="hr_shadow tip">
					<view>提示：</view>
					<view>{{yj_tip}}</view>
				</view>
			</view>
			<button hover-class="none" class="submit_btn flex-center" form-type="submit">保存</button>
		</form>

	</view>
</template>

<script>
	import {
		getUserInfo,
		setPromoterRate,
		setPromoter
	} from '@/api/user.js'
	
	export default {
		data() {
			return {
				yj_tip: '',
				uid : 0,
				rate_product : 0,
				rate_project : 0,
				qdd_num:0
			};
		},
		onLoad(options) {
			this.uid = options.uid?options.uid:0
			this.rate_product = options.rate_product?options.rate_product:0
			this.rate_project = options.rate_project?options.rate_project:0
			this.qdd_num = options.qdd_num?options.qdd_num:0
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				getUserInfo().then(res => {
					if(this.rate_product<=0){
						this.rate_product = res.data.rate_product
					}
					if(this.rate_project<=0){
						this.rate_project = res.data.rate_project
					}
					if(this.qdd_num<=0){
						this.qdd_num = res.data.qdd_num
					}
					this.yj_tip = res.data.yj_tip
				})
			},
			formSubmit(e) {
				let that = this,
					value = e.detail.value;
					value.uid = that.uid
				setPromoterRate(value).then(res => {
					that.$util.Tips({
						title: '保存成功',
						icon: 'success'
					});
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						})
					}, 1000);
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			}
		}
	}
</script>

<style lang="scss">
	.block {
		background-color: #eee;

		// margin-bottom: 0;
		// padding-bottom: 107rpx;
		.tip {
			color: #999;
			font-size: 24rpx;
			height: 55px;
			padding: 9px 15px;
			border-top: 1rpx solid #eee;
			background-color: #fff;
		}

		.uni-form-item {
			border-top: 1rpx solid #eee;
			background-color: #fff;
			// margin-top: 0;

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
