<template>
	<!-- 商学院-详情 -->
	<view class="page school_item">
		<view class="uni-padding-wrap uni-common-mt">
			<video id="myVideo" :src="item.video_link"  @error="videoErrorCallback" enable-danmu controls></video>
		</view>
		<view class="art_title">{{item.title}}</view>
		<view v-if="item.content.content" class="title">详情</view>
		<view class='list_block'>
			<rich-text :nodes="item.content.content" class="conter"></rich-text>
				<!-- <jyf-parser :html="item.content.content.replace(/<br\/>/ig, '')" ref="article" :tag-style="tagStyle"></jyf-parser> -->
		</view>
	</view>
</template>

<script>
	let app = getApp();
	import {
		getSchoolDetail
	} from '@/api/store.js';
	export default {
		data() {
			return {
				id: 0,
				item: '',
				videoContext: '',
			}
		},
		onLoad(options) {
			if (options.hasOwnProperty('id')) {
				this.id = options.id;
			}else{
				//提示参数错误
			}
			this.getSchoolDetail(this.id);
			
		},

		methods: {
			getSchoolDetail(id){
				let that = this
				getSchoolDetail(id).then(res => {
					that.item = res.data;
					//获取视频对象
					this.videoContext = uni.createVideoContext('myVideo')
				})
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	page {
		background: #fff;
	}

	.school_item {
		background: #fff;
		.uni-padding-wrap {
			width: 100%;

			video {
				width: 100%;
			}
		}
		.art_title{
			color: #121212;
			margin: 14rpx 24rpx;
			font-size: 32rpx;
			height: 65rpx;
		}

		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #121212;
			margin: 44rpx 24rpx 24rpx 24rpx;
			text-align: center;
		}

		.list_block {
			padding: 0 24rpx;

			.block_item {
				justify-content: flex-start;
				align-items: flex-start;
				margin-bottom: 47rpx;

				image {
					flex-basis: 104rpx;
					flex-shrink: 0;
					flex-grow: 0;
					height: 80rpx;
				}

				.item_right {
					margin-left: 46rpx;

					.item-title {
						font-size: 28rpx;
						font-weight: bold;
						color: #121212;
						margin-bottom: 13rpx;
						padding-left: 20rpx;
						position: relative;
						&::after{
							content: ' ';
							position: absolute;
							top: 0;
							bottom: 0;
							left: 0;
							margin: auto;
							width: 6rpx;
							height: 20rpx;
							background: #1698AE;
						}
					}

					.item-text {
						font-size: 24rpx;
						color: #666666;
					}
				}
			}
		}
	}
</style>
