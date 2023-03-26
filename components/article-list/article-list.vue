<template>
	<view class="article-list">
		<view class="article-item" v-for="(item, index) in listData" :key="index" @click="openPage('/pages/article/detail',item)">
			<view class="item-top flex-row justify-between">
				<view class="item-right justify-between">
					<view class="article-title">{{ item.article_name }}</view>
					<view class="article-time align-center flex-row"><text>{{ item.create_time | date('yyyy.mm.dd hh:MM') }}</text></view>
				</view>
				<u--image :showLoading="true" radius="4" :src="item.pic" width="268rpx" height="164rpx"></u--image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"article-list",
		props: {
			listData: Array,
			from: {
				type: String,
				default: ''
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
						id: params.id,
						from: this.from
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.article-list {
		background-color: #F6F9FE;
		.article-item {
			width: 100%;
			padding: 30rpx 30rpx 20rpx 30rpx;
			margin-top: 20rpx;
			background: #FFFFFF;
			font-size: 28rpx;
			.item-top {
				.item-right {
					flex: 1;
					margin-right: 20rpx;
				}
			}
			.item-bottom {
				margin-top: 30rpx;
				.apply-time {
					font-size: 24rpx;
					color: #868E9D;
					text {
						color: #434E5E;
					}
				}
				.tips {
					color: #434E5E;
					font-weight: bold;
				}
				.status {
					width: 180rpx;
					height: 60rpx;
					font-size: 28rpx;
					border-radius: 40rpx;
					color: #F35917;
					line-height: 60rpx;
					text-align: center;
				}
				.audit {
					color: #FFFFFF;
					background: linear-gradient(270deg, #A5B8E6 0%, #44598B 100%);
				}
				.fail {
					color: #FFFFFF;
					background: linear-gradient(270deg, #898989 0%, #464646 100%);
				}
				.apply-btn {
					flex-direction: row;
					align-items: center;
				}
			}
			.article-title {
				line-height: 40rpx;
				color: #434E5E;
				overflow-wrap: break-word;
			}
			.article-time {
				font-size: 24rpx;
				color: #868E9D;
				text {
					margin-right: 20rpx;
				}
			}
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