module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://console-qbt.qebang.cn/api' : 'http://www.qbtadmin.com/api',
    staticUrl:  process.env.NODE_ENV === 'production' ? 'https://static.miniapp.qbt.qebang.cn/' : 'http://www.qbtadmin.com',
	meeting_tmpl_id: 'Nk3i7CsWS-xGXcoo4yWVMEqvHrYrrGjxHJ9_drZiULA',
	withdraw_tmpl_id: 'pWYHyS7YptDQqfIhAPYh5EjL-7qRfTGCnPjO_Xfcazg',
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
