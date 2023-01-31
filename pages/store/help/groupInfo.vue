<template>
	<!-- 管理功能-预约管理 -->
	<view class="page admin_appoint  tabs_body">
		<view class="tab_body flex-bt">
			<view class="tab_item flex-center" @click="changetabs(1)" :class="{active:active==1}">全部</view>
			<view class="tab_item flex-center" @click="changetabs(2)" :class="{active:active==2}">拼团中 </view>
			<view class="tab_item flex-center" @click="changetabs(3)" :class="{active:active==3}">拼团成功</view>
			<view class="tab_item flex-center" @click="changetabs(4)" :class="{active:active==4}">拼团失败</view>
		</view>
		<view class="content_body">
			<view class="content_list customer_list">
				<view class="no" v-if="qddList.length==0">
					暂无订单
				</view>
				<view v-else class="list_item" v-for="(item,index) in qddList" :key="index">
					<view class="flex-bt" @click="changeShow(item.product_assist_set_id)">
						<image class="item_user" :src="item.avatar" mode="aspectFill"></image>
						<view class="item_mid flex-center">
							<view class="content clamp">
								<text class="fristText">{{item.nickname}}</text><text class="lastText">{{item.status_tip}}</text>
							</view>
							<text class="phone">{{item.phone}}</text>
							<text class="phone">{{item.num_tip}}</text>
							<text class="phone">结束日期：{{item.end_time}}</text>
						</view>
						<view class="button_block flex-center">
							<image class="item_call" src="/static/img/cus_call.png" mode=""
								@click.stop="phoneCall(item.phone)"></image>
								
							<button v-if="item.status==1" hover-class="none" class="flex-center yes" @click.stop="check(item.product_assist_set_id)">取消拼团</button>
						</view>
					</view>
					<view class="lists flex-center" v-for="(value,key) in item.list" :key="key" v-if="item.product_assist_set_id==set_id">
						<image class="item_user" :src="value.avatar" mode="aspectFill"></image>
						<view class="item_mid flex-center">
							<text class="content clamp">{{value.nickname}}</text>
							<text class="phone">{{value.phone}}</text>
						</view>
						<view class="button_block flex-center">
							<image class="item_call" src="/static/img/cus_call.png" mode=""
								@click="phoneCall(value.phone)"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getpddList,
		getpddCancel
	} from '@/api/store.js'
	import mynull from "../../../components/my-components/mynull.vue"
	export default {
		components: {
			mynull
		},
		data() {
			return {
				active: 1,
				qddList: [],
				mer_id: '',
				assist_id: '',
				set_id:''
			}
		},
		onLoad(options) {
			this.assist_id = options.id
			this.mer_id = getApp().globalData.mer_id
			this.getpddList()

		},
		mounted() {

		},
		methods: {
			changeShow(id){
				this.set_id = id
			},
			phoneCall(tel) {
				if (!tel) {
					uni.showToast({
						title: '用户暂未绑定手机',
						icon: 'none',
						duration: 1000
					});
					return;
				}
				uni.makePhoneCall({
					phoneNumber: tel //仅为示例
				});
			},
			check(id) {
				let that = this
				let data = {
					product_assist_id: that.assist_id,
					product_assist_set_id: id
				}
				uni.showModal({
					content:'是否取消？',
					success(res) {
						if(res.confirm){
							getpddCancel(data).then(res => {
								that.getpddList()
							})
						}
					}
				})
				
			},
			getpddList() {
				let status = ''
				switch (this.active) {
					case 1:
						status = 0
						break;
					case 2:
						status = 1
						break;
					case 3:
						status = 2
						break;
					case 4:
						status = -1
						break;
					default:
						status = ''
				}
				let data = {
					status: status,
					product_assist_id:this.assist_id
				}
				getpddList(data).then(res => {
					this.qddList = res.data
				})
			},
			changetabs(active) {
				this.active = active;
				this.getpddList()
			}
		}
	}
</script>

<style lang="less" scoped>
	.lists{
		padding: 0 30rpx;
		background-color: #eee;
		margin-bottom: 10rpx;
		border-radius: 20rpx;
		.item_user{
			width: 40px;
			height: 40px;
		}
	}
	.item_call{
		width: 35px;
		height: 35px;
	}
	.no {
		text-align: center;
		color: #999;
		margin-top: 100rpx;
	}

	.admin_appoint {
		.tab_body {
			top: 0
		}

		.content_body {
			margin-top: 10px;

			.list_item {
				box-shadow: 0px 5px/2 6px/2 0px rgba(193, 227, 255, 0.24);
				padding-top: 35px/2;
				padding-bottom: 15px/2;
			}

			.content {
				margin: 8px 0;
				width: 320rpx;
				display: flex;
				align-items: center;
				.fristText {
					flex: 1;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					
				}
				.lastText{
					width: 31%;
					color: #fff;
					text-align: center;
					background: #1698AE;
					border-radius: 20rpx;
					font-size: 24rpx;
					padding: 0 20rpx;
				}
			}

			.phone {
				margin: 6rpx 0;
			}
		}

		.hr {
			margin: 32px/2 0 19px/2;
		}

		.button_block {
			button {
				width: 60px;
			}
		}
	}
</style>
