module.exports = {
    baseUrl: 'https://api.youzixy.com',
	tabList: [
		{
			name: '首页',
			icon: 'home',
			path: 'pages/home'
		},
		{
			name: '明星老师',
			icon: 'photo',
			path: 'pages/teacher/index'
		},
		{
			name: '精选课程',
			icon: 'play-right',
			path: 'pages/course/index'
		},
		{
			name: '我的',
			icon: 'account',
			path: 'pages/my/index'
		}
	],
	currentTab: 0,
}
