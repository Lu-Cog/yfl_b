<template>
	<!-- 客户-客户详情 -->
	<view class="page customer-item">
		<view class="shadow_block">
			<view class="top_body flex-center">
				<image class="user-img" :src="item.avatar?item.avatar:'http://imgxcx.yifulai.com/25daf202103051426232787.png'" mode="aspectFill"></image>
				<image class="badge-img" src="/static/img/badge2.png"></image>
			</view>
			<view class="title">基本信息</view>
			<uni-list class="u_list">
				<uni-list-item @click='goEdit()' link to="">
					<template slot="header">
						<view class="header">
							<text class="name">姓名</text><text class="mid">{{item.real_name!=null?item.real_name:"暂未设置"}}</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template slot="header">
						<view class="header">
							<text class="name">电话</text><text class="mid">{{item.phone_star}}</text>
							<image class="phone" src="/static/img/cus_call_s.png" @click="phoneCall(item.phone)" mode="widthFix"></image>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item link to="">
					<template slot="header">
						<view class="header">
							<text class="name">标签</text><text class="red">{{item.group_name}}</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item @click='goEdit()' link to="">
					<template slot="header">
						<view class="header">
							<text class="name">备注</text><text class="mid">{{item.mark}}</text>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="shadow_block">
			<view class="header">
				<view class="title">生日提醒</view>
				<switch color="#1698ae" @change="switchChange" style="transform:scale(0.7);margin-bottom: 40rpx;"/>
			</view>
			<view class="flex-row" @click='goEdit()'>
				<text class="name">生日</text><text class="mid">{{item.birthday}}</text>
			</view>
			<!-- <view class="flex-row flex-bt" >
				<text class="mid">开启生日提醒（提前1天收到通知）</text>
			</view> -->
		</view>
		<view class="shadow_block" >
			<view class="title flex-bt">客户档案
				<!-- <view class="more flex-center">
					更多<image src="/static/img/jiantou_left.png" mode="widthFix"></image>
				</view> -->
			</view>
			<view class="archives_list">
				<view class="list_item" v-for="(item,index) in archivesList" :key='index' @click="gefileMan(item.id)">
					<view class="item_top flex-bt">
						<view class="left_block flex-center">
							<image :src="item.image_author" mode="aspectFill"></image>
							<text class="name clamp">项目：{{item.store_name}}</text>
						</view>
						<view class="right_block">{{item.create_time}}</view>
					</view>
					<view class="item_imgblock flex-bt" v-for="(value,key) in item.image_input">
						<image :src="value" mode="aspectFill"></image>
					</view>
					<view class="item_content clamp3">{{item.content}}</view>
					<view class="hr"></view>
				</view>
				<view class="button">
					<navigator :url="'/pages/store/fileManagement/fileManagement?uid='+item.uid">添加档案</navigator>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	import {
		getArchivesList
	} from '@/api/api.js'
	import {
		getUserDetail
	} from '@/api/user.js';
	
	export default {
		data() {
			return {
				item:{},
				mer_id:'',
				archivesList:[],
			}
		},
		onLoad(options) {
			this.mer_id = app.globalData.mer_id
			console.log(options);
			if (options.hasOwnProperty('id')) {
				this.id = options.id;
			}
		},
		onShow(){
			this.getUserDetail();
		},
		methods: {
			goEdit(){
				uni.navigateTo({
					url:'/pages/store/user-edit?real_name='+this.item.real_name+'&phone='+this.item.phone_star+'&mark='+this.item.mark+'&birthday='+this.item.birthday+'&uid='+this.item.uid+'&nickname='+this.item.nickname
				})
			},
			gefileMan(id){
				uni.navigateTo({
					url:'/pages/store/fileManagement/fileManagement?id='+id+'&uid='+this.item.uid
				})
			},
			switchChange(e) {
				uni.showToast({
					title:'设置成功',
					icon:'none'
				})
				console.log('switch2 =', e.target.value)
			},
			getArchivesList(){
				let data = {
					uid:this.item.uid,
					page:1,
					limit:100
				}
				getArchivesList(this.mer_id,data).then(res=>{
					this.archivesList = res.data.list
				})
			},
			getUserDetail(){
				let that = this;
				getUserDetail(that.id).then(res => {
					that.item = res.data;
					//设置生日
					if(!that.item.birthday){
						that.item.birthday = "暂未设定";
					}
					this.getArchivesList()
				})
			},
			phoneCall(tel){
				if(!tel){
					uni.showToast({
						title: '用户暂未绑定手机',
						icon:'none',
						duration: 1000
					});
					return;
				}
				uni.makePhoneCall({
				    phoneNumber: tel //仅为示例
				});
			}
		}
	}
</script>

<style lang="less">
	.button{
		width: 100%;
		text-align: center;
		navigator{
			padding: 20rpx 80rpx;
			background: #1698AE;
			color: #fff;
		}
	}
	.phone{
		position: absolute;
		right: 10px;
	}
	.customer-item {
		padding-bottom: 20rpx;
		.shadow_block {
			background: #fff;
			margin: 20rpx 30rpx;
			margin-bottom: 0;
			padding: 44rpx 29rpx;
			.header{
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.title {
				font-size: 34rpx;
				font-weight: bold;
				color: #323C4F;
				position: relative;
				margin-bottom: 40rpx;

				&::after {
					position: absolute;
					content: ' ';
					left: -12rpx;
					top: 0;
					bottom: 0;
					margin: auto;
					width: 6rpx;
					height: 33rpx;
					background: #1698AE;
				}

				.more {
					font-size: 26rpx;
					color: #999999;
					padding: 0 20rpx;

					font-weight: 400;

					image {
						width: 28rpx;
						height: 28rpx;
						// margin-left: 8px;
					}
				}
			}

				position: relative;
			.top_body {

				.user-img {
					width: 212rpx;
					height: 212rpx;
					border-radius: 50%;
					margin-bottom: 73rpx;
				}

				.badge-img {
					position: absolute;
					right: -20rpx;
					top: 37rpx;
					width: 167rpx;
					height: 72rpx;
				}
			}

			.name {
				font-size: 28rpx;
				font-weight: 500;
				color: #323C4F;
				margin-right: 32rpx;
			}

			.mid {
				font-size: 32rpx;
				font-weight: 500;
				color: #999999;
			}

			.red {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FF9300;
			}

			.u_list {
				.uni-list--border-bottom {
					display: none !important;
				}

				.header {
					.name {
						font-size: 28rpx;
						font-weight: 500;
						color: #323C4F;
						margin-right: 32rpx;
					}

					.mid {
						font-size: 32rpx;
						font-weight: 500;
						color: #999999;
					}

					image {
						width: 36rpx;
						height: 36rpx;
						margin-left: 34rpx;
					}
				}
			}

			.flex-row {
				margin-bottom: 32rpx;

				&:last-child {
					margin-bottom: 0;
				}
			}

			.uni-switch-input {
				margin-left: 0;
			}
		}

		.archives_list {
			.list_item {
				.item_top {
					.left_block {
						justify-content: flex-start;

						image {
							width: 50rpx;
							flex-basis: 50rpx;
							height: 50rpx;
							flex-grow: 0;
							flex-shrink: 0;
							border-radius: 50%;
						}

						.name {
							font-size: 28rpx;
							font-weight: bold;
							color: #323C4F;
							margin-left: 11rpx;
						}
					}

					.right_block {
						font-size: 26rpx;
						color: #999999;
					}
				}

				.item_imgblock {
					flex-wrap: wrap;
					padding: 40rpx;
					padding-bottom: 20rpx;

					image {
						width: 265rpx;
						height: 172rpx;
						margin-bottom: 20rpx;
					}
				}

				.item_content {
					font-size: 24rpx;
					font-weight: 500;
					color: #999999;
					line-height: 40rpx;
				}

				.hr {
					width: 100%;
					margin: 30rpx 0;
				}
			}
		}
	}
</style>
