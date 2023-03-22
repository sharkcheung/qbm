<template>
	<view class="activity-list">
		<view class="activity-item" v-for="(item, index) in listData" :key="index" @click="openPage('/pages/course/info',item)">
			<u--image :showLoading="true" radius="4" :src="item.pic" width="100%" height="180rpx"></u--image>
			<view class="activity-title">{{ item.course_name }}</view>
			<view class="activity-study-num"><text>{{ item.views||0 }}人已学</text><text>{{ item.sale_price ? item.sale_price : '免费' }}</text></view>
			<text v-if="showTeacher" class="teacher-name">{{ item.teacher.teacher_name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"activity-list",
		props: {
			listData: Array,
			showTeacher: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			openPage(path,params) {
				uni.$u.route({
					url: path,
					params: {
						id: params.id
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.activity-list {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		.activity-item {
			width: calc(50% - 10rpx);
			position: relative;
			.activity-title {
				margin-top: 12rpx;
				font-size: 28rpx;
				display: -webkit-box;//定义为盒子模型显示
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;//用来限制在一个块元素显示的文本的行数
				-webkit-box-orient: vertical;//从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
			}
			.activity-study-num {
				margin-top: 8rpx;
				font-size: 24rpx;
				color: #aaa;
				flex-direction: row;
				justify-content: space-between;
				text:last-child {
					color:#c00;
				}
			}
			margin-bottom: 24rpx;
			.teacher-name {
				position: absolute;
				left: 16rpx;
				background: rgba(0,0,0,0.4);
				top: 16rpx;
				color: #efecec;
				font-size: 24rpx;
				padding: 8rpx 16rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>