<template>
	<!-- 充值-银行卡管理 -->
	<view class="page recharge_bank">
		<view class="bank_block" v-for="(item,index) in bankList" :key='index'>
			<view class="bank_item" :style="{background:item.pic}" @click="goInfo(item.user_bank_id)">
				<view class="card_name">
					{{item.name}}<text class="default" v-if="item.is_default==1">默认</text>
				</view>
				<view class="card_no">
					{{item.card_no}}
				</view>
			</view>
			<image class="i-del" src="http://imgxcx.yifulai.com/banl-del.png" mode="widthFix" @click="open(item.user_bank_id)"></image>
		</view>
		<view class="add_block flex-center" @click="toAdd()">
			<image src="/static/img/bank-add.png" mode="widthFix"></image>添加银行卡
		</view>
		<view class="hr"></view>
		<!-- 删除弹框 --> 
		<!-- <uni-popup ref="popup" type="center">
			<view class="popup_content">
				<image src="http://imgxcx.yifulai.com/tk3.png" mode="widthFix"></image>
				<view class="text_block flex-center">
					<text class="title">温馨提示</text>
					<text class="min_title">是否移除当前银行卡</text>
					<view class="button_block flex-center">
						<button hover-class="none"  type="default" class="flex-center" @click="close()">取消</button>
						<button hover-class="none"  type="default" class="flex-center yes" @click="del(),close()">确定</button>
					</view>
				</view>
			</view>
		</uni-popup> -->

	</view>
</template>

<script>
	import {getBankLst,postBankDelete} from '@/api/user.js'
	export default {
		components: {},
		data() {
			return {
				pintai:"B",
				bankList:[],
			}
		},
		
		onShow() {
			this.getBankLst()
		},
		methods: {
			goInfo(id){
				uni.navigateTo({
					url: '/pages/users/bank/add?id='+id
				})
			},
			getBankLst(){
				getBankLst({
					pintai: this.pintai,
				}).then(res=>{
					this.bankList = res.data.list
				})
			},
			// 打开弹框
			open(id) {
				uni.showModal({
					title:'温馨提示',
					content:'是否移除当前银行卡',
					success(res) {
						if(res.confirm){
							postBankDelete(id).then(res=>{
								uni.showToast({
									title: '删除成功',
									icon: 'none',
									duration: 2000
								});
							}).catch(res=>{
								uni.showToast({
									title: res,
									icon: 'none',
									duration: 2000
								});
							})
						}
					}
				})
			},
			// 关闭弹框
			// close() {
			// 	this.$refs.popup.close()
			// },
			// // 删除银行卡
			// del() {
			// 	let data = {
			// 		user_bank_id  : this.bank_id,
			// 		pintai : "B"
			// 	}
			// 	postBankDelete(data).then(res=>{
			// 		uni.showToast({
			// 			title: '删除成功',
			// 			icon: 'none',
			// 			duration: 2000
			// 		});
			// 	}).catch(res=>{
			// 		uni.showToast({
			// 			title: res,
			// 			icon: 'none',
			// 			duration: 2000
			// 		});
			// 	})
				
			// },
			toAdd() {
				uni.navigateTo({
					url: '/pages/users/bank/add'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.default {
		margin-left: 30rpx;
		color: #fff;
		background: #1698AE;
		border-radius: 20rpx;
		font-size: 24rpx;
		padding: 0 20rpx;
	}
	page {
		background: #fff;
	}

	.recharge_bank {
		padding: 32px/2 15px;

		.bank_block {
			position: relative;
			.bank_item{
				padding:40rpx 40rpx;
				margin-bottom: 10rpx;
				background-color: #1698AE;
				color: #fff;
				border-radius: 10px;
				.card_name{
					margin-bottom: 6px;
				}
			}
			.img-bg {
				width: 100%;
				height: 100%;
			}

			.i-del {
				position: absolute;
				right: 12px;
				top: 12px;
				width: 15px;
				height: 15px;
			}
		}

		.add_block {
			justify-content: flex-start;
			padding: 40px 23px/2;

			image {
				width: 20px;
				height: 20px;
				margin-right: 10px;
			}

			font-size: 33px/2;
			color: #8C8C8C;
		}

		.popup_content {
			width: 490px/2;
			// height: 531px/2;
			padding: 0;
			border-radius: 0;
			background: none;

			position: relative;

			image {
				// position: absolute;
				// left: 0;
				// top: 0;
				width: 100%;
				height: 531px/2;
			}

			.text_block {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				flex-direction: column;
				justify-content: flex-start;

				.title {
					font-size: 18px;
					font-weight: bold;
					color: #FFFFFF;
					margin: 73px/2 0 103px/2;
				}

				.min_title {
					font-size: 14px;
					font-weight: 500;
					color: #333333;
				}

				.button_block {
					margin-top: 78px/2;

					button {
						width: 165px/2;
						height: 58px/2;
						border: 1px solid #1698AE;
						border-radius: 5px;
						font-size: 14px;
						font-weight: 500;
						color: #1698AE;
						background: none;
						margin-left: 0;

						&.yes {
							background: linear-gradient(-90deg, #1E9FB4, #5ED8ED);
							box-shadow: 0px 3px/2 8px/2 0px rgba(49, 185, 203, 0.46);
							color: #fff;
							border: none;
							margin-left: 85px/2;
						}
					}
				}

			}

			.del-i {
				position: absolute;
				bottom: -45px;
				left: 0;
				right: 0;
				margin: auto;
				width: 24px;
				height: 24px;
			}
		}

		padding-bottom: 108px;

	}
</style>
