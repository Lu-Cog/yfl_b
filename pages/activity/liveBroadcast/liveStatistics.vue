<template>
	<view class="page form_body">
		<view class="block">
			<view class="uni-form-item hr_shadow">
				<view class="title">已订阅成功人数</view>
				<view class="right_block flex-center" @click="goto(1)">
					{{share_total}} 人
				</view>
			</view>
			<!-- <view class="uni-form-item hr_shadow">
				<view class="title">已分享拉新人数</view>
				<view class="right_block flex-center">
					{{share_new}} 人
				</view>
			</view> -->
			<view class="uni-form-item hr_shadow">
				<view class="title">已中奖人数</view>
				<view class="right_block flex-center" @click="goto(2)">
					{{prize_num}} 人
				</view>
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">礼品已核销人数</view>
				<view class="right_block flex-center" @click="goto(3)">
					{{write_num}} 人
				</view>
			</view>
		</view>
		<navigator class="submit_btn flex-center" :url="'/pages/activity/liveShare/liveShare?room_id='+room_id">去分享</navigator>
		<navigator class="submit_btn flex-center" :url="'/pages/activity/liveWrite?room_id='+room_id">去核销</navigator>
	</view>
</template>

<script>
	import {
		getBroadcastTj
	} from '@/api/api.js'

	export default {
		data() {
			return {
				share_total: 0,
				share_new: 0,
				prize_num: 0,
				write_num: 0,
				room_id:''
			};
		},
		onLoad(options) {
			this.room_id = options.room_id
			this.getBroadcastTj()
		},
		onShow() {
			this.getBroadcastTj()
		},
		methods: {
			goto(type){
				uni.navigateTo({
					url:'/pages/activity/index_new?type='+type+'&room_id='+this.room_id
				})
			},
			getBroadcastTj(){
				getBroadcastTj({room_id:this.room_id}).then(res=>{
					this.share_total = res.data.share_total
					this.share_new = res.data.share_new
					this.prize_num = res.data.prize_num
					this.write_num = res.data.write_num
				})
			}
		}
	}
</script>

<style lang="scss">
	.block {
		background-color: #eee;

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
		margin-top: 40rpx !important;
		width: 60%;
	}
	.right_block{
		text-decoration: underline;
	}
</style>
