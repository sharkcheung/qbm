module.exports = (vm) => {
	const { http } = uni.$u
	let rewardPay = (params, config = {}) => http.post('/reward/pay', params, config)
	uni.$u.api = {
		rewardPay
	}
}