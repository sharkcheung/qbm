<template>
	<view class="video-list">
		<view class="video-item" v-for="(item, index) in listData" :key="index" @click="openPage('/pages/course/info')">
			<u--image :showLoading="true" radius="4" :src="item.pic" width="100%" height="180rpx" @click="click"></u--image>
			<view class="video-title">{{ item.title }}</view>
			<view class="video-study-num">{{ item.num }}人已学</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"video-list",
		props: {
			listData: Array
		},
		data() {
			return {
				
			};
		},
		methods:{
			openPage(path) {
				uni.$u.route({
					url: path
				})
			},
		}
	}
</script>

<style lang="scss">
	.video-list {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		.video-item {
			width: calc(50% - 10rpx);
			.video-title {
				margin-top: 12rpx;
				font-size: 28rpx;
			}
			.video-study-num {
				margin-top: 8rpx;
				font-size: 24rpx;
				color: #aaa;
			}
			margin-bottom: 24rpx;
		}
	}
</style>