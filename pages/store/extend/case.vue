<template>
	<!-- 推广文案-成功案例 -->
	<view class="page extend_case">
		<view style="text-align: center; margin-top: 100rpx; color: rgb(153, 153, 153);" v-if="cardList.length==0">
			<text>暂无案例</text>
		</view>
		<view v-else class="card_block" v-for="(item,index) in cardList" :key="index">
			<view class="banner-img">
				<image :src="item.image_input" mode="widthFix"></image>
			</view>
			<view class="card_content flex-bt">
				<view class="card_left">
					<!-- 没有标签的时候 加 no-badge -->
					<view class="title clamp2">{{item.content}}</view>
					<view class="time">时间：{{item.create_time}}</view>
				</view>
				<view class="card_right flex-center">
					<button hover-class="none" class="del flex-center" type="default" @click.stop="dalectCase(item.article_id)">删除</button>
					<button hover-class="none" class="edit flex-center" type="default"
						@click="goto('/pages/store/extend/case-edit?article_id='+item.article_id)">编辑</button>
				</view>
			</view>
		</view>
		<image class="add-btn" src="/static/img/jiahao.png" mode="widthFix" @click.stop="goto('/pages/store/extend/case-edit')"></image>
	</view>
</template>

<script>
	import {getCasesList,getCasesDelete} from '@/api/api.js'
	export default {
		components: {},
		data() {
			return {
				cardList: [],
				mer_id:'',
			}
		},
		onLoad() {
			this.mer_id = getApp().globalData.mer_id
			this.getCasesList()
		},
		onShow() {
			this.getCasesList()
		},
		mounted() {

		},
		methods: {
			dalectCase(id){
				let that = this
				getCasesDelete(this.mer_id,id).then(res=>{
					that.getCasesList()
				})
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			getCasesList(){
				let that = this
				let data = {
					page:1,
					limit:10
				}
				getCasesList(that.mer_id,data).then(res=>{
					this.cardList = res.data.list
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.extend_case {
		padding: 10px 15px;

		.add-btn {
			width: 119px/2;
			height: 119px/2;
			position: fixed;
			right: 5px;
			bottom: 70px;
		}

		.card_block {
			box-shadow: 0px 5px/2 6px/2 0px rgba(193, 227, 255, 0.24);

			.flex-row {
				padding: 14px 0;
			}

			.banner-img {
				image {
					border-radius: 5px 5px 0px 0px;
					width: 100%;
					height: 290px/2;
				}
			}

			.card_content {
				padding: 10px;

				.title {
					position: relative;
				}

				.time {
					font-size: 24px/2;
					color: #999999;
					margin-top: 37px/2;
				}

				.price_block {
					font-size: 24px/2;
					color: #666666;
				}

				.card_right {
					flex-direction: column;
					margin-left: 10px;

					button {
						width: 145px/2;
						height: 58px/2;
						border-radius: 24px/2;
						font-weight: 500;
						font-size: 28px/2;
						border: 1px solid #1698AE;

						&.del {
							color: #1698AE;
							margin-bottom: 42px/2;
						}

						&.edit {
							background: #1698AE;
							color: #fff;
						}
					}
				}
			}

		}
	}
</style>
