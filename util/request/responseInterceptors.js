/**
 * 响应拦截
 * @param {Object} http 
 */
module.exports = (vm) => {
    uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
        const data = response.data
        // 自定义参数
        const custom = response.config?.custom
        if (data.status !== 200) { // 服务端返回的状态码不等于200，则reject()
			if(data.status == 401) {
				
				uni.showToast({
					icon: 'error',
					title: data.msg,
				});
				uni.$u.vuex('vuex_user', {});
				uni.$u.vuex('vuex_token', '');
				setTimeout(()=>{
					uni.$u.route({
						url: '/pages/public/login'
					})
				}, 1000)
				return new Promise(() => { })
				
			}
            // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
            if (custom.toast !== false) {
                uni.$u.toast(data.msg)
            }
            // 如果需要catch返回，则进行reject
            if (custom?.catch) {
                return Promise.reject(data)
            } else {
                // 否则返回一个pending中的promise
                return new Promise(() => { })
            }
        }
        return data || {}
    }, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
        return Promise.reject(response)
    })
}