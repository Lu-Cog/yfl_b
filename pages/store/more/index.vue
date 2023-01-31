<template>
	<!-- 首页-更多 -->
	<view class="page users_more">
		<view class="grid_body container">
			<navigator class="grid_item flex-center" hover-class="none" url="/pages/store/partner/partner">
				<view class="wimg_box flex-center">
					<image class="wimg" src="/static/img/hhr.png" mode="widthFix"></image>
				</view>
				<text class="text">店铺合伙人</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none" url="/pages/store/extend/case">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/more2.png" mode="aspectFit"></image>
				</view>
				<text class="text">成功案例</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none" :url="'/pages/store/yuYtime/yuYtime?mer_id='+mer_id">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/time.png" mode="aspectFit"></image>
				</view>
				<text class="text">预约设置</text>
			</navigator>
			<!-- <navigator class="grid_item flex-center" hover-class="none" url="/pages/store/commission/commission">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/yongjin.png" mode="aspectFit"></image>
				</view>
				<text class="text">佣金设置</text>
			</navigator> -->
			<navigator class="grid_item flex-center" hover-class="none" url="/pages/store/extend/index">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/more3.png" mode="aspectFit"></image>
				</view>
				<text class="text">推广文案</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none" :url="'/pages/store/share/share-goods?mer_id='+mer_id">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon6.png" mode="aspectFit"></image>
				</view>
				<text class="text">分享推广</text>
			</navigator>
			
			<!-- <navigator class="grid_item flex-center" hover-class="none" url="/pages/users/admin/purchase-order">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon.png" mode="aspectFit"></image>
				</view>
				<text class="text">进货订单</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none" url="/pages/purchase/index2">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon.png" mode="aspectFit"></image>
				</view>
				<text class="text">进货订单（钱包）</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none" url="/pages/users/admin/appoint">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon.png" mode="aspectFit"></image>
				</view>
				<text class="text">预约管理</text>
			</navigator> -->
			
			
			<!-- <navigator class="grid_item flex-center" hover-class="none" url="/pages/login/index">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon.png" mode="aspectFit"></image>
				</view>
				<text class="text">微信登陆授权</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none" url="/pages/form/company">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon.png" mode="aspectFit"></image>
				</view>
				<text class="text">企业认证</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none" url="/pages/wallet-pack/set-up/help-center">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon.png" mode="aspectFit"></image>
				</view>
				<text class="text">帮助中心</text>
			</navigator>
			<navigator class="grid_item flex-center" hover-class="none" url="/pages/wallet-pack/set-up/account">
				<view class="img_box flex-center">
					<image class="img" src="/static/img/index_icon.png" mode="aspectFit"></image>
				</view>
				<text class="text">账户说明</text>
			</navigator> -->
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		
		},
		data() {
			return {
				mer_id:''
			}
		},
		onLoad() {
			this.mer_id = getApp().globalData.mer_id
		},
		mounted() {
		
		},

		methods: {
			
		},
	}
</script>

<style lang="less" scoped>
	.users_more {
		.grid_body {
				display: flex;
				flex-wrap: wrap;
		
				.grid_item {
					height: 306px/3;
					width: 32.6%;
					flex-direction: column;
					background: #ffffff;
					margin-right: 5px/2;
					margin-bottom: 5px/2;
		
					&:nth-child(3n) {
						margin-right: 0;
					}
		
					position: relative;
		
					.badge {
						position: absolute;
						top: 0;
						right: 0;
						left: 20px;
						bottom: 40px;
						margin: auto;
						width: 30px/2;
						height: 30px/2;
						border: 1px solid #FF0000;
						background: #fff;
						border-radius: 10px;
						font-size: 20px/2;
						font-weight: 500;
						color: #FF0000;
						z-index: 30;
					}
		
					.img_box {
						width: 24px;
						height: 48px/2;
		
						.img {
							width: 24px;
							height: 48px/2;
						}
						
					}
					.wimg_box{
						width: 30px;
						height: 30px;
						.wimg{
							width: 30px;
							height: 30px;
						}
					}
		
					.text {
						font-size: 14px;
						font-weight: 500;
						color: #333333;
						margin-top: 10px;
					}
				}
			}
		
	}
</style>
