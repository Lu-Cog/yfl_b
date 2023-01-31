<template>
	<view class="page form_body">
		<form @submit="formSubmit" report-submit='true'>
			<view class="block">
				<view class="uni-form-item hr_shadow">
					<view class="title">核销码</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='code' placeholder="请输入核销码" />
					</view>
				</view>

			</view>
			<button hover-class="none" class="submit_btn flex-center" form-type="submit">核销</button>
		</form>

	</view>
</template>

<script>
	import {
		hxLiveWrite
	} from '@/api/user.js'

	export default {
		data() {
			return {};
		},
		onLoad(options) {},
		methods: {

			formSubmit(e) {
				let that = this,
					value = e.detail.value;
				if (!value.code) {
					return uni.showToast({
						title: '请输入核销码',
						icon: 'none'
					})
				}
				hxLiveWrite(value).then(res => {
					that.$util.Tips({
						title: '核销成功',
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
