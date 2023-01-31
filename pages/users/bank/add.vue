<template>
	<!-- 表单-充值-添加银行卡 -->
	<view class="page recharge_add-bank">
		<form @submit="formSubmit" class="form_body">
			<view class="block">
				<view class="uni-form-item hr_shadow">
					<view class="title">开户银行</view>
					<picker @change="bankChange" :value="bank" :range="bankArray" range-key="name" :disabled="disabled">
						<view class="uni-input">{{card_name?card_name:bankArray[bank].name}}</view>
					</picker>
					<image v-if="!disabled" class="i-right" src="/static/img/jiantou_left.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="block">
				<view class="uni-form-item hr_shadow">
					<view class="title">银行卡号</view>
					<input class="uni-input" name="card_no" :disabled="disabled" placeholder="请输入银行卡的卡号" v-model="number" />
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">持卡人姓名</view>
					<input class="uni-input" type="text" :disabled="disabled" name="card_name" placeholder="请输入持卡人的姓名" v-model="name" />
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">身份证号</view>
					<input class="uni-input" type="idcard" :disabled="disabled" name='card_sfz' placeholder="请输入您的身份证号" v-model="idNumber" />
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">手机号</view>
					<input class="uni-input" type="idcard" :disabled="disabled" name='card_phone' placeholder="请输入您的手机号" v-model="phone" />
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">默认卡</view>
					<switch :checked="defaults" style="transform:scale(0.7)" @change="defaultCard" />
				</view>
			</view>
			<button v-if="!disabled" class="submit_btn flex-center" hover-class="none"  form-type="submit">确定</button>
		</form>

	</view>
</template>

<script>
	import {extractBank,postBankCreate,getBankInfo,postBankDefault} from '@/api/user.js'
	export default {
		components: {},
		data() {
			return {
				pintai:"B",
				bankArray: [],
				bank: 0,
				number: '',
				name: '',
				idNumber: '',
				phone:'',
				bank_id:'',
				card_name:'',
				disabled:false,
				default:0,
				defaults:''
			}
		},
		mounted() {},
		onLoad(options) {
			if(options.id){
				this.bank_id = options.id
				this.getBankInfo()
				this.disabled = true
				uni.setNavigationBarTitle({
					title:'银行卡信息'
				})
			}else{
				this.extractBank()
			}
		},
		methods: {
			defaultCard(e){
				this.defaults = e.detail.value
				if(e.detail.value){
					this.default = 1
				}else{
					this.default = 0
				}
				if(this.disabled){
					let data = {
						user_bank_id  : this.bank_id,
						is_default : this.default,
						pintai : this.pintai
					}
					postBankDefault(data).then(res=>{
						uni.showToast({
							title:res.message,
							icon:'none'
						})
					}).catch(res=>{
						uni.showToast({
							title:res,	
							icon:'none'
						})
					})
				}
			},
			getBankInfo(){
				getBankInfo(this.bank_id).then(res=>{
					this.number = res.data.card_no
					this.name = res.data.card_name
					this.idNumber = res.data.card_sfz
					this.phone = res.data.card_phone
					this.card_name = res.data.name
					this.default = res.data.is_default
					if(res.data.is_default==1){
						this.defaults = true
					}else{
						this.defaults = false
					}
				})
			},
			extractBank(){
				extractBank().then(res=>{
					this.bankArray = res.data.list
					this.bank_id = this.bankArray[this.bank].bank_id
				})
			},
			// 开户银行选择
			bankChange: function(e) {
				this.bank = e.detail.value
				this.bank_id = this.bankArray[this.bank].bank_id
			},
			formSubmit: function(e) {
				if((!this.number) || this.number.length<16){
					return uni.showToast({
						title:'请填写正确的银行卡',
						icon:'none'
					})
				}
				if(!this.name){
					return uni.showToast({
						title:'请填写姓名',
						icon:'none'
					})
				}
				if(!this.idNumber || this.idNumber.length != 18 ){
					return uni.showToast({
						title:'请填写正确身份证号码',
						icon:'none'
					})
				}
				if(!this.phone || this.phone.length != 11 ){
					return uni.showToast({
						title:'请填写正确手机号',
						icon:'none'
					})
				}
				let data = {
					user_bank_id:0,
					bank_id : this.bank_id,
					card_no : this.number.replace(/\s*/g,""),
					card_name : this.name,
					card_sfz : this.idNumber.replace(/\s*/g,""),
					card_phone : this.phone.replace(/\s*/g,""),
					is_default : this.default,
					pintai : this.pintai
				}
				uni.showLoading({
					mask:true,
					title:'请求中...',
					duration: 5000,
					success() {
						postBankCreate(data).then(res=>{
							uni.showToast({
								title:res.message,
								icon:'none',
							})
							setTimeout(function(){
								uni.navigateBack({
									delta:1
								})
							},1000)
						}).catch(res=>{
							uni.showToast({
								title:res,
								icon:'none',
							})
						})
					}
				})
				
			},
		}
	}
</script>

<style lang="less" scoped>
	.hr_shadow{
		border-bottom: 1rpx solid #eee;
	}
</style>
