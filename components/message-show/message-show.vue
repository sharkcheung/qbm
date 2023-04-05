<template>
	<view class="m-item" :id="'message'+messageId" :class="message.user=='customer'?'m-customer-item':''" @click="copyHandle(message.content)">
		<view class="m-left">
			<image class="head_icon" :src="assistantPic" v-if="message.user=='home'"></image>
		</view>
		<view class="m-content">
			<view class="m-content-head" :class="{'m-content-head-right':message.user=='customer'}">
				<view :class="'m-content-head-'+message.user">{{message.content}} </view>
			</view>
		</view>
		<view class="m-right">
			<image class="head_icon" :src="vuex_user.pic" v-if="message.user=='customer'"></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name:"message-show",
		data() {
			return {
				assistantPic: ''
			};
		},
		props: ['message', 'messageId'],
		computed: mapState(['vuex_user']),
		mounted() {
			this.assistantPic = 'https://static.miniapp.qbt.qebang.cn/uploads/api/icon/assistant.svg?R=2023'
		},
		methods: {
			copyHandle(data){
				uni.setClipboardData({
					data: data, // data的值为你要复制的内容
					success: res => {
						uni.showToast({
							title:'复制成功',
							icon:'success'
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.m-item {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding: 20rpx 30rpx 20rpx 30rpx;
	}
	.m-customer-item {
		justify-content: flex-end;
	}
	.m-left {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		margin-right: 12rpx;
	}
	.m-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		word-break: break-all;
		max-width: 80%;
	}
	.m-right {
		margin-left: 24rpx;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}
	.head_icon {
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
	}
	.m-content-head {
		position: relative;
		white-space: pre-wrap;
	}
	.m-content-head-right {
		display: flex;
		justify-content: flex-end;
	}
	.m-content-head-home {
		text-align: left;
		background: #eef1f5;
		border: 1rpx #eef1f5 solid;
		border-radius: 20rpx;
		padding: 20rpx;
		color: #434E5E;
	}
	.m-content-head-customer {
		border: 1rpx #eef1f5 solid;
		background: #eef1f5;
		border-radius: 20rpx;
		padding: 20rpx;
	}
</style>