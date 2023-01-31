import request from "@/utils/request.js";

/**
 * 获取产品详情
 * @param int id
 * 
*/
export function getProductDetail(id){
	
  let uTypeId = getApp().globalData.userTypeId;
  return request.get('store/product/detail/' + id+"/"+uTypeId, {}, { noAuth : true });
}

/**
 * 产品分享二维码 推广员
 * @param int id
*/
export function getProductCode(id, data){
  return request.get('store/product/qrcode/' + id, data,{ noAuth : true });
}
// #ifndef MP
// export function getProductCode(id){
//   return request.get('store/product/qrcode/' + id, {type:'wechat'},{ noAuth : true });
// }
// #endif
// #ifdef MP
// export function getProductCode(id){
//   return request.get('store/product/qrcode/' + id, {type:'routine'},{ noAuth : true });
// }
// #endif

/**
 * 添加收藏
 * @param int id
 * @param string category product=普通产品,product_seckill=秒杀产品
*/
export function collectAdd(data){
  return request.post('user/relation/create', data);
}

/**
 * 删除收藏产品
 * @param int id
 * @param string category product=普通产品,product_seckill=秒杀产品
*/
export function collectDel(data) {
  return request.post('user/relation/delete', data);
}

/**
 * 购车添加
 * 
*/
export function postCartAdd(data) {
	
  let uTypeId = getApp().globalData.userTypeId;
  return request.post('user/cart/create/'+uTypeId, data);
}
/**
 * 获取优惠公告
 * 
*/
export function getYhList(){
  return request.get('events_list', {}, { noAuth:true});
}

/**
 * 获取分类列表
 * 
*/
export function getCategoryList(data){
  return request.get('store/product/category/lst', data, { noAuth:true});
}

/**
 * 获取产品列表
 * @param object data
*/
export function getProductslist(data){
  if( data.brand_id  && Array.isArray(data.brand_id)){
	  data = {
		  ...data
	  }
	  data.brand_id = data.brand_id.toString()
  }
  return request.get('store/product/lst',data,{noAuth:true});
}

/**
 * 获取品牌列表
 * @param object data
*/
export function getBrandlist(data){
  return request.get('store/product/brand/lst',data,{noAuth:true});
}


/**
 * 获取推荐产品
 * 
 */
export function getProductHot(page,limit) {
  return request.get("store/product/recommend/lst", { 
    page: page === undefined ? 1 : page, 
    limit:limit === undefined ? 10 :limit
  },{noAuth:true});
}
/**
 * 批量收藏
 * 
 * @param object id
 * @param string category 
*/
export function collectAll(data) {
  return request.post('user/relation/batch/create', data);
}

/**
 * 首页产品的轮播图和产品信息
 * @param int type 
 * 
*/
export function getGroomList(type,data){
  return request.get('store/product/hot/'+type,data,{noAuth:true});
}

/**
 * 获取商品收藏列表
 * @param object data
*/
export function getCollectUserList(data) {
  return request.get('user/relation/product/lst', data)
}


/**
 * 获取产品评论
 * @param int id
 * @param object data
 * 
*/
export function getReplyList(id,data){
  return request.get('store/product/reply/lst/'+id,data,{noAuth:true})
}

/**
 * 产品评价数量和好评度
 * @param int id
*/
export function getReplyConfig(id){
  return request.get('reply/config/'+id);
} 

/**
 * 获取搜索关键字获取
 * 
*/
export function getSearchKeyword(){
  return request.get('common/hot_keyword',{},{noAuth:true});
}

/**
 * 门店列表
 * @returns {*}
 */
export function storeListApi(data) {
  return request.get("store_list", data,{ noAuth : true });
}

/**
 * 商户列表
 * @returns {*}
 */
export function storeMerchantList(data) {
  return request.get("store/merchant/lst", data,{ noAuth : true });
}

/**
 * 获取商铺详情
 * @param {Object} id 商铺id
 * @param {Object} data 商铺数据
 */
export function getStoreDetail(id, data) {
	return request.get("store/merchant/detail/" + id, data, { noAuth : true });
}
/**
 * 更新商铺详情
 * @param {Object} id 商铺id
 * @param {Object} data 商铺数据
 */
export function postStoreUpdate(id, data) {
	return request.post("store/merchant/update/" + id, data, { noAuth : true });
}
/**
 * 获取商铺商品列表
 * @param {Object} id 商铺 id
 * @param {Object} data 商铺商品列表数据
 */
export function getStoreGoods(id, data) {
	return request.get("store/merchant/product/lst/" + id, data, { noAuth : true });
}

/**
 * 获取商铺分类列表
 * @param {Object} id 商铺 id
 * @param {Object} data
 */
export function getStoreCategory(id, data) {
	return request.get("store/merchant/category/lst/" + id, data, { noAuth : true });
}

/**
 * 关注商铺
 * @param {Object} type_id 商铺 id
 */
export function followStore(type_id) {
	return request.post("user/relation/create", {type: 10, type_id: type_id});
}

/**
 * 取消商铺关注
 * @param {Object} type_id 商铺 id
 */
export function unfollowStore(type_id) {
	return request.post("user/relation/delete", {type: 10, type_id: type_id});
}

/**
 * 获取商铺优惠券
 * @param {Object} id
 */
export function getStoreCoupon(id) {
	let uTypeId = getApp().globalData.userTypeId;
	return request.get("coupon/store/" + id+"/"+uTypeId, { noAuth : true });
}

/**
 * 获取商铺优惠券
 */
export function getMerchantLst(data) {
	return request.get("user/relation/merchant/lst",data, { noAuth : true });
}

/**
 * 物流信息
 */
export function express(id) {
	return request.post("ordero/express/"+id, { noAuth : true });
}

/**
 * 子集分类
 * @returns {*}
 */
export function storeCategory(pid) {
  return request.get("store/product/category", pid,{ noAuth : true });
}

/**
 * 分销说明
 * @returns {*}
 */
export function bagExplain() {
  return request.get("store/product/bag/explain");
}

/**
 * 分销礼包推荐列表
 * @returns {*}
 */
export function bagRecommend() {
  return request.get("store/product/bag/recommend");
}

/**
 * 分销礼包列表
 * @returns {*}
 */
export function productBag(data) {
  return request.get("store/product/bag",data,{ noAuth : true });
}

/**
 * 商铺二维码
 * @returns {*}
 */

export function merchantQrcode(id,data) {
  return request.get("store/merchant/qrcode/"+id,data,{ noAuth : true });
}
/**
 * 推荐商品
 * @returns {*}
 */
export function merchantProduct(id,data) {
	if( data.brand_id  && Array.isArray(data.brand_id)){
		  data = {
			  ...data
		  }
		  data.brand_id = data.brand_id.toString()
	}
  return request.get("store/merchant/product/lst/"+id,data,{ noAuth : true });
}

/**
 * 推荐商品banner
 * @returns {*}
 */
export function getHotBanner(type) {
  return request.get("common/hot_banner/"+type, {}, { noAuth : true });
}

/**
 * 商户入驻表单
 * @returns {*}
 */
export function create(data) {
  return request.post("intention/create", data);
}
/**
 * 商户入驻短信验证码
 * @returns {*}
 */
export function verify(data) {
  return request.post("auth/verify", data);
}
/**
 * 获取秒杀商品详情
 * @param int id
 * 
*/
export function getSeckillProductDetail(id){
  return request.get('store/product/seckill/detail/' + id, {}, { noAuth : true });
}

/**
 * 直播推荐列表
 * @returns {*}
 */
export function getLiveList(v=1) {
  return request.get("broadcast/hot",{type:v},{ noAuth : true });
}
/**
 * 直播列表
 * @returns {*}
 */
export function getBroadcastListApi(data) {
  return request.get("broadcast/lst",data,{ noAuth : true });
}
/**
 * 商户分类
 * @returns {*}
 */
export function merClassifly() {
  return request.get("intention/cate");
}
/**
 * 获取预售商品详情
 * @param int id
 * 
*/
export function getPresellProductDetail(id){
  return request.get('store/product/presell/detail/' + id, {}, { noAuth : true });
}
/**
 * 商学院列表
 * @returns {*}
 */
export function getSchoolList(data) {
  return request.get("article/school/lst",data);
}
/**
 * 商学院详情
 * @returns {*}
 */
export function getSchoolDetail(id) {
  return request.get("article/school/detail/"+id);
}
/**
 * 商学院分类
 * @returns {*}
 */
export function getSchoolCate() {
  return request.get("article/category/lst?pid=1");
}


/**
 * 获取项目列表
 * @returns {*}
 */
export function getProjectList(id) {
  return request.get("store/product/plist/" + id);
}

/**
 * 修改项目, 添加项目
 * @returns {*}
 */
export function postEditProject(id, pid ,data) {
  return request.post("store/product/save_project/" + id+"/"+pid, data);
}


/**
 * 修改产品
 * @returns {*}
 */
export function getEditProduct(id, uId,data) {
  return request.post("store/product/update_product/" + id+"/"+uId, data);
}

/**
 * 获取产品信息
 * @returns {*}
 */
export function getGoodsInfo(id,data) {
  return request.get("store/product/mlst/" + id,data);
}

/**
 * 产品上下架
 * @returns {*}
 */
export function changeProduct(id, uId,data) {
  return request.get("store/product/change_show/" + id+"/"+uId, data);
}

/**
 * 获取项目信息
 * @returns {*}
 */
export function getProjectInfo(id,pid) {
  return request.get("store/product/get_project/" + id+"/"+pid);
}

/**
 *删除项目
 * @returns {*}
 */
export function getChangeProject(id,pid,data) {
  return request.get("store/product/change_project/" + id+"/"+pid,data);
}

/**
 * 获取项目分类
 * @returns {*}
 */
export function getProjectCategory() {
  return request.get("article/category/lst?pid=9");
}
/**
 * 抢多多列表
 * @returns {*}
 */
export function getAssistList(data) {
  return request.get("store/product/assist/lst_admin",data,{ noAuth : true });
}

/**
 * 抢多多二维码
 * @returns {*}
 */
export function getAssistQrcode(sid,paid) {
  return request.get("store/product/assist/qrcode/"+sid+'/'+paid);
}


/**
 * 核销二维码
 * @returns {*}
 */
export function getYuScan(mid,data) {
  return request.post("store/product/scan/"+mid,data);
}


/**
 * 预约详情
 * @returns {*}
 */
export function getOrderDeteil(id,data) {
  return request.get("store/product/order_detail/"+id,data,{noAuth:true});
}



/**
 * 确认核销
 * @returns {*}
 */
export function getOrderHx(id,data) {
  return request.post("store/product/order_hx/"+id,data,{noAuth:true});
}

/**
 * 确认核销
 * @returns {*}
 */
export function getYuAdList(id,data) {
  return request.get("store/product/admin_order_list/"+id,data,{noAuth:true});
}

/**
 * 修改价格
 * @returns {*}
 */
export function getYuAdAct(mid,data) {
  return request.post("store/yuyue/admin_order_act/"+mid,data);
}

/**
 * 抢多多列表
 * @returns {*}
 */
export function getpddList(data) {
  return request.get("store/product/assist/detail_admin",data);
}

/**
 * 抢多多quxiao
 * @returns {*}
 */
export function getpddCancel(data) {
  return request.get("store/product/assist/cancel_admin",data);
}


/**
 * 修改价格
 * @returns {*}
 */
export function getUpdatePrice(mid,data) {
  return request.post("store/product/order_update_price/"+mid,data);
}


export function adminOrderAct(id,pid,data) {
  return request.post("store/product/admin_order_act/"+id+"/"+pid,data,{noAuth:true});
}




