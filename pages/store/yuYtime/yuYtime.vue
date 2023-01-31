<template>
	<view class="page form_body">
		<form @submit="formSubmit" report-submit='true'>
			<view class="block">
				
				
				<view class="uni-form-item hr_shadow">
					<view class="title">每小时可预约人数</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" maxlength="2" name='num_yuyue' type="number" :value="num_yuyue"
							placeholder="人数" />
					</view>
				</view>
				<view class="uni-form-item hr_shadow" style="padding-right: 0;">
					<view class="title">预约状态</view>
					<view class="right_block flex-center">
						<switch :checked="yuyue_state==1" @change="yuYChange"  style="transform:scale(0.7);"/>
					</view>
				</view>
				<view class="hr_shadow tip">
					<view>提示：</view>
					<view style="margin-top: 10rpx;">{{yj_tip}}</view>
				</view>
			</view>
			<button hover-class="none" class="submit_btn flex-center" form-type="submit">保存</button>
		</form>

	</view>
</template>

<script>
	import {
		getUserInfo,
		setStoreYuyue
	} from '@/api/user.js'
	
	export default {
		data() {
			return {
				yj_tip: '请根据实际情况设置可预约人数',
				num_yuyue:'',
				yuyue_state: ''
			};
		},
		onLoad(options) {
			this.getUserInfo()
		},
		methods: {
			yuYChange(e){
				if(e.target.value){
					this.yuyue_state=1
				}else{
					this.yuyue_state=0
				}
			},
			getUserInfo() {
				getUserInfo().then(res => {
					this.num_yuyue = res.data.num_yuyue
					this.yuyue_state = res.data.yuyue_state
				})
			},
			formSubmit(e) {
				let that = this,
					value = e.detail.value;
					value.yuyue_state = that.yuyue_state
				setStoreYuyue(value).then(res => {
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
