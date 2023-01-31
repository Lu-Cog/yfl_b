<template>
	<view class="page form_body">
		<form @submit="formSubmit" report-submit='true'>
			<view class="block">
				<view class="uni-form-item hr_shadow">
					<view class="title">商品营销标题</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='store_name' type="text" :value="store_name" placeholder="请填写商品营销标题"/>
					</view>
					
				</view>
				
				<view class="uni-form-item hr_shadow">
					<view class="title">售价（元）</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='price' type="text" :value="price" placeholder="请填写售价（元）"/>
					</view>
			
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">库存</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='stock' type="text" :value="stock" placeholder="请填写库存"/>
					</view>
							
				</view>
				
				<view class="uni-form-item hr_shadow" >
					<view class="title">
						<input style="border: 2rpx solid #e4e4e4; width: 100rpx; padding-left: 10rpx;" type="text" name='sort' :value="sort" placeholder="排序"/>
					</view>
					<view class="right_block flex-center" style="justify-content: space-around; width: 400rpx;">
						<text>热门</text>
						<evan-switch size="16" @change='onChagne' v-model="is_hot"></evan-switch>
						<text>促销</text>
						<evan-switch size="16" @change='onChagne1' v-model="is_benefit"></evan-switch>
					</view>
				</view>	
			</view>
			<button hover-class="none"  class="submit_btn flex-center" form-type="submit">保存</button>
		</form>
	</view>
</template>

<script>
	import {
		getEditProduct
	} from '@/api/store.js';
	export default {
		onLoad(options) {
			this.mer_id = options.mer_id
			let product = JSON.parse(options.product)
			this.product_id = product.product_id
			this.store_name = product.store_name
			this.price = product.price
			this.stock = product.stock
			this.sort = product.sort
			this.is_hot = Number(product.is_hot)==0?false:true
			this.is_benefit = Number(product.is_benefit)==0?false:true
			this.unique = product.unique
		},
		data() {
			return {
				store_name:'',//	否	string	名称
				price:"",//	否	string	价格
				stock:100,//	否	string	库存
				sort:255,	//否	string	排序
				is_hot:true,	//否	string	热卖
				is_benefit:true,
				mer_id:0,
				product_id:0
			};
		},
		methods:{
			onChagne(e) {
				console.log(e)
				this.is_hot = e
			},
			onChagne1(e){
				console.log(e)
				this.is_benefit = e
			},
			formSubmit: function(e) {
				let that = this,
					value = e.detail.value;
					console.log(value);
				if (!value.store_name) return that.$util.Tips({
					title: '请填写商品营销标题'
				});
				if (!value.price) return that.$util.Tips({
					title: '请填写售价'
				});
				if (!value.stock) return that.$util.Tips({
					title: '请填写库存'
				});
				if (!value.sort) return that.$util.Tips({
					title: '请填写排序'
				});
				value.is_hot = that.is_hot?1:0
				value.is_benefit = that.is_benefit?1:0
				value.unique = that.unique
				value.is_show = ''
				uni.showLoading({
					title: '保存中',
					mask: true
				})
				getEditProduct(this.mer_id, this.product_id, value).then(res =>{
					that.$util.Tips({
						title: '修改成功',
						icon: 'success'
					});
					setTimeout(function() {
						uni.navigateBack()
						// uni.navigateTo({
						// 	url: '/pages/store/admin/goods?mer_id=' + that.mer_id
						// });
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
		
		.uni-form-item{
			border-top: 1rpx solid #eee;
			background-color: #fff;
			margin-top: 0;
		}
	}
	.submit_btn {
		margin-bottom: 166rpx;
		width: 60%;
	}
</style>
