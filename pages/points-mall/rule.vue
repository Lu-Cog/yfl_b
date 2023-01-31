<template>
	<!-- 积分商城-积分规则 -->
	<view class="page points-mall_rule">
		<view class="title">积分商城是什么？</view>
		<view class="content"> 积分商城是什么？ 积分商城是给用户给予的优惠，用户在使用交租服务后可获得同比例的积分，该积分可用于兑换积分商城物品。</view>
		<view class="title">怎么获得积分？</view>
		<view class="content">即日起，凡是使用积分商城的用户，并通过平台完成交租功能就可获得，单笔积分无上限</view>
		<view class="content">① 积分将在用户完成兑换交易后获得</view>
		<view class="content">② 积分值=兑换金额 1/10（即1000元=100分）</view>
		<view class="content">③ 提前交兑换，积分翻倍</view>
		<view class="content">④ 提前4天及以上，享受4倍积分</view>
		<view class="content">⑤ 提前1~3天，享受2倍积分</view>
		<view class="content">⑥ 当天，享受1倍积分</view>
		<view class="content">⑦ 连续三个月准时（签到)，再奖励400积分</view>
		<view class="content">⑧ 生日当天赠送200积分</view>
		<view class="content">⑨ 延时兑换，不赠送积分。</view>
		<view class="title">积分多久能生效？</view>
		<view class="content">正常情况下，积分将在兑换成功后2个小时内到账，</view>
		<view class="title">积分的使用期限？</view>
		<view class="content">从获取积分开始，积分有效期为两年。</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.points-mall_rule {
		padding: 15px 12px;

		.title {
			font-size: 16px;
			font-weight: bold;
			color: #1698AE;
			margin-bottom: 10px;
			position: relative;
			padding-left: 15px;

			&::after {
				position: absolute;
				content: ' ';
				top: 0;
				bottom: 0;
				left: 0;
				margin: auto;
				width: 5px;
				height: 16px;
				background: #1698AE;
			}
		}

		.content {
			font-size: 14px;
			color: #000000;
			line-height: 30px;
		}
	}
</style>
