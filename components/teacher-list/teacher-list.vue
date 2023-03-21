<template>
	<view>
		<view class="teacher-item" v-for="(item, index) in listData" :key="index" @click="openPage('/pages/teacher/homepage', item)">
			<view class="teacher-item-top">
				<u-avatar shape="square" size="80" :src="item.avatar_url" customStyle="border-radius:20rpx;"></u-avatar>
				<view class="teacher-item-top-right">
					<view class="teacher-item-title">
						{{ item.teacher_name }}
						<u-rate size="15" :value="item.mark" :gutter="0" readonly activeColor="#F8AE42"></u-rate>
						
					</view>
					<view class="titles flex-row justify-between">
						<view class="title-text">
							<text v-for="(item_title, idx) in item.title.split(',')" :key="idx">{{ item_title }}</text>
						</view>
						<view class="chat-btn flex-row justify-center align-center" @click.stop="order(item)"><u-icon label="约聊" labelPos="right" size="23" :name="chatImg" labelColor="#fff" labelSize="14"></u-icon></view>
					</view>
				</view>
				
			</view>
			<u-gap height="1" bgColor="#E5E5E5"></u-gap>
			<view class="teacher-item-skill">
				<view class="skill-title">老师擅长项目：</view>
				
				<view class="scroll-list flex-row flex-wrap">
					<text v-for="(item_item, index_item) in item.service" :key="index_item">{{ item_item.name }}</text>
				</view>
			</view>
		</view>
		<u-modal :show="show" :closeOnClickOverlay="true" title="温馨提示" :content="content">
			<u-button slot="confirmButton" :text="confirmText" type="primary" shape="circle" @click="confirmClick">
			</u-button>
		</u-modal>
	</view>
</template>

<script>
	export default {
		name:"teacher-list",
		props: {
			listData: Array,
			serviceId: {
				type: Number,
				default: 0
			},
			serviceName: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				modalType: 0,
				show: false,
				confirmText: '去登录',
				content: '您还没有登录,暂时无法进行下单',
				chatImg: ''
			};
		},
		mounted() {
			this.chatImg = this.$configs.staticUrl + '/uploads/api/icon/icon_qbt_yl.svg'
			console.log(this.listData)
		},
		methods:{
			confirmClick() {
				this.show = false;
				if (this.modalType == 0) {
					uni.$u.route({
						url: '/pages/public/login'
					})
				} else if (this.modalType == 1) {
					uni.$u.route({
						url: '/pages/my/verify',
						params: {
							type: 2
						}
					})
				} else if (this.modalType == 2) {
					uni.$u.route({
						url: '/pages/my/perfection'
					})
				}
			},
			order(item) {
				if (!this.vuex_token) {
					this.modalType = 0;
					this.show = true;
					this.content = '您还没有登录,暂时无法进行下单';
					this.confirmText = '去登录';
					return false;
				}
				if (!this.vuex_user.mobile) {
					this.modalType = 2;
					this.show = true;
					this.content = '请先完善信息再下单';
					this.confirmText = '去完善';
					return false;
				}

				uni.showLoading({
					title: '数据请求中...'
				})
				let that = this;
				uni.$u.api.checkUserOrder({
						params: {
							teacher_id: item.id
						}
					}).then(res => {
						uni.hideLoading()
						if (res.msg !== '') {
							that.modalType = 1;
							that.show = true;
							that.confirmText = '去认证';
							that.content = res.msg;
							return false;
						}
						uni.$u.route({
							url: 'pages/teacher/order',
							params: {
								company_name: res.data.company_name,
								service_type_id: 1,
								service_id: that.serviceId,
								service_name: that.serviceName,
								teacher_id: item.id,
								teacher_name: item.teacher_name
							}
						})
					})
					.catch(err => {
						uni.hideLoading()
						that.$u.util.showErr(err.msg);
					})
			},
			goPage(path, params) {
				uni.$u.route({
					url: path,
					params: params
				})
			},
			openPage(path, params) {
				uni.$u.route({
					url: path,
					params: {
						id: params.id
					}
				})
			},
			left() {
				console.log('left');
			},
			right() {
				console.log('right');
			},
		}
	}
</script>

<style lang="scss">
	.teacher-item {
		margin-top: 20rpx;
		padding: 32rpx 32rpx 32rpx 42rpx;
		border-radius: 20rpx;
		background-color: #fff;
		box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(85,112,105,0.1);
		
		.scroll-list {
			text {
				border: solid 2rpx #BECCE7;
				color: #5B7EA9;
				padding: 6rpx 12rpx;
				border-radius: 24rpx;
				font-size: 24rpx;
				margin-top: 20rpx;
			}
			
			text:not(:nth-child(4n)) {
				margin-right: 30rpx;
			}
		}
		.teacher-item-top {
			display: flex;
			flex-direction: row;
			margin-bottom: 20rpx;
			.teacher-item-top-right {
				margin-left: 30rpx;
				flex: 1;
				.teacher-item-title {
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					font-size: 32rpx;
					color: #434E5E;
					font-weight: bold;
				}
			}
			.titles {
				
				.title-text{
					text {
						font-size: 24rpx;
						margin-top: 10rpx;
						color: #868E9D;
						width: 280rpx;
						overflow-wrap: break-word;
						line-height: 150%;
					}
				}
				.chat-btn {
					margin-top: 18rpx;
					background: linear-gradient(270deg, #FFC37C 0%, #EE5929 100%);
					border-radius: 40rpx;
					width: 130rpx;
					height: 60rpx;
				}
			}
		}
		
		.teacher-item-skill {
			width: 100%;
			margin-top: 20rpx;
			padding-bottom: 20rpx;
			.skill-title {
				font-size: 24rpx;
				color:#434E5E;
			}
		}
		
		.teacher-item-bottom {
			text-align: center;
			margin-top: 20rpx;
		}
	}
</style>