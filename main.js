import Vue from 'vue'
import App from './App'

// vuex
import store from './store'

// 引入全局uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import mixin from './common/mixin'

// 配置文件
import config from './common/config.js';
Vue.prototype.$configs = config;

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

// #ifdef MP
// 引入uView对小程序分享的mixin封装
const mpShare = require('@/uni_modules/uview-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)
// #endif

Vue.mixin(mixin)

// #ifndef TEST-WEIXIN
if (process.env.NODE_ENV === 'production') {
	console.log = () => {}
}
// #endif

const app = new Vue({
    store,
    ...App
})

// 引入请求封装
require('./util/request/index')(app)

// 公共方法
import util from '@/common/common.js';
Vue.use(util, app);


app.$mount()
