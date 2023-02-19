<template>
	<view>
		<view class="teacher-item" v-for="(item, index) in listData" :key="index" @click="openPage('/pages/teacher/homepage', item)">
			<view class="teacher-item-top">
				<view class="teacher-item-top-left">
					<u-avatar shape="circle" size="40" :src="item.avatar_url" customStyle="margin: 5px 15px -3px 0"></u-avatar>
					<view class="teacher-item-top-left-title">
						{{ item.teacher_name }}
						<text v-for="(item_title, idx) in item.title.split(',')" :key="idx">{{ item_title }}</text>
					</view>
				</view>
				<view class="teacher-item-top-right">
					<u-rate :value="item.mark" readonly activeColor="#f9ae3d"></u-rate>
				</view>
			</view>
			<view class="teacher-item-skill">
				<u-scroll-list
				indicatorColor="#fff0f0"
				indicatorActiveColor="#f56c6c"
				@right="right"
				@left="left">
					<view class="scroll-list" style="flex-direction: row;">
					<u-tag v-for="(item_item, index_item) in item.service" :key="index_item" shape="circle" :text="item_item.name" plain size="mini" type="error" borderColor="#ffa7a7" color="#ffa7a7"></u-tag>
					</view>
				</u-scroll-list>
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
	.scroll-list {
		@include flex(column);
	}
	.teacher-item {
		padding: 32rpx;
		border-radius: 16rpx;
		background-color: #f9f9f9;
		margin-bottom: 18rpx;
		
		.scroll-list {
			gap: 20rpx;
		}
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
			width: 100%;
			margin-top: 20rpx;
			padding-bottom: 20rpx;
			flex-direction: row;
			border-bottom: #f3f3f3 solid 2rpx;
		}
		
		.teacher-item-bottom {
			text-align: center;
			margin-top: 20rpx;
		}
	}
</style>