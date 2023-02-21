module.exports = {
    baseUrl: 'http://192.168.3.179/api',
    baseUrl: 'http://www.qbtadmin.com/api',
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
