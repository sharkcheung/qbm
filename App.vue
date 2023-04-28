<script>
	export default {
		onLaunch: function(options) {
			console.log('onLaunch')
			console.log(options)
			let that = this;
			uni.$u.api.configData().then(res => {
					console.log(res)
					uni.$u.vuex('vuex_base_config', res.data);
					if(that.vuex_token) {
						uni.$u.vuex('vuex_user', res.data.userinfo)
					}
				})
				.catch(err => {
					uni.hideLoading()
					// that.$u.util.showErr('头像上传失败');
				})
			
		},
		onShow: function(options) {
			console.log("show",options)  
			console.log('App Show') 
			
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import '@/common/common.scss';
	
</style>
