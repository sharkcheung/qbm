<template>
	<view>
		<view class="live-list flex-col" v-for="(item,index) in listData" :key="index" @click="goLive(item.roomid)">
			<view class="live-preview flex-row justify-between" v-if="item.live_status==102||item.live_status==103">
				<view v-if="item.live_status==102" class="flex-row live-time align-center">{{ item.start_date }} <text class="start-hour">{{ item.start_hour }}</text>:<text>{{ item.start_min }}</text></view>
				<view v-if="item.live_status==103" class="playback"><u-icon color="#868E9D" size="24" name="eye" labelColor="#434E5E" :label="'观看数 '+item.view_nums" space="10"></u-icon></view>
				<view class="flex-row">
					<text class="tips align-center justify-center" v-if="item.live_status==102">开播提醒</text>
					<u-icon size="20" :name="shareImg"></u-icon>
				</view>
			</view>
			<view class="live-title" v-if="item.live_status==102">
				{{ item.name }}
			</view>
			<view class="cover-img">
			<u--image :src="item.cover_img" width="100%" height="350rpx"></u--image>
			<view class="living" :class="item.live_status==103?'replay':''" v-if="item.live_status==103||item.live_status==101">
				<view class="image-text_4 flex-row justify-between align-center">
					<text class="thumbnail_5" v-if="item.live_status==101"></text>
					<text class="text-group_4">{{ item.live_status==101 ? '直播中' : '回放'}}</text>
				</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "live-list",
		props: {
			listData: Array
		},
		data() {
			return {
				shareImg: ''
			};
		},
		filters: {
		    //3.定义一个处理函数，参数value为要处理数据
		    conversion: function (value) {
		      //调用Date的方法，处理时间戳
		      return new Date(value).toLocaleString();
		    },
		},
		mounted() {
			this.shareImg = this.$configs.staticUrl + '/uploads/api/icon/fx.svg'
			console.log(this.listData)
		},
		methods: {
			goLive(roomid) {
				let url = "plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id="+roomid
				uni.$u.route({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	.live-list {
		width: 100%;
		border-radius: 8px;
		.live-preview {
			margin-bottom: 20rpx;
			.flex-row {
				.tips {
					margin-right: 40rpx;
					width: 128rpx;
					height: 52rpx;
					background: linear-gradient(180deg, #FF9760 0%, #EE5F15 100%);
					border-radius: 10rpx;
					font-size: 24rpx;
					color: #fff;
				}
			}
			.live-time {
				font-size: 32rpx;
				color: #EE5200;
				text {
					border-radius: 6rpx;
					border: 2rpx solid #EE5200;
					margin: 0 8rpx;
					padding: 0 10rpx;
				}
				.start-hour {
					margin-left: 16rpx;
				}
			}
		}
		.live-title {
			line-height: 100%;
			color: #16202E;
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}
		.cover-img {
			position: relative;
			.living {
				position: absolute;
				left: 20rpx;
				top: 20rpx;
				background-color: rgba(0, 0, 0, 0.5);
				border-radius: 10px;
				padding: 8rpx;
				color: #fff;

				.image-text_4 {
					.thumbnail_5 {
						width: 16rpx;
						height: 16rpx;
						border-radius: 8rpx;
						background: #D0021B;
						margin-right: 8rpx;
						margin-left: 8rpx;
					}

					.text-group_4 {
						overflow-wrap: break-word;
						color: rgba(255, 255, 255, 1);
						font-size: 24rpx;
						text-align: left;
						white-space: nowrap;
						line-height: 150%;
					}
				}
			}
			.replay {
				 padding: 8rpx 26rpx 8rpx 26rpx;
			}
		}
	}
</style>
