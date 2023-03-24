<template>
	<view class="activity-list">
		<view class="activity-item" v-for="(item, index) in listData" :key="index" @click="openPage('/pages/activity/detail',item)">
			<view class="item-top flex-row justify-between">
				<u--image :showLoading="true" radius="4" :src="item.pic" width="268rpx" height="164rpx"></u--image>
				<view class="item-right">
					<view class="activity-title">{{ item.name }}</view>
					<view class="activity-time align-center flex-row"><text>{{ item.start_time | date('mm/dd') }}~{{ item.end_time | date('mm/dd') }}</text>{{ item.city }}</view>
				</view>
			</view>
			<view class="item-bottom align-center flex-row justify-between">
				<view class="apply-time flex-row">报名截止时间：<text>{{ item.deadline_time | date('yyyy.mm.dd hh:MM') }}</text></view>
				<view @click.stop="apply(item)" class="tips" :class="item.deadline_time>timestamp?'apply-btn':''"><u-icon v-if="item.deadline_time>timestamp" size="16" space="5" labelColor="#F35917" labelSize="14" :bold="true" label="火热报名中" :name="huoImg"></u-icon><text v-else>{{ (item.deadline_time<=timestamp&&item.end_time>timestamp)?'报名已截止':'活动已结束' }}</text></view>
			</view>
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
		mounted() {
			this.timestamp = Date.parse(new Date())/1000;
			this.huoImg = this.$configs.staticUrl + '/uploads/api/icon/icon_qbt_huo.svg'
		},
		data() {
			return {
				timestamp: '',
				btnName: '立即报名',
				huoImg: ''
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
			apply(item) {
				if(item.deadline_time>this.timestamp){
					this.openPage('pages/activity/apply',{id:item.id})
				}
				else {
					this.openPage('pages/activity/detail',{id:item.id})
				}
			}
		}
	}
</script>

<style lang="scss">
	.activity-list {
		background-color: #F6F9FE;
		.activity-item {
			width: 100%;
			padding: 30rpx 30rpx 20rpx 30rpx;
			margin-top: 20rpx;
			background: #FFFFFF;
			font-size: 28rpx;
			.item-top {
				padding-bottom: 34rpx;
				border-bottom: 2rpx solid #F5F5F5;
				.item-right {
					flex: 1;
					margin-left: 20rpx;
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
				.apply-btn {
					flex-direction: row;
					align-items: center;
				}
			}
			.activity-title {
				line-height: 40rpx;
				color: #434E5E;
				overflow-wrap: break-word;
			}
			.activity-time {
				margin-top: 44rpx;
				font-size: 20rpx;
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