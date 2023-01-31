<template>
	<!-- 管理功能-项目管理 -->
	<view class="page admin_project">
		<view style="text-align: center; margin-top: 100rpx; color: rgb(153, 153, 153);" v-if="cardList.length==0">
			<text>暂无项目</text>
		</view>
		<view v-else class="card_block shadow_block" v-for="(item,index) in cardList" :key="index">
			<view class="banner-img">
				<image :src="item.image" mode="aspectFill"></image>
			</view>
			<view class="card_content flex-bt">
				<view class="card_left">
					<!-- 没有标签的时候 加 no-badge -->
					<view class="title clamp2">
						<!-- <image src="/static/img/badge.png" mode="widthFix"></image> -->
						<text class="text" v-if="item.is_hot&&item.is_benefit">热促</text>
						<text class="text" v-else-if="item.is_hot">热销</text>
						<text class="text" v-else-if="item.is_benefit">促销</text>
						{{item.title}}
					</view>
					<view class="flex-row flex-bt">
						<view class="price_block flex-center">
							<text class="price">¥{{$util.moneyAct(item.price)+'-'+$util.moneyAct(item.ot_price)}}</text>
						</view>
					</view>
				</view>
				<view class="card_right flex-center">
					<button hover-class="none" class="del flex-center" type="default" @click="removeProject(item.project_id,2)">删除</button>
					<button hover-class="none" class="edit flex-center" type="default" @click="editProject(item.project_id)">编辑</button>
				</view>
			</view>
		</view>
		<image class="add-btn" src="http://imgxcx.yifulai.com/jiahao.png" mode="widthFix" @click="addProject()"></image>
	</view>
</template>

<script>
	import {
		getProjectList,
		getChangeProject
	} from '@/api/store.js';
	export default {
		components: {},
		onLoad(options) {
			this.mer_id = options.mer_id
		},
		onShow() {
			this.getProjectList()
		},
		data() {
			return {
				mer_id:0,
				// cardList: [{
				// 	id: 1,
				// 	img: "http://imgxcx.yifulai.com/index_banner.jpg",
				// 	state: 0,
				// 	name: "补水护理(一般就是只清洁、补水、上面膜、头、 肩、颈按摩)",
				// 	number: 100,
				// 	rate: "40%",
				// 	price: "160.00",
				// 	dow: "28"
				// }, {
				// 	id: 2,
				// 	img: "http://imgxcx.yifulai.com/index_banner.jpg",
				// 	state: 1,
				// 	name: "补水护理222",
				// 	number: 100,
				// 	rate: "50%",
				// 	price: "160.00",
				// 	dow: "28"
				// }],
				count:0,
				cardList:[]
			}
		},
		mounted() {

		},
		methods: {
			getProjectList(){
				let that = this
				getProjectList(that.mer_id).then(res =>{
					console.log(res.data);
					that.count = res.data.count
					that.cardList = res.data.list
				})
			},
			addProject(){
				uni.navigateTo({
					url: '/pages/store/project-add/project-add?mer_id='+this.mer_id+'&project_id=0',
				})
			},
			editProject(id){
				uni.navigateTo({
					url: '/pages/store/project-add/project-add?mer_id='+this.mer_id+'&project_id='+id
				})
			},
			removeProject(id,type){
				let that = this
				getChangeProject(that.mer_id,id,{type}).then(res=>{
					that.$util.Tips({
							title: '删除成功',
							icon: 'success'
					});
				})
				this.getProjectList()
			}
		}
	}
</script>

<style lang="less" scoped>
	.admin_project {
		padding: 10px 15px;

		.add-btn {
			width: 119px/2;
			height: 119px/2;
			position: fixed;
			right: 5px;
			bottom: 70px;
		}

		.card_block {
			.flex-row {
				padding: 28rpx 0;
			}

			.banner-img {
				image {
					border-radius: 5px 5px 0px 0px;
					// width: 690px/2;
					height: 290px/2;
				}
			}

			.card_content {
				padding: 10px;

				.title {
					position: relative;
					// text-indent: 3.5em;
					display: inline-block;
					.text{
						background-color: red;
						color: #fff;
						padding: 4rpx 10rpx;
						margin-right: 20rpx;
					}
					image {
						position: absolute;
						top: 0;
						left: 0;
						width: 95px/2;
						height: 41px/2;
					}

					&.no-badge {
						text-indent: 0;

						image {
							display: none;
						}
					}
				}

				.price_block {
					font-size: 24px/2;
					color: #666666;
				}

				.card_right {
					flex-direction: column;

					button {
						width: 110px/2;
						height: 48px/2;
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
