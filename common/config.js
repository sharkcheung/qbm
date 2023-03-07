module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://console-qbt.qebang.cn/api' : 'http://www.qbtadmin.com/api',
	// #ifdef TEST-WEIXIN
	baseUrl: 'https://test-console-qbt.qebang.cn/api', // 测试环境接口域名
	// #endif
    staticUrl:  process.env.NODE_ENV === 'production' ? 'https://static.miniapp.qbt.qebang.cn' : 'http://www.qbtadmin.com',
	// #ifdef TEST-WEIXIN
	staticUrl: 'https://test-static.miniapp.qbt.qebang.cn', // 测试环境接口域名
	// #endif
	meeting_tmpl_id: 'Nk3i7CsWS-xGXcoo4yWVMEqvHrYrrGjxHJ9_drZiULA',
	withdraw_tmpl_id: 'pWYHyS7YptDQqfIhAPYh5EjL-7qRfTGCnPjO_Xfcazg',
	customer_assign_tmpl_id: 'oiRljyTGhNUJIK3yY253aB0dvqXyIn8pJdr5pgqcIMA',
	tabList: [
		{
			name: '首页',
			icon: 'home',
			path: 'pages/public/home'
		},
		{
			name: '明星老师',
			icon: 'photo',
			path: 'pages/public/teacher'
		},
		{
			name: '精选课程',
			icon: 'play-right',
			path: 'pages/public/course'
		},
		{
			name: '我的',
			icon: 'account',
			path: 'pages/public/my'
		}
	],
	currentTab: 0,
}
