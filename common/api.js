module.exports = (vm) => {
	const { http } = uni.$u
	let login = (params, config = {}) => http.post('/Login/index', params, config)
	let getPhone = (params, config = {}) => http.post('/Membe/getPhone', params, config)
	let perfection = (params, config = {}) => http.post('/Membe/perfection', params, config)
	let userDetail = (params, config = {}) => http.get('/Membe/detail', params, config)
	let updateUserInfo = (params, config = {}) => http.post('/Membe/update', params, config)
	let teacherList = (params, config = {}) => http.get('/Teacher/index', params, config)
	let serviceTypeAll = (params, config = {}) => http.get('/Servicetype/all', params, config)
	let serviceAll = (params, config = {}) => http.get('/Service/all', params, config)
	let teacherHome = (params, config = {}) => http.get('/Teacher/homepage', params, config)
	let checkUserOrder = (params, config = {}) => http.get('/Order/checkUserOrder', params, config)
	let rewardPay = (params, config = {}) => http.post('/reward/pay', params, config)
	uni.$u.api = {
		login,
		getPhone,
		perfection,
		userDetail,
		updateUserInfo,
		teacherList,
		serviceTypeAll,
		serviceAll,
		teacherHome,
		checkUserOrder,
		rewardPay,
	}
}