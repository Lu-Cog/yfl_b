<template>
	<!-- 首页-我的消息 -->
	<view class="page users_message tabs_body">
		<view class="tab_body flex-bt">
			<view class="tab_item flex-center" @click="changetabs(1)" :class="{active:active==1}">
				<image :src="active==1?'/static/img/msg_1s.png':'/static/img/msg_1.png'" mode="widthFix"></image>系统消息
			</view>
			<view class="tab_item flex-center" @click="changetabs(2)" :class="{active:active==2}">
				<image :src="active==2?'/static/img/msg_2s.png':'/static/img/msg_2.png'" mode="widthFix"></image>客户咨询
			</view>
		</view>
		<view class="content_body">
			<view class="content_list" v-if="active==1">
				<mynull :imgSrc="'/static/img/null.png'" :text="'暂无消息'" v-if="contentList==''"></mynull>
				<view class="list_item flex-center" v-for="(item,index) in contentList" :key="index">
					<text class="dot" :class="item.state===0?'no':'yes'"></text>
					<text class="content clamp">{{item.content}}</text>
					<text class="time">{{item.time}}</text>
					<text class="state">{{item.state===0?'未读':'已读'}}</text>
				</view>
			</view>
			<view class="content_list" v-if="active==2">
				<mynull :imgSrc="'/static/img/null.png'" :text="'暂无消息'" v-if="contentList2==''"></mynull>
				<view class="list_item flex-center" v-for="(item,index) in contentList2" :key="index">
					<text class="dot" :class="item.state===0?'no':'yes'"></text>
					<text class="content clamp">{{item.content}}</text>
					<text class="time">{{item.time}}</text>
					<text class="state">{{item.state===0?'未读':'已读'}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mynull from "../../../components/my-components/mynull.vue"
	export default {
		components: {
			mynull
		},
		data() {
			return {
				active: 1,
				imgSrc: "",
				text: "",
				contentList2: [],
				contentList: [{
						id: 1,
						content: "恭喜您注册成功，系统赠送您一张新人优惠",
						time: "2019/08/05",
						state: 0
					},
					{
						id: 2,
						content: "恭喜您注册成功，系统赠送您一张新人优惠恭喜您注册成功，系统赠送您一张新人优惠",
						time: "刚刚",
						state: 1
					}, {
						id: 2,
						content: "恭喜您注册成功，系统赠送您一张新人优惠",
						time: "2019/08/0",
						state: 1
					},
				]
			}
		},
		mounted() {

		},

		methods: {
			changetabs(active) {
				this.active = active;
			}
		},
	}
</script>

<style lang="less" scoped>
	.users_message {
		margin-top: 18px/2;

	}

	.tabs_body {
		.content_body {
			.content_list {
				.list_item {
					width: 100%;
					background: #fff;
					padding: 30px/2 30px/2;
					margin-top: 10px;
					position: relative;
					justify-content: space-between !important;
					

					.dot {
						width: 6px;
						height: 6px;
						border-radius: 50%;
						display: inline-block;

						&.no {
							background: linear-gradient(90deg, #FD7700 0%, #EA3D36 100%);
						}

						&.yes {
							background: #999999;
						}
					}

					.content {
						font-size: 28px/2;
						color: #333333;
						margin-left: 5px;
						width: 305px;
					}

					.time {
						font-size: 24px/2;
						font-weight: 500;
						color: #999999;
						min-width: 70px;
						text-align: right;
					}

					.state {
						position: absolute;
						bottom: 3px;
						right: 15px;
						margin: auto;
						font-size: 20px/2;
						font-weight: 500;
						color: #333333;
					}
				}
			}
		}

	}
</style>
