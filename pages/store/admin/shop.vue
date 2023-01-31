<template>
	<!-- 表单-管理功能-商品管理 -->
	<view class="page shop_body form_body">
		<form @submit="formSubmit" report-submit='true'>
			<view class="block">
				<!-- <view class="uni-form-item hr_shadow">
					<view class="title">企业logo</view>
					<view class="right_block flex-center" @click="addimg">
						<image class="i-add" :src="mer_avatar ? mer_avatar:'/static/img/i-add.png'" mode="widthFix">
						</image>
					</view>
				</view>
				<view class="uni-form-item hr_shadow flexStart">
					<view class="title" style="width: 150px;">店铺banner图（多图）</view>
					<view class="right_block flex-center">
						<view class="add-img" @click="addBanner">
							<image class="i-add" src="/static/img/i-add.png" mode="widthFix"></image>
						</view>
						<view class="img-item" v-for="(item,index) in mer_banner" :key="index">
							<image :src="item" mode="widthFix"></image>
							<view class="iconfont icon-guanbi1" @click="deleteImg(index)"></view>
						</view>
					</view>
				</view> -->
				<view class="uni-form-item hr_shadow">
					<view class="title">店铺名称</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='mer_name' type="text" :value="mer_name"
							placeholder="请填写店铺名称" />
					</view>

				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">联系人</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='contact' type="text" :value="contact"
							placeholder="请填写联系人" />
					</view>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">联系电话</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='contact_phone' type="text" :value="contact_phone"
							placeholder="请填写联系电话" />
					</view>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">经纬度</view>
					<view class="right_block flex-center">
						<view style="text-align: right;" @click="getLocation()">
							{{lng && lat?lng+','+lat:'获取经纬度'}}
						</view>
					</view>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class='title'>所属地区</view>
					<view class="right_block flex-center">
						<picker mode="multiSelector" @change="bindRegionChange"
							@columnchange="bindMultiPickerColumnChange" :value="valueRegion" :range="multiArray">
							<view class='flex-end'>
								<view class="picker">{{region[0]}}，{{region[1]}}，{{region[2]}}</view>
								<view class='iconfont icon-dizhi font-color'></view>
							</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">详细地址</view>
					<view class="right_block flex-center">
						<input style="text-align: right;width: 100%;" name='detail' type="text" :value="detail"
							placeholder="门牌号" />
					</view>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">营业状态</view>
					<picker @change="stateChange" :value="shop_state" :range="stateArr" range-key="name">
						<view class="uni-input" style="color: #000;">{{stateArr[shop_state].name}}</view>
					</picker>
					<!-- <view class="right_block flex-center">
						<input style="text-align: right;" name="shop_state" type="text" :value="shop_state" />
					</view> -->
				</view>
				<view class="uni-form-item">
					<view class="title">营业时间</view>
					<view class="right_block flex-center">
						<!-- <input type="time" /> -->
						<input style="text-align: right;" name='mer_info' type="text" :value="mer_info"
							placeholder="营业时间,如 09:00-22:00" />
					</view>
				</view>
				<view class="uni-form-item" style="height: 300rpx;">
					<textarea style="color: #000;" maxlength="-1" :value="mer_desc" placeholder="请编辑经营范围"
						name="mer_desc" />
				</view>

			</view>
			<button hover-class="none" class="submit_btn flex-center" form-type="submit">保存</button>
		</form>
	</view>
</template>

<script>
	import amap from '@/libs/amap-wx.js';
	import wPicker from "@/components/wPicker/w-picker.vue";
	import {
		getStoreDetail,
		postStoreUpdate
	} from '@/api/store.js';
	import {
		getCity
	} from '@/api/api.js';
	export default {
		data() {
			return {
				amapPlugin: null,
				key: '991741259ff53976ad1b0309967d3a61',
				addressName: '',
				region: ['省', '市', '区'],
				valueRegion: [0, 0, 0],
				color: '#1698ae',
				style: 'transform:scale(0.7)',

				mer_id: 0, //id
				mer_name: '', //商户名称
				mer_info: '', //	营业时间
				mer_avatar: '', //商户头像
				mer_banner: [], //商户banner
				shop_state: 0, //商户状态
				contact: "", //人
				contact_phone: "", //号码
				mer_desc: '',

				district: [],
				multiArray: [],
				multiIndex: [0, 0, 0],
				cityId: 0,
				detail: '',
				stateArr: [{
						name: '营业中'
					},
					{
						name: '暂停营业'
					},
					{
						name: '打烊'
					}
				],
				lng: '',
				lat: ''
			}
		},
		onLoad(options) {
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
			let {
				mer_id
			} = options
			this.mer_id = mer_id
			this.getStoreDetail(mer_id)
			this.getCityList();
		},
		onShow() {},
		methods: {
			getLocation() {
				let that = this
				// uni.showLoading({
				// 	title: '获取信息中'
				// });
				// this.amapPlugin.getRegeo({
				// 	success: (data) => {
				// 		console.log(data)
				// 		this.addressName = data[0].name;
				// 		uni.hideLoading();
				// 	}
				// });
				// this.amapPlugin.getInputtips({
				// 	keywords: '肯德基',
				// 	city: 440306,
				// 	success: (data) => {
				// 		console.log(data)
				// 		uni.hideLoading();
				// 	}
				// });
				// uni.request({
				// 	url: "https://restapi.amap.com/v3/geocode/geo",
				// 	data: {
				// 		key: 'e98d121482ff4790fa5c280e304ef035',
				// 		address: '肯德基'
				// 	},
				// 	method: "GET",
				// 	header: {
				// 		"content-type": "application/json"
				// 	},
				// 	success: (res) => {
				// 		uni.hideLoading();
				// 		console.log(res);
				// 	},
				// 	fail(res) {
				// 		console.log(res);
				// 	}
				// })
				// #ifndef H5 || APP-PLUS
				uni.getSetting({
					success(res) {
						if (res && res.authSetting && res.authSetting.hasOwnProperty('scope.userLocation')) {
							if (!res.authSetting['scope.userLocation']) {
								uni.openSetting({
									success: (res) => {
										return
									}
								})
							}
						}
					}
				})
				// #endif

				if (that.lat && that.lng) {
					uni.chooseLocation({
						latitude: that.lat,
						longitude: that.lng,
						success: function(res) {
							that.lat = res.latitude
							that.lng = res.longitude
							let H = res.address.indexOf('省')+'省'.length
							let S = res.address.indexOf('市')+'市'.length
							let Q = res.address.indexOf('区')+'区'.length==0?res.address.indexOf('县')+'县'.length:res.address.indexOf('区')+'区'.length
							let province = res.address.substring(0,H);
							let city = res.address.substring(H,S);
							let area = res.address.substring(S,Q);
							that.detail = res.address.substring(Q,res.address.length);
							console.log(province,city,area,that.detail);
							// console.log('位置名称：' + res.name);
							// console.log('详细地址：' + res.address);
							// console.log('纬度：' + res.latitude);
							// console.log('经度：' + res.longitude);
						},
						fail(res) {
							console.log(res);
						}
					});
				} else {
					uni.getLocation({
						type: 'gcj02',
						success: function(res) {
							uni.chooseLocation({
								latitude: res.latitude,
								longitude: res.longitude,
								success: function(res) {
									that.lat = res.latitude
									that.lng = res.longitude
									let H = res.address.indexOf('省')+'省'.length
									let S = res.address.indexOf('市')+'市'.length
									let Q = res.address.indexOf('区')+'区'.length==0?res.address.indexOf('县')+'县'.length:res.address.indexOf('区')+'区'.length
									let province = res.address.substring(0,H);
									let city = res.address.substring(H,S);
									let area = res.address.substring(S,Q);
									that.detail = res.address.substring(Q,res.address.length);
									console.log(province,city,area,that.detail);
								},
								fail(res) {
									console.log(res);
								}
							});
						},
						fail(res) {
							console.log(res);
						}
					});
				}

			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			// 删除图片
			deleteImg(index) {
				this.mer_banner.splice(index, 1)
			},
			submitForm(form) {
				// 手动提交表单
				this.$refs.form.submit().then((res) => {
					console.log('表单返回得值：', res)
				})
			},
			addimg() {
				var that = this
				// var arr = [that.mer_avatar]
				// uni.previewImage({
				// 	urls:arr
				// })
				that.$util.uploadImageOne('upload/image', function(res) {
					that.mer_avatar = res.data.path;
				});
			},
			addBanner() {
				var that = this
				that.$util.uploadImageOne('upload/image', function(res) {
					that.mer_banner.push(res.data.path);
				});
			},
			// 地址数据
			getCityList: function() {
				let that = this;
				getCity().then(res => {
					this.district = res.data
					that.initialize();
				})
			},
			initialize: function() {
				let that = this,
					province = [],
					city = [],
					area = [];
				if (that.district.length) {
					let cityChildren = that.district[0].children || [];
					let areaChildren = cityChildren.length ? (cityChildren[0].children || []) : [];
					that.district.forEach(function(item) {
						province.push(item.name);
					});
					cityChildren.forEach(function(item) {
						city.push(item.name);
					});
					areaChildren.forEach(function(item) {
						area.push(item.name);
					});
					this.multiArray = [province, city, area]
				}
			},
			getStoreDetail(id) {
				let that = this
				var region = []
				getStoreDetail(id).then(res => {
					this.mer_avatar = res.data.mer_avatar
					this.mer_banner = (res.data.mer_banner !== null && res.data.mer_banner !== "") ? res.data
						.mer_banner.split(",") : []
					this.mer_name = res.data.mer_name
					this.contact = res.data.contact
					this.contact_phone = res.data.contact_phone
					this.mer_info = res.data.mer_info
					this.mer_desc = res.data.mer_desc
					this.detail = res.data.detail
					this.lat = res.data.lat
					this.lng = res.data.lng
					this.shop_state = res.data.shop_state - 1
					if (res.data.province != null) {
						region = [res.data.province, res.data.city, res.data.district];
					} else {
						region = ['省', '市', '区']
					}
					this.region = region
				})
			},
			bindRegionChange: function(e) {
				let multiIndex = this.multiIndex,
					province = this.district[multiIndex[0]] || {
						children: []
					},
					city = province.children[multiIndex[1]] || {
						city_id: 0
					},
					multiArray = this.multiArray,
					value = e.detail.value;

				this.region = [multiArray[0][value[0]], multiArray[1][value[1]], multiArray[2][value[2]]]
				// this.$set(this.region,0,multiArray[0][value[0]]);
				// this.$set(this.region,1,multiArray[1][value[1]]);
				// this.$set(this.region,2,multiArray[2][value[2]]);
				this.cityId = city.city_id
				this.valueRegion = [0, 0, 0]
				this.initialize();
			},
			bindMultiPickerColumnChange: function(e) {
				let that = this,
					column = e.detail.column,
					value = e.detail.value,
					currentCity = this.district[value] || {
						children: []
					},
					multiArray = that.multiArray,
					multiIndex = that.multiIndex;
				multiIndex[column] = value;
				switch (column) {
					case 0:
						let areaList = currentCity.children[0] || {
							children: []
						};
						multiArray[1] = currentCity.children.map((item) => {
							return item.name;
						});
						multiArray[2] = areaList.children.map((item) => {
							return item.name;
						});
						break;
					case 1:
						let cityList = that.district[multiIndex[0]].children[multiIndex[1]].children || [];
						multiArray[2] = cityList.map((item) => {
							return item.name;
						});
						break;
					case 2:

						break;
				}
				// #ifdef MP
				this.$set(this.multiArray, 0, multiArray[0]);
				this.$set(this.multiArray, 1, multiArray[1]);
				this.$set(this.multiArray, 2, multiArray[2]);
				// #endif
				// #ifdef H5
				this.multiArray = multiArray;
				// #endif



				this.multiIndex = multiIndex
				// this.setData({ multiArray: multiArray, multiIndex: multiIndex});
			},

			stateChange(e) {
				this.shop_state = Number(e.detail.value)
			},

			formSubmit: function(e) {
				let that = this,
					value = e.detail.value;
				// if (!that.mer_avatar) return that.$util.Tips({
				// 	title: '请上传logo'
				// });
				if (!value.mer_name) return that.$util.Tips({
					title: '请填写商户名称'
				});
				if (!value.contact) return that.$util.Tips({
					title: '请填写联系人'
				});
				if (!value.contact_phone) return that.$util.Tips({
					title: '请填写联系人电话'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(value.contact_phone)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (that.region == '省-市-区') return that.$util.Tips({
					title: '请选择所在地区'
				});
				if (!value.detail) return that.$util.Tips({
					title: '请填写详细地址'
				});
				if (!that.lat && !that.lng) return that.$util.Tips({
					title: '请选择经纬度'
				});
				value.shop_state = that.shop_state + 1

				let regionArray = that.region;
				value.province = regionArray[0]
				value.city = regionArray[1]
				value.district = regionArray[2]
				value.city_id = that.cityId
				value.lat = that.lat
				value.lng = that.lng
				value.mer_avatar = that.mer_avatar
				value.mer_banner = that.mer_banner.join(',')
				uni.showLoading({
					title: '保存中',
					mask: true
				})
				postStoreUpdate(this.mer_id, value).then(res => {
					that.$util.Tips({
						title: '保存成功',
						icon: 'success'
					});
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/index/index'
						});
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

<style lang="less" scoped>
	.right_block {
		flex: 1;

		input {
			width: 100%;
		}

		>view {
			width: 100%;
		}

		.flex-end {
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
	}

	.shop_body {
		background: #fff;
		padding-bottom: 10rpx;

		.block {
			background-color: #eee;

			// margin-bottom: 0;
			// padding-bottom: 107rpx;
			.flexStart {
				flex-direction: column;
				align-items: flex-start;
				justify-content: space-around;
				height: 200rpx;

				view {
					margin: 8rpx 0;
				}
			}

			.uni-form-item {
				border-top: 1rpx solid #eee;
				background-color: #fff;
				margin-top: 0;

				textarea {
					width: 800rpx;
					border: 1rpx solid #eee;
				}

				.img-item {
					position: relative;

					image {
						width: 80rpx;
						height: 80rpx;
						margin-right: 22rpx;
					}

					.iconfont {
						position: absolute;
						right: 7rpx;
						top: -16rpx;
						font-size: 30rpx;
						color: #DDDDDD;
					}
				}
			}
		}

		.submit_btn {
			margin: 60rpx auto;
			width: 60%;
		}


	}
</style>
