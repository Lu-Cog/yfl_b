<template>
	<!-- 进货-首页 -->
	<view class="page page_purchase">
		<image v-if='act_open==1 || act_open==2' :src="img111" mode="widthFix" style="width: 100%;" @click="goNew()">
		</image>
		<view class="search">
			<view class="search_body">
				<image src="/static/img/search.png" mode="widthFix"></image>
				<input type="text" v-model="search" placeholder="请输入商品名称搜索" confirm-type="search" @input="searchInput"
					@confirm="getCategoryList()" />
			</view>
			<view class="searchView" v-if="closeShow" @click="closeInput">
				<image src="../../static/img/close_l.png" mode="widthFix"></image>
			</view>
		</view>
		<!-- <view class="notice_body">
			<view class="notice_title flex-bt">
				<view class="title_left">
					<image src="/static/img/gonggao.png" mode="widthFix"></image>商家优惠信息
				</view>
				<view class="title_right" @click="noticeOpen(isShow)">
					<view v-if="youhuiList.length!=0">
						共{{youhuiList.length}}个优惠
						<image :src="isShow?'/static/img/jiantou2.png':'/static/img/jiantou1.png'" mode="widthFix">
						</image>
					</view>
					<view v-else>
						暂无优惠
					</view>
				</view>
			</view>
			<view class="notice_list" v-show="isShow">
				<view class="list_item clamp" v-for="(item,index) in youhuiList" :key="index">
					<text class="badge">{{item.active_type_tip}}</text>{{item.title}}
				</view>
			</view>
		</view> -->
		<!-- <view class="title">
			活动产品<image class="red-i" src="/static/img/red.png" mode="widthFix"></image><text
				class="red_title">热销</text><text class="red_content">品牌活动进行中，马上就要抢光了</text>
		</view> -->
		<category :defaultActive='defaultActive' :categoryList="categoryList" v-on:pjoinCart="joinCart"
			:subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick"
			@categorySubClick="categorySubClick"></category>

		<view class="goods_nav flex-bt">
			<view class="left_block flex-center">
				<view class="cart_block" @click="goUrl()">
					<image src="/static/img/cart.png" mode="widthFix"></image>
					<uni-badge class="badge" :text="cartNum" type="error" :inverted="false"></uni-badge>
				</view>
				<text class="price">¥{{cartPrice}}</text>
				<!-- <text class="old_price">¥0</text> -->
			</view>
			<button type="default" @click="goUrl()" class="right_btn flex-center">下一步</button>
		</view>

		<!-- 组件 -->
		<productWindow :attr="attr" :isShow='1' :iSplus='1' :buyProId="buyProId" :isAddCart='1' @myevent="onMyEvent"
			@ChangeAttr="ChangeAttr" @ChangeCartNum="ChangeCartNum" v-on:pjoinCart="joinCart" @attrVal="attrVal"
			@iptCartNum="iptCartNum" @goCat="goCatNew" id='product-window'></productWindow>

	</view>
</template>

<script>
	let app = getApp();
	import productWindow from '@/components/productWindow';
	import category from "../../components/qiyue-category/qiyue-category.vue"
	import {
		getCartList
	} from '@/api/order.js';
	import {
		getProductDetail,
		postCartAdd
	} from '@/api/store.js';
	import {
		getCategoryList,
		getYhList
	} from '@/api/store.js';
	export default {
		components: {
			category,
			productWindow
		},
		data() {
			return {
				img111: '',
				act_11: '',
				defaultActive: 0,
				cartNum: 0,
				cartPrice: 0,
				cartPriceDec: 0,
				youhuiList: [],
				categoryList: [],
				subCategoryList: [],
				isShow: false, // 公告展示状态 true展示 false不展示

				attrTxt: '请选择', //属性页面提示
				attrValue: '', //已选属性
				storeInfo: {
					merchant: {}
				}, //商品详情
				productValue: [], //系统属性
				cart_num: 1, //购买数量
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				isOpen: false, //是否打开属性组件
				source: '',
				// storeSelfMention: true,
				posters: false,
				// weixinStatus: false,
				buyProId: 0, //当前购买产品ID
				attr: {
					cartAttr: false,
					productAttr: [],
					productSelect: {},
					now_buy: 0
				},
				navH: "",
				navList: [],
				opacity: 0,
				scrollY: 0,
				topArr: [],
				toView: '',
				height: 0,
				heightArr: [],
				lock: false,
				search: '',
				closeShow: false,
				act_open: '',
				price_mult: ''
			}
		},

		onLoad(options) {
			this.getCategoryList();
			this.getYhList();
			// this.getGoodsDetails();

		},
		onShow() {
			// if(app.globalData.act_11==1){
			// 	uni.navigateTo({
			// 		url:'/pages/index/new'
			// 	})
			// }
			this.act_open = uni.getStorageSync('act_open')
			this.img111 = uni.getStorageSync('img111')
			this.getCartList();
		},
		//上拉刷新
		onPullDownRefresh() {

			// this.$category.setCategoryFirst.completeTask();

			this.getCategoryList();
			this.getYhList();
			this.getCartList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 600);
		},

		methods: {
			closeInput() {
				this.search = ''
				this.closeShow = false
				this.getCategoryList()
			},
			searchInput() {
				if (this.search) {
					this.closeShow = true
				} else {
					this.closeShow = false
				}
			},
			goNew() {
				uni.navigateTo({
					url: '/pages/index/new'
				})
			},
			iptCartNum(num) {
				this.$set(this.attr.productSelect, "cart_num", num);

			},
			/**
			 * 获取产品详情
			 * 
			 */
			getGoodsDetails: function(id) {
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				getProductDetail(id).then(res => {
					uni.hideLoading();
					let storeInfo = res.data;
					that.$set(that, 'storeInfo', storeInfo);
					that.$set(that, 'buyProId', id);
					that.$set(that, 'price_mult', res.data.price_mult);
					that.$set(that.attr, 'productAttr', res.data.attr);
					that.$set(that.attr, 'now_buy', res.data.now_buy);
					that.$set(that, 'productValue', res.data.sku);
					// that.$set(that, 'storeSelfMention', res.data.store_self_mention);
					// that.$set(that, 'activity', res.data.activity ? res.data.activity : []);

					setTimeout(function() {
						that.infoScroll();
					}, 500);
					that.DefaultSelect();
				}).catch(err => {
					//状态异常返回上级页面
					return that.$util.Tips({
						title: err
					}, {
						tab: 3,
						url: 1
					});
				})

			},
			onMyEvent: function() {
				this.$set(this.attr, 'cartAttr', false);
				this.$set(this, 'isOpen', false);
			},

			infoScroll: function() {
				var that = this,
					topArr = [],
					heightArr = [];
				for (var i = 0; i < that.navList.length; i++) { //productList
					//获取元素所在位置
					var query = uni.createSelectorQuery().in(this);
					var idView = "#past" + i;
					// if (!that.data.good_list.length && i == 2) {
					//   var idView = "#past" + 3;
					// }
					query.select(idView).boundingClientRect();
					query.exec(function(res) {
						var top = res[0].top;
						var height = res[0].height;
						topArr.push(top);
						heightArr.push(height);
						that.$set(that, 'topArr', topArr);
						that.$set(that, 'heightArr', heightArr);
					});
				};
			},
			/**
			 * 默认选中属性
			 * 
			 */
			DefaultSelect: function() {
				let productAttr = this.attr.productAttr;
				let value = [];
				let arr = []
				let unSortArr = []
				// this.attr.productAttr.forEach((item,index)=>{
				// 	arr.push(item.attr_values[0])
				// })
				// // 默认选中未排序 改变unSortArr数组原始对象指向
				// unSortArr = unSortArr.concat(arr)
				// // 默认选中排序
				// arr = arr.sort().join(',')
				// // for(let i; i<unSortArr.length;i++){

				// // }	

				for (var key in this.productValue) {
					if (this.productValue[key].stock > 0) {
						value = this.attr.productAttr.length ? key.split(",") : [];
						break;
					}
				}
				// for (let i = 0; i < productAttr.length; i++) {
				// 	this.$set(productAttr[i], "index", value[i]);
				// }

				//sort();排序函数:数字-英文-汉字；
				let productSelect = this.productValue[value.join(",")];
				if (productSelect && productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeInfo.store_name
					);
					this.$set(this.attr.productSelect, "image", productSelect.image ? productSelect.image : this
						.storeInfo.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);

					this.$set(this, "attrValue", value.join(","));
					this.$set(this, "attrTxt", "已选择");
					if (productSelect.stock == 0) {
						this.$set(this.attr.productSelect, "cart_num", 0);
					} else {
						this.$set(this.attr.productSelect, "cart_num", 1);
					}
				} else if (!productSelect && productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeInfo.store_name
					);
					this.$set(this.attr.productSelect, "image", this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", this.storeInfo.price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", "");
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "请选择");
				} else if (!productSelect && !productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeInfo.store_name
					);
					this.$set(this.attr.productSelect, "image", this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", this.storeInfo.price);
					this.$set(this.attr.productSelect, "stock", this.storeInfo.stock);
					this.$set(
						this.attr.productSelect,
						"unique",
						this.storeInfo.unique || ""
					);
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "请选择");
				} else if (productSelect && !productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeInfo.store_name
					);
					this.$set(this.attr.productSelect, "image", productSelect.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);

					this.$set(this, "attrValue", value.join(","));
					this.$set(this, "attrTxt", "已选择");
					if (productSelect.stock == 0) {
						this.$set(this.attr.productSelect, "cart_num", 0);
					} else {
						this.$set(this.attr.productSelect, "cart_num", 1);
					}
				}
			},

			/**
			 * 购物车数量加和数量减
			 * 
			 */
			ChangeCartNum: function(changeValue) {
				//changeValue:是否 加|减
				//获取当前变动属性
				let productSelect = this.productValue[this.attrValue];
				//如果没有属性,赋值给商品默认库存
				if (productSelect === undefined && !this.attr.productAttr.length)
					productSelect = this.attr.productSelect;
				//无属性值即库存为0；不存在加减；
				if (productSelect === undefined) return;
				let stock = productSelect.stock || 0;
				let num = this.attr.productSelect;
				if (changeValue) {
					if (this.price_mult == 1) {
						if (num.cart_num < 5) {
							num.cart_num++;
						} else if (num.cart_num < 10) {
							num.cart_num += 5;
						} else if (num.cart_num < 50) {
							num.cart_num += 40;
						} else {
							num.cart_num += 50;
						}
					} else if (this.price_mult == 2) {
						if (num.cart_num < 10) {
							num.cart_num++;
						} else if (num.cart_num < 50) {
							num.cart_num += 40;
						} else {
							num.cart_num += 50;
						}
					} else {
						num.cart_num++;
					}

					if (num.cart_num > stock) {
						this.$set(this.attr.productSelect, "cart_num", stock);
						this.$set(this, "cart_num", stock);
					}
				} else {
					if (this.price_mult == 1) {
						if (num.cart_num <= 5) {
							num.cart_num--
						} else if (num.cart_num <= 10) {
							num.cart_num -= 5;
						} else if (num.cart_num <= 50) {
							num.cart_num -= 40;
						} else {
							num.cart_num -= 50;
						}
					} else if (this.price_mult == 2) {
						if (num.cart_num <= 10) {
							num.cart_num--;
						} else if (num.cart_num <= 50) {
							num.cart_num -= 40;
						} else {
							num.cart_num -= 50;
						}
					} else {
						num.cart_num--;
					}
					if (num.cart_num < 1) {
						this.$set(this.attr.productSelect, "cart_num", 1);
						this.$set(this, "cart_num", 1);
					}
				}
			},

			attrVal(val) {
				this.$set(this.attr.productAttr[val.indexw], 'index', this.attr.productAttr[val.indexw].attr_values[val
					.indexn]);
			},
			/**
			 * 属性变动赋值
			 * 
			 */
			ChangeAttr: function(res) {
				let productSelect = this.productValue[res];
				if (productSelect && productSelect.stock > 0) {
					this.$set(this.attr.productSelect, "image", productSelect.image ? productSelect.image : this
						.storeInfo.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", res);
					this.$set(this, "attrTxt", "已选择");
				} else {
					this.$set(this.attr.productSelect, "image", this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", this.storeInfo.price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", "");
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "请选择");
				}
			},
			/**
			 * 打开属性加入购物车
			 * 
			 */
			joinCart: function(id = 0, e) {
				console.log(id);
				if (id && id > 0) {
					this.getGoodsDetails(id);
				}

				//是否登录
				if (this.isLogin === false) {
					// #ifdef H5 || APP-PLUS
					toLogin();
					// #endif
					// #ifdef MP
					this.$set(this, 'isAuto', true);
					this.$set(this, 'isShowAuth', true)
					// #endif
				} else {
					this.goCat(id);
				}
			},
			goCatNew() {
				this.goCat(this.buyProId, true)
			},
			/*
			 * 加入购物车
			 */
			goCat: function(id, news) {
				let that = this,
					productSelect = that.productValue[this.attrValue];
				//打开属性
				if (that.attrValue) {
					//默认选中了属性，但是没有打开过属性弹窗还是自动打开让用户查看默认选中的属性
					that.attr.cartAttr = !that.isOpen ? true : false;
				} else {
					if (that.isOpen) that.attr.cartAttr = true;
					else that.attr.cartAttr = !that.attr.cartAttr;

				}
				//只有关闭属性弹窗时进行加入购物车
				if (that.attr.cartAttr === true && that.isOpen === false)
					return (that.isOpen = true);
				//如果有属性,没有选择,提示用户选择
				for (let i = 0; i < that.attr.productAttr.length; i++) {
					if (!that.attr.productAttr[i].index) {
						that.isOpen = true;
						that.attr.cartAttr = true;
						return setTimeout(() => {
							that.$util.Tips({
								title: "请选择规格"
							})
						}, 100)
					}
				}

				if (
					that.attr.productAttr.length &&
					that.isOpen === true &&
					productSelect == undefined
				) {
					that.isOpen = true;
					that.attr.cartAttr = true;
					return setTimeout(() => {
						that.$util.Tips({
							title: "产品库存不足"
						})
					}, 100)
				} else if (that.attr.productSelect.cart_num == 0) {
					that.isOpen = true;
					that.attr.cartAttr = true;
					return setTimeout(() => {
						that.$util.Tips({
							title: '请选择购买数量'
						})
					}, 100)
				}
				let q = {
					is_new: news === undefined ? 0 : 1,
					product_id: id,
					cart_num: that.attr.productSelect.cart_num,
					product_attr_unique: that.attr.productSelect !== undefined ? that.attr.productSelect.unique :
						"",
					source: this.source,
					product_type: 0
				};
				postCartAdd(q).then(function(res) {
					that.isOpen = false;
					that.attr.cartAttr = false;
					if (news) {
						uni.navigateTo({
							url: '/pages/users/order_confirm/index?cartId=' + res.data.cart_id
						});
					} else {
						return that.$util.Tips({
							title: "添加购物车成功",
							success: () => {
								that.getCartList();
							}
						});
					}
				}).catch(res => {
					that.isOpen = false;
					return that.$util.Tips({
						title: res
					});
				});
			},

			// 购物车列表(计算总数量与金额)
			getCartList: function() {
				let that = this;
				let cartNum = 0;
				let cartMoney = 0;
				getCartList().then(res => {
					res.data.list.forEach((item, index) => {
						item.list.forEach((goods, j) => {
							cartMoney += goods.productAttr.price * goods.cart_num;
							cartNum += goods.cart_num;
						})
					})
					that.cartNum = cartNum;
					that.cartPrice = cartMoney;
				});

			},
			getCategoryList() {
				let that = this
				let data = {
					keyword: this.search
				}
				uni.showLoading({
					title: '加载中'
				})
				getCategoryList(data).then(res => {
					uni.hideLoading()
					that.categoryList = res.data;
					that.subCategoryList = that.categoryList[0].list;
					this.defaultActive = 0
				})
			},
			getYhList() {
				let that = this
				getYhList().then(res => {
					that.youhuiList = res.data;
				})
			},
			categoryMainClick(category, index) {
				this.subCategoryList = category.list;
				this.defaultActive = index
			},
			categorySubClick(category) {
				console.log(category);
				uni.navigateTo({
					url: "./goods-item"
				})
			},

			// 优惠信息展开状态
			noticeOpen(isShow) {
				this.isShow = !this.isShow;
			},

			// 结算弹框
			popupOpen(isOpen) {
				// this.isOpen = !this.isOpen;
			},
			//跳转购物车
			goUrl() {
				uni.navigateTo({
					url: '/pages/order_addcart/order_addcart'
				})
			}
		},
	}
</script>
<style lang="less" scoped>
	.search {
		.search_body {
			border-radius: 20rpx;
			width: 100%;
			background-color: #fff;
			display: flex;
			align-items: center;

			image {
				width: 40rpx;
				height: 40rpx;
				margin: 0 20rpx;
			}
		}

		padding: 20rpx;
		position: relative;
		z-index: 1;

		input {
			background-color: #fff;
			margin: 4rpx 60rpx 4rpx 0;
			height: 80rpx;
			border-radius: 10rpx;
			flex: 1;
		}

		.searchView {
			position: absolute;
			top: 50%;
			right: 20rpx;
			transform: translateY(-50%);
			// background-color: #eee;
			z-index: 2;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 32rpx;
				margin: 30rpx 20rpx;
			}
		}

	}

	.page_purchase {
		padding-bottom: 112rpx;

		.notice_body {
			margin: 10rpx 0;
			background: #fff;
			padding-top: 27rpx;
			padding-left: 29rpx;
			padding-right: 55rpx;
			padding-bottom: 10rpx;

			.notice_title {
				margin-bottom: 25rpx;

				.title_left {
					image {
						margin-right: 15rpx;
						width: 39rpx;
						height: 29rpx;
					}

					font-size: 34rpx;
					font-weight: bold;
					color: #333333;
				}

				.title_right {
					font-size: 28rpx;
					font-weight: 500;
					color: #999999;

					image {
						width: 19rpx;
						height: 12rpx;
						margin-left: 15rpx;
					}

					.is_show {
						// transform: (180deg);
					}
				}
			}

			.notice_list {
				.list_item {
					margin-bottom: 14rpx;
					font-size: 24rpx;
					color: #666666;

					.badge {
						min-width: 126rpx;
						height: 36rpx;
						line-height: 36rpx;
						padding: 0 15rpx;
						background-color: #ee502f;
						border-radius: 10px 0 10px 0;
						font-size: 24rpx;
						font-weight: 500;
						font-style: italic;
						color: #FFFFFF;
						margin-right: 24rpx;
					}
				}
			}
		}

		.title {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
			height: 51rpx;
			line-height: 51rpx;
			padding-left: 24rpx;
			position: relative;
			margin: 32rpx 0 17rpx;

			&::before {
				content: " ";
				position: absolute;
				top: 0;
				left: 0;
				width: 6rpx;
				height: 51rpx;
				background: #1698AE;
			}

			.red-i {
				width: 18rpx;
				height: 21rpx;
				margin-left: 48rpx;
			}

			.red_title {
				margin-left: 8rpx;
				font-size: 30rpx;
				font-weight: bold;
				color: #333333;
			}

			.red_content {
				font-size: 24rpx;
				font-weight: 500;
				color: #999999;
				margin-left: 20rpx;
			}
		}

		.goods_nav {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 112rpx;
			background: #efefef;

			.left_block {
				margin-left: 34rpx;

				.cart_block {
					position: relative;

					image {
						width: 100rpx;
						height: 100rpx;
					}

					.badge {
						position: absolute;
						right: 0;
						top: 0;
					}
				}

				.price {
					margin-left: 20rpx;
					font-size: 44rpx;
					font-weight: bold;
					color: #FF002B;
				}

				.old_price {
					margin-left: 14rpx;
					font-size: 28rpx;
					font-weight: 500;
					text-decoration: line-through;
					color: #999999;
				}
			}

			.right_btn {
				width: 240rpx;
				height: 100%;
				background: #1698AE;
				font-size: 30rpx;
				font-weight: 500;
				color: #FFFFFF;
				border-radius: 0;
			}

		}

		.popup_blcok {
			width: 100%;
			background: #FFFFFF;
			z-index: 5;
			position: fixed;
			bottom: 112rpx;
			left: 0;


			.top {
				width: 100%;
				height: 60rpx;
				background: #FEF8D8;
				font-size: 24rpx;
				font-weight: bold;
				color: #BF743B;
			}

			.mid {
				padding: 34rpx 35rpx;

				.left_block {
					font-size: 24rpx;
					font-weight: 500;
					color: #999999;
				}

				.right_block {
					image {
						width: 14px;
						height: 14px;
						margin-right: 5px;
					}

					font-size: 24rpx;
					font-weight: 500;
					color: #999999;
				}
			}

			.popup_list {
				padding: 0 30rpx;
				height: 400rpx;
				overflow-y: scroll;

				.flex-row {
					justify-content: flex-start;
					margin-bottom: 40rpx;

					.name {
						position: relative;
						font-size: 28rpx;
						font-weight: bold;
						color: #333333;

						padding-left: 20rpx;

						&::before {
							position: absolute;
							top: 10rpx;
							bottom: 0;
							left: 0;
							margin: auto;
							content: ' ';
							width: 10rpx;
							height: 10rpx;
							border-radius: 50%;
							background: #1698AE;
						}
					}

					.price {
						flex-basis: 140rpx;
						flex-grow: 0;
						flex-shrink: 0;
						margin-left: 25rpx;
						margin-right: 20rpx;
						font-size: 28rpx;
						font-weight: bold;
						color: #F7302A;
					}

					.select_blcok {
						flex-basis: 160rpx;
						flex-grow: 0;
						flex-shrink: 0;
					}
				}
			}
		}
	}
</style>
