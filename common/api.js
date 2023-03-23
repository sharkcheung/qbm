module.exports = (vm) => {
	const { http } = uni.$u
	let homeData = (params, config = {}) => http.get('/Home/index', params, config)
	let login = (params, config = {}) => http.post('/Login/index', params, config)
	let getPhone = (params, config = {}) => http.post('/Membe/getPhone', params, config)
	let perfection = (params, config = {}) => http.post('/Membe/perfection', params, config)
	let userDetail = (params, config = {}) => http.get('/Membe/detail', params, config)
	let userInfo = (params, config = {}) => http.get('/Membe/info', params, config)
	let updateUserInfo = (params, config = {}) => http.post('/Membe/update', params, config)
	let bannerList = (params, config = {}) => http.get('/Link/bannerList', params, config)
	let liveList = (params, config = {}) => http.get('/Live/index', params, config)
	let teacherList = (params, config = {}) => http.get('/Teacher/index', params, config)
	let serviceTypeAll = (params, config = {}) => http.get('/Servicetype/all', params, config)
	let serviceAll = (params, config = {}) => http.get('/Service/all', params, config)
	let teacherHome = (params, config = {}) => http.get('/Teacher/homepage', params, config)
	let checkUserOrder = (params, config = {}) => http.get('/Order/checkUserOrder', params, config)
	let applyVerify = (params, config = {}) => http.post('/Membe/applyVerify', params, config)
	let order = (params, config = {}) => http.post('/Order/order', params, config)
	let orderList = (params, config = {}) => http.get('/Order/index', params, config)
	let orderInfo = (params, config = {}) => http.get('/Order/detail', params, config)
	let confirmOrder = (params, config = {}) => http.post('/Order/confirm', params, config)
	let finishOrder = (params, config = {}) => http.get('/Order/finish', params, config)
	let appraise = (params, config = {}) => http.post('/Appraise/appraise', params, config)
	let generatePoster = (params, config = {}) => http.get('/Teacher/generatePoster', params, config)
	let appraiseList = (params, config = {}) => http.get('/Appraise/index', params, config)
	let courseList = (params, config = {}) => http.get('/Course/index', params, config)
	let courseDetail = (params, config = {}) => http.get('/Course/detail', params, config)
	let updateStudyNums = (params, config = {}) => http.get('/Course/updateStudyNums', params, config)
	let rewardPay = (params, config = {}) => http.get('/Appraise/rewardPay', params, config)
	let coursePay = (params, config = {}) => http.get('/Order/coursePay', params, config)
	let updateAppraiseOrder = (params, config = {}) => http.get('/Appraise/updateOrder', params, config)
	let updateCourseOrder = (params, config = {}) => http.get('/Order/updateCourseOrder', params, config)
	let appraiseInfo = (params, config = {}) => http.get('/Appraise/detail', params, config)
	let withdraw = (params, config = {}) => http.post('/Withdraw/withdraw', params, config)
	let withdrawList = (params, config = {}) => http.get('/Withdraw/index', params, config)
	let profitsList = (params, config = {}) => http.get('/Profits/index', params, config)
	let infoEdit = (params, config = {}) => http.post('/Membe/update', params, config)
	let myadvisor = (params, config = {}) => http.get('/Membe/myadvisor', params, config)
	let inviteList = (params, config = {}) => http.get('/Membe/myinvite', params, config)
	let activityList = (params, config = {}) => http.get('/Activity/index', params, config)
	let activityDetail = (params, config = {}) => http.get('/Activity/detail', params, config)
	uni.$u.api = {
		homeData,
		login,
		getPhone,
		perfection,
		userDetail,
		userInfo,
		updateUserInfo,
		bannerList,
		liveList,
		teacherList,
		serviceTypeAll,
		serviceAll,
		teacherHome,
		checkUserOrder,
		applyVerify,
		order,
		orderList,
		orderInfo,
		confirmOrder,
		finishOrder,
		appraise,
		generatePoster,
		appraiseList,
		courseList,
		courseDetail,
		updateStudyNums,
		rewardPay,
		coursePay,
		updateAppraiseOrder,
		updateCourseOrder,
		appraiseInfo,
		withdraw,
		withdrawList,
		profitsList,
		infoEdit,
		myadvisor,
		inviteList,
		activityList,
		activityDetail,
	}
}