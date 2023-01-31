import request from "@/utils/request.js";
/**
 * 
 * 所有活动接口 包括：拼团，砍价，秒杀
 * 
*/

/**
 * 拼团列表
 * 
*/
export function getCombinationList(data) {
  return request.get('combination/list', data,{noAuth:true});
}

/**
 * 拼团详情
 * 
*/
export function getCombinationDetail(id) {
  return request.get('combination/detail/'+id);
}

/**
 * 拼团 开团
 */
export function getCombinationPink(id) {
  return request.get("combination/pink/" + id);
}

/**
 * 拼团 取消开团
 */
export function postCombinationRemove(data) {
  return request.post("combination/remove",data);
}

/**
 * 秒杀产品详情
 * @param int id
*/
export function getSeckillDetail(id){
  return request.get('store/product/seckill/detail/'+id);
}


/**
 * 拼团海报
 * @param object data
 * 
*/
export function getCombinationPoster(data){
  return request.post('combination/poster',data)
}



/**
 * 获取秒杀小程序二维码
 */
export function seckillCode(id,data) {
  return request.get("seckill/code/"+id,data);
}

/**
 * 获取拼团小程序二维码
 */
export function scombinationCode(id) {
  return request.get("combination/code/"+id);
}
/**
 * 秒杀产品时间区间
 * 
*/
export function getSeckillIndexTime(){
  return request.get('store/product/seckill/select',{},{noAuth:true});
}
/**
 * 秒杀产品列表
 * @param int time
 * @param object data
*/
export function getSeckillList(data){
  return request.get('store/product/seckill/lst',data,{noAuth:true});
  
}
/**
 * 预售列表
*/
export function getPresellList(data){
  return request.get('store/product/presell/lst',data,{noAuth:true});
}
/**
 * 助力列表
*/
export function getAssistList(data){
  return request.get('store/product/assist/lst',data,{noAuth:true});
}

/**
 * 助力列表 -- 发起助力
*/
export function initiateAssistApi(id){
  return request.post('store/product/assist/create/'+id);
}
/**
 * 助力详情
*/
export function getAssistDetail(id){
  return request.get('store/product/assist/detail/'+id);
}
/**
 * 助力好友
*/
export function assistHelpList(id,data){
  return request.get('store/product/assist/user/'+id, data);
}
/**
 * 预售协议
*/
export function presellAgreement(){
  return request.get('store/product/presell/agree');
}
/**
 * 已助力成功数据
*/
export function assistUserData(){
  return request.get('store/product/assist/count',{},{noAuth:true});
}
/**
 * 为好友助力
*/
export function postAssistHelp(id){
  return request.post('store/product/assist/set/'+id);
}
/**
 * 获取助力查看分享次数
*/
export function getAssistUser(id){
  return request.get('store/product/assist/share/'+id);
}
/**
 * 助力记录列表
*/
export function getBargainUserList(data){
  return request.get('store/product/assist/set/lst',data);
}
/**
 * 助力记录列表 -- 取消
*/
export function getBargainUserCancel(id){
  return request.post('store/product/assist/set/delete/'+id);
}