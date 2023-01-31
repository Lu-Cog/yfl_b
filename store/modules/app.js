import {
	getUserInfo
} from "../../api/user.js";
import {
	LOGIN_STATUS,
	UID,
	STYPE,
	STOREID
} from '../../config/cache';
import Cache from '../../utils/cache';
import {
	USER_INFO
} from '../../config/cache';

const state = {
	token: Cache.get(LOGIN_STATUS) || null,
	stype: Cache.get(STYPE) || 1,
	store_id: Cache.get(STOREID) || 0,
	backgroundColor: "#fff",
	userInfo: Cache.get(USER_INFO) || {},
	uid: Cache.get(UID) || null,
	homeActive: false,
};

const mutations = {
	LOGIN(state, opt) {
		state.token = opt.token;
		Cache.set(LOGIN_STATUS, opt.token, opt.time);
	},
	STOREID(state, sto) {
		state.store_id = sto.store_id;
		Cache.set(STOREID, sto.store_id, sto.time);
	},
	STYPE(state, sty) {
		console.log('stype',state);
		state.stype = sty.stype;
		Cache.set(STYPE, sty.stype, sty.time);
	},
	SETUID(state,val){
		state.uid = val;
		Cache.set(UID, val);
	},
	UPDATE_LOGIN(state, token) {
		state.token = token;
	},
	LOGOUT(state) {
		state.token = undefined;
		state.uid = undefined;
		state.stype = 1;
		Cache.clear(LOGIN_STATUS);
		Cache.clear(UID);
		Cache.clear(STYPE);
	},
	BACKGROUND_COLOR(state, color) {
		state.color = color;
		document.body.style.backgroundColor = color;
	},
	UPDATE_USERINFO(state, userInfo) {
		state.userInfo = userInfo;
	},
	OPEN_HOME(state) {
		state.homeActive = true;
	},
	CLOSE_HOME(state) {
		state.homeActive = false;
	},
};

const actions = {
	USERINFO({
		state,
		commit
	}, force) {
		if (state.userInfo !== null && !force)
			return Promise.resolve(state.userInfo);
		else
			return new Promise(reslove => {
				getUserInfo().then(res => {
					commit("UPDATE_USERINFO", res.data);
					Cache.set(USER_INFO, res.data);
					reslove(res.data);
				});
			}).catch(() => {

			});
	}
};

export default {
	state,
	mutations,
	actions
};
