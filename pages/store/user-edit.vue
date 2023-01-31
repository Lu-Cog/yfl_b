<template>
	<!-- 管理功能-店铺管理 -->
	<view class="page cashier_body form_body">
		<view class="block">
			<view class="uni-form-item hr_shadow">
				<view class="title">手机号</view>
				<input class="uni-input" type="text" :placeholder="phone" disabled="true" />
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">姓名</view>
				<input class="uni-input" type="text" v-model="real_name" placeholder="请输入姓名" />
			</view>
			
			<view class="uni-form-item hr_shadow">
				<view class="title">生日</view>
				<picker mode="date" :value="birthday" start="1950-01-01" end="2021-01-01" @change="bindDateChange">
					<view class="uni-input">{{birthday}}</view>
				</picker>
			</view>
			<view class="uni-form-item hr_shadow">
				<textarea v-model="content" placeholder="填写客户备注" />
			</view>
		</view>
		<button class="submit_btn flex-center" hover-class="none" @click="submitForm()">保存</button>
	</view>
</template>

<script>
	import {
		saveInfo
	} from '@/api/api.js'
	export default {
		data() {
			return {
				birthday: '',
				real_name:'',
				phone:'',
				content:'',
				mer_id:'',
				uid:'',
				nickname:''
			}
		},
		onLoad(option) {
			this.mer_id = getApp().globalData.mer_id
			this.real_name = option.real_name
			this.phone = option.phone
			this.content = option.mark
			this.birthday = option.birthday
			this.uid = option.uid
			this.nickname = option.nickname
		},
		methods: {
			bindDateChange: function(e) {
				this.birthday = e.target.value
			},
			
			submitForm() {
				let data = {
					toid : this.uid,
					real_name: this.real_name,
					content: this.content,
					nickname: this.nickname,
					birthday: this.birthday
				}
				saveInfo(this.mer_id, data).then(res => {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					uni.navigateBack({
						delta: 1
					})
				})
			},

		}
	}
</script>

<style lang="less" scoped>
	.uni-input{
		color: #000 !important;
	}
	.uni-form-item {
		height: auto;
		min-height: 55px;
		border-bottom: 1px solid #eee;
		&:last-child{
			border-bottom :none;
		}
	}

	textarea {
		box-sizing: border-box;
		width: 100%;
		color: #000;
		border: 0.5px solid #eee;
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
			padding-bottom: 10px;
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
