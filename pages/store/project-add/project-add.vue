<template>
	<view class="page form_body">
		<form @submit="formSubmit" report-submit='true'>
			<view class="block">
				<view class="uni-form-item hr_shadow">
					<view class="title">项目标题</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='title' type="text" :value="store_name" placeholder="请填写项目标题"/>
					</view>
					
				</view>
				
				<view class="uni-form-item hr_shadow">
					<view class="title">选择项目类型</view>
					<picker @change="stateChange" :value="cate_index" :range="stateArr" range-key="title">
						<view class="uni-input">{{stateArr[cate_index].title}}</view>
					</picker>
				</view>
				
				<view class="uni-form-item hr_shadow">
					<view class="title">区间价（元）</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" type="digit" name='price' @blur="maxNum()" v-model="price" placeholder="请输入最低价格"/>
					</view>
				</view>
					
				<view class="uni-form-item hr_shadow">
					<view class="title">区间价（元）</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='ot_price' type="digit" @blur="maxNum()" v-model="ot_price" placeholder="请输入最高价格"/>
					</view>
				</view>
				
				<view class="uni-form-item hr_shadow">
					<view class="title">添加封面图</view>
					<view class="right_block flex-center" @click="addimg">
						<image class="i-add" :src="image ? image:'/static/img/i-add.png'" mode="widthFix"></image>
					</view>
				</view>
				
				
				<view class="uni-form-item" style="height: 500rpx;">
					<textarea maxlength="-1" :value="content" placeholder="填写文字介绍信息" name="content" />
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
		postEditProject,
		getProjectInfo,
		getProjectCategory
	} from '@/api/store.js';
	export default {
		onLoad(options) {
			this.mer_id = options.mer_id
			this.project_id = options.project_id
			uni.setNavigationBarTitle({
				title: this.project_id==0 ? '添加项目' : '编辑项目'
			})
			if(this.project_id>0){
				this.getProjectInfo()
			}
			this.getProjectCategory()
		},
		data() {
			return {
				is_hot:true,
				is_benefit:true,
				store_name:'',
				cate_index:0,
				category_id:0,
				stateArr:[],
				price:'',
				ot_price:'',
				content:'',
				image:'',
				sort:255,
				mer_id:0,
				project_id:0,
				status:0
			};
		},
		methods:{
			maxNum(){
				if(this.price>=this.ot_price){
					uni.showToast({
						title:'最低价不得超过或等于最高价',
						icon:'none'
					})
				}
			},
			onChagne(e) {
				console.log(e)
				this.is_hot = e
			},
			onChagne1(e){
				console.log(e)
				this.is_benefit = e
			},
			addimg(){
				var that = this
				// var arr = [that.image]
				// uni.previewImage({
				// 	urls:arr
				// })
				that.$util.uploadImageOne('upload/image', function (res) {
				  that.image=res.data.path;
				});
			},
			stateChange(e){
				console.log(Number(e.detail.value))
				console.log(this.stateArr[e.detail.value].category_id)
				this.cate_index = e.detail.value;
				this.category_id = this.stateArr[this.cate_index].category_id;
			},
			getProjectCategory(){
				let that = this
				getProjectCategory().then(res=>{
					that.stateArr = res.data
				})
			},
			getProjectInfo(){
				let that = this
				getProjectInfo(that.mer_id,that.project_id).then(res=>{
					that.store_name=res.data.store_name
					that.price = Number(res.data.price)
					that.category_id = res.data.category_id
					that.ot_price =Number(res.data.ot_price)
					that.image = res.data.image
					that.content = res.data.content
					that.sort = res.data.sort
					that.is_hot = res.data.is_hot
					that.is_benefit = res.data.is_benefit
				})
			},
			formSubmit: function(e) {
				let that = this,
					value = e.detail.value;
					
				if (!value.title) return that.$util.Tips({
					title: '请填写项目标题'
				});
				if (!this.price) return that.$util.Tips({
					title: '请输入最低价格'
				});
				if (!this.ot_price) return that.$util.Tips({
					title: '请输入最高价格'
				});
				if(this.price>=this.ot_price){
					return uni.showToast({
						title:'最低价不得超过或等于最高价',
						icon:'none'
					})
				}
				value.image = that.image
				if (!value.image) return that.$util.Tips({
					title: '请填上传封面图'
				});
				if (!value.sort) return that.$util.Tips({
					title: '请填写排序'
				});
				value.price = that.price
				value.ot_price = that.ot_price
				value.is_hot = that.is_hot
				value.is_benefit = that.is_benefit
				value.cate_id = that.category_id
				value.status = that.status
				uni.showLoading({
					title: '保存中',
					mask: true
				})
				postEditProject(that.mer_id,that.project_id,value).then(res =>{
					if(that.project_id==0){
						that.$util.Tips({
							title: '添加成功',
							icon: 'success'
						});
					}else{
						that.$util.Tips({
							title: '修改成功',
							icon: 'success'
						});
					} 
					setTimeout(function() {
						uni.navigateBack()
						// uni.navigateTo({
						// 	url: '/pages/store/admin/project?mer_id=' + that.mer_id
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

<style  lang="less" scoped>
		.block {
			background-color: #eee;
			// margin-bottom: 0;
			// padding-bottom: 107rpx;
			
			.uni-form-item{
				border-top: 1rpx solid #eee;
				background-color: #fff;
				margin-top: 0;
				.i-add{
					max-height: 100rpx;
				}
				textarea{
					height: 200px;
					width: 800rpx;
					margin: 40rpx 0;
					border: 1rpx solid #eee;
				}
			}
			.flexD{
				flex-direction: column; 
				height: 200rpx; 
				align-items: flex-start;
				justify-content: space-around;
				>view{
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
