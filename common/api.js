module.exports = (vm) => {
	const { http } = uni.$u
	let login = (params, config = {}) => http.post('/Login/index', params, config)
	let rewardPay = (params, config = {}) => http.post('/reward/pay', params, config)
	uni.$u.api = {
		login,
		rewardPay,
	}
}