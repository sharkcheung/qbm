<template>
	<view>
		<view class="teacher-item" v-for="(item, index) in listData" :key="index" @click="openPage('/pages/teacher/homepage')">
			<view class="teacher-item-top">
				<view class="teacher-item-top-left">
					<u-avatar shape="circle" size="40" :src="item.avatar_url" customStyle="margin: 5px 15px -3px 0"></u-avatar>
					<view class="teacher-item-top-left-title">
						{{ item.teacher_name }}
						<text v-for="(item_title, idx) in item.title" :key="idx">{{ item_title }}</text>
					</view>
				</view>
				<view class="teacher-item-top-right">
					<u-rate :value="item.mark" readonly activeColor="#f9ae3d"></u-rate>
				</view>
			</view>
			<view class="teacher-item-skill">
				<u-tag v-for="(item_item, index_item) in item.item" :key="index_item" shape="circle" :text="item_item" plain size="mini" type="error" borderColor="#ffa7a7" color="#ffa7a7"></u-tag>
			</view>
			<view class="teacher-item-bottom">
				可免费约聊时长：{{ item.duration }} 分钟
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"teacher-list",
		props: {
			listData: Array
		},
		data() {
			return {
			};
		},
		mounted() {
			console.log(this.listData)
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

	.teacher-item {
		padding: 32rpx;
		border-radius: 16rpx;
		background-color: #f9f9f9;
		margin-bottom: 18rpx;
		.teacher-item-top {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.teacher-item-top-left {
				flex-direction: row;
				.teacher-item-top-left-title {
					font-size: 32rpx;
					text {
						font-size: 24rpx;
						margin-top: 8rpx;
						color: #a6a6a6;
					}
				}
			}
		}
		
		.teacher-item-skill {
			margin-top: 20rpx;
			padding-bottom: 20rpx;
			flex-direction: row;
			gap: 20rpx;
			border-bottom: #f3f3f3 solid 2rpx;
		}
		
		.teacher-item-bottom {
			text-align: center;
			margin-top: 20rpx;
		}
	}
</style>