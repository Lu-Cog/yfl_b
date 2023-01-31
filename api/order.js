import request from "@/utils/request.js";

/**
 * 获取购物车列表
 * @param numType boolean true 购物车数量,false=购物车产品数量
 */
export function getCartCounts() {
	
  let uTypeId = getApp().globalData.userTypeId;
  return request.get("user/cart/count/"+uTypeId);
}
/**
 * 获取购物车列表
 * 
 */
export function getCartList() {
	
	let uTypeId = getApp().globalData.userTypeId;
	return request.get("user/cart/lst/"+uTypeId);
}

/**
 * 修改购物车数量
 * @param int cartId  购物车id
 * @param int number 修改数量
 */
export function changeCartNum(cartId, data) {
  
  let uTypeId = getApp().globalData.userTypeId;
  return request.post("user/cart/change/"+cartId+"/"+uTypeId,data);
}
/**
 * 清除购物车
 * @param object ids
*/
export function cartDel(data){
	
	let uTypeId = getApp().globalData.userTypeId;
	return request.post('user/cart/delete/'+uTypeId, data);
}
/**
 * 订单列表
 * @param object data
*/
export function getOrderList(data){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.get('order/list/'+uTypeId,data);
}

/**
 * 订单产品信息
 * @param string unique 
*/
export function orderProduct(orderId){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.get('reply/product/'+orderId+"/"+uTypeId);
}

/**
 * 订单评价
 * @param object data
 * 
*/
export function orderComment(id,data){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.post('reply/'+id+"/"+uTypeId,data);
}

/**
 * 订单支付
 * @param object data
*/
export function orderPay(id,data){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.post('order/pay/'+id+"/"+uTypeId,data);
}

//TOM -订单支付
export function orderRePay(id,data){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.post('order/re_pay/'+id+"/"+uTypeId,data);
}

//TOM -确认收货
export function sureOrder(id,data){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.post('order/sureOrder/'+id+"/"+uTypeId,data);
}
/**
 * 订单统计数据
*/
export function orderData(data){

  let uTypeId = getApp().globalData.userTypeId;
  return request.get('order/number/'+uTypeId,data);
}

/**
 * 订单取消
 * @param string id
 * 
*/
// export function orderCancel(id){
//   return request.post('order/cancel',{id:id});
// }

/**
 * 未支付订单取消
 * @param string id
 * 
*/
export function unOrderCancel(id,data){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.post('order/cancel/'+id+"/"+uTypeId,data);
}

/**
 * 删除订单
 * @param string uni
 * 
*/
export function orderDel(id,data){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.post('order/cancel_del/'+id+"/"+uTypeId,data);
}

/**
 * 订单详情
 * @param string uni 
*/
export function getOrderDetail(uni,data){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.get('order/detail/'+uni+"/"+uTypeId,data);
}

/**
 * 订单详情
 * @param string uni 
*/
export function groupOrderDetail(uni){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.get('order/group_order_detail/'+uni+"/"+uTypeId);
}

// 支付状态订单
export function getPayOrder(uni,data){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.get('order/status/'+uni+"/"+uTypeId,data);
}

/**
 * 再次下单
 * @param string uni
 * 
*/
export function orderAgain(data){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.post('user/cart/again/'+uTypeId,data);
}

/**
 * 订单收货
 * @param string uni
 * 
*/
export function orderTake(uni,ftype,data){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.post('order/take/'+uni+"/"+uTypeId+'/'+ftype,data);
}

/**
 * 订单查询物流信息
 * @returns {*}
 */
export function express(id) {
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.post("order/express/" + id+"/"+uTypeId);
}

/**
 * 获取退款理由
 * 
*/
export function ordeRefundReason(){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.get('order/refund/reason/'+uTypeId);
}

/**
 * 订单退款审核
 * @param object data
*/
export function orderRefundVerify(data){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.post('order/refund/verify/'+uTypeId,data);
}

/**
 * 订单确认获取订单详细信息
 * @param string cartId
*/
export function orderConfirm(data){
  let uTypeId = getApp().globalData.userTypeId;	
  return request.post('order/check/'+uTypeId, data);
}

/**
 * 获取当前金额能使用的优惠卷
 * @param string price
 * 
*/
export function getCouponsOrderPrice(price, data){
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.get('coupons/order/' + price+"/"+uTypeId, data)
}



/**
 * 计算订单金额
 * @param key
 * @param data
 * @returns {*}
 */
export function postOrderComputed(key, data) {
  
	let uTypeId = getApp().globalData.userTypeId;
	return request.post("/order/computed/" + key+"/"+uTypeId, data);
}



// 生成订单
export function orderCreate(data) {
	
	let uTypeId = getApp().globalData.userTypeId;	
	return request.post("order/create/"+uTypeId,data,{ noAuth : true });
}

// 未支付订单
export function groupOrderList(data) {
	
		let uTypeId = getApp().globalData.userTypeId;
		return request.get("order/group_order_list/"+uTypeId,data,{ noAuth : true });
}

// 批量退款列表
export function refundBatch(id) {
	
	let uTypeId = getApp().globalData.userTypeId;
	return request.get("refund/batch_product/"+id+"/"+uTypeId,{ noAuth : true });
}

// 退款商品
export function refundProduct(id,data) {
	return request.get("refund/product/"+id,data,{ noAuth : true });
}

// 申请退款
export function refundApply(id,data) {
	
	let uTypeId = getApp().globalData.userTypeId;
	return request.post("refund/apply/"+id,data,{ noAuth : true });
}

// 退款理由
export function refundMessage() {
	
	let uTypeId = getApp().globalData.userTypeId;
	return request.get("common/refund_message",{ noAuth : true });
}

// 退款列表
export function refundList(data) {
	
	let uTypeId = getApp().globalData.userTypeId;
	return request.get("refund/list",data,{ noAuth : true });
}

// 退款详情
export function refundDetail(id) {
	
	let uTypeId = getApp().globalData.userTypeId;
	return request.get("refund/detail/"+id,{ noAuth : true });
}

// 物流列表
export function expressList() {
	
	let uTypeId = getApp().globalData.userTypeId;
	return request.get("common/express");
}

// 退回商品提交
export function refundBackGoods(id,data) {
	return request.post("refund/back_goods/"+id,data,{ noAuth : true });
}

// 退款记录删除
export function refundDel(id) {
	return request.post("refund/del/"+id,{ noAuth : true });
}

// 退款记录删除
export function refundExpress(id) {
	return request.get("refund/express/"+id,{ noAuth : true });
}

// 核销二维码
export function verifyCode(id) {
	return request.get("order/verify_code/"+id);
}
/**
 * 预售尾款支付
 * @param object data
*/
export function presellOrderPay(id,data){
  return request.post('presell/pay/'+id,data);
}

/**
 * 发票订单
 * @param object data
*/
export function receiptOrder(data){
  return request.get('user/receipt/order',data);
}
/**
 * 发票订单
 * @param object data
*/
export function getReceiptOrder(id){
  return request.get('user/receipt/order/'+id);
}
/**
 * 发票订单
 * @param object data
*/
export function getCallBackUrlApi(key){
  return request.get('common/pay_key/'+key, {},{ noAuth : true});
}
