module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://console-qbt.qebang.cn/api' : 'http://www.qbtadmin.com/api',
	// #ifdef TEST-WEIXIN
	baseUrl: 'https://test-console-qbt.qebang.cn/api', // 测试环境接口域名
	// #endif
    staticUrl:  process.env.NODE_ENV === 'production' ? 'https://static.miniapp.qbt.qebang.cn' : 'http://www.qbtadmin.com',
	// #ifdef TEST-WEIXIN
	staticUrl: 'https://test-static.miniapp.qbt.qebang.cn', // 测试环境接口域名
	// #endif
	
	// baseUrl: 'https://console-qbt.qebang.cn/api',
	// staticUrl: 'https://static.miniapp.qbt.qebang.cn',
	
	meeting_tmpl_id: 'Nk3i7CsWS-xGXcoo4yWVMEqvHrYrrGjxHJ9_drZiULA',
	withdraw_tmpl_id: 'pWYHyS7YptDQqfIhAPYh5EjL-7qRfTGCnPjO_Xfcazg',
	customer_assign_tmpl_id: 'oiRljyTGhNUJIK3yY253aB0dvqXyIn8pJdr5pgqcIMA',
	tabList: [
		{
			name: '首页',
			activeIcon: 'https://static.miniapp.qbt.qebang.cn/uploads/api/icon/icon_qbt_sy2@1x.png',
			inactiveIcon: 'https://static.miniapp.qbt.qebang.cn/uploads/api/icon/icon_qbt_sy@1x.png',
			path: 'pages/public/home'
		},
		{
			name: '精选课程',
			activeIcon: 'https://static.miniapp.qbt.qebang.cn/uploads/api/icon/icon_qbt_jxkc2@1x.png',
			inactiveIcon: 'https://static.miniapp.qbt.qebang.cn/uploads/api/icon/icon_qbt_jxkc@1x.png',
			path: 'pages/public/course'
		},
		{
			name: '线下活动',
			activeIcon: 'https://static.miniapp.qbt.qebang.cn/uploads/api/icon/icon_bql_xxhd2@1x.png',
			inactiveIcon: 'https://static.miniapp.qbt.qebang.cn/uploads/api/icon/icon_bql_xxhd@1x.png',
			path: 'pages/public/activity'
		},
		{
			name: '我的',
			activeIcon: 'https://static.miniapp.qbt.qebang.cn/uploads/api/icon/icon_qbt_wd2@1x.png',
			inactiveIcon: 'https://static.miniapp.qbt.qebang.cn/uploads/api/icon/icon_qbt_wd@1x.png',
			path: 'pages/public/my'
		}
	],
	currentTab: 0,
}
