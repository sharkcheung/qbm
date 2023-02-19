import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // vue的插件机制


let lifeData = {};

try{
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的，区分开发环境和生产环境
	lifeData = uni.getStorageSync('qbm_Data_'+process.env.NODE_ENV);
}catch(e){
	
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_user', 'vuex_token'];

// 保存变量到本地存储中
const saveLifeData = function(key, value){
	// 判断变量名是否在需要存储的数组中
	if(saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中，区分开发环境和生产环境
		let tmp = uni.getStorageSync('qbm_Data_'+process.env.NODE_ENV);
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中，区分开发环境和生产环境
		uni.setStorageSync('qbm_Data_'+process.env.NODE_ENV, tmp);
	}
}

// Vuex.Store 构造器选项
const store = new Vuex.Store({
    // 为了不和页面或组件的data中的造成混淆，state中的变量前面建议加上$符号
    state: {
        // 用户信息
        vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {},
		// 当前导航
		vuex_currentTab: lifeData.vuex_currentTab ? lifeData.vuex_currentTab : 0
    },
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(len >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store
