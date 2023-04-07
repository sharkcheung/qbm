<template>
	<view class="footer">
		<view class="footer-left" v-if="0" @tap="startRecognize">
			<u-icon size="20" name="https://static.miniapp.qbt.qebang.cn/uploads/api/icon/voice.svg"></u-icon>
		</view>
		<view class="footer-center">
			<u--input class="input-text" shape="circle" :border="false" type="text" v-model="inputValue" placeholder="请输入要咨询的内容"></u--input>
		</view>
		<view class="footer-right" id='msg-type' @tap="sendMessge">
			<u-icon size="16" labelColor="#434E5E" label="发送" name="https://static.miniapp.qbt.qebang.cn/uploads/api/icon/send-f.svg"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		name:"chat-input",
		data() {
			return {
				inputValue: '',
			}
		},
		methods: {
			startRecognize: function () {
				var options = {};
				var that = this;
				options.engine = 'iFly';
				that.inputValue = "";
				plus.speech.startRecognize(options, function (s) {
					console.log(s);
					that.inputValue += s;
				}, function (e) {
					console.log("语音识别失败：" + e.message);
				});
			},
			sendMessge: function () {
				var that = this;
				if (that.inputValue.trim() == '') {

					that.inputValue = '';
				} else {

					//点击发送按钮时，通知父组件用户输入的内容
					this.$emit('send-message', {
						type: 'text',
						content: that.inputValue
					});
					that.inputValue = '';
				}
			}
		}
	}
</script>

<style lang="scss">


	.footer {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 45px;
		border-top: solid 1rpx #eef1f5;
		overflow: hidden;
		background-color: #fff;
	}
	.footer-left {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 0 0 32rpx;
	}
	.footer-right {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #434E5E;
		margin: 0 32rpx;
	}
	.footer-center {
		flex: 1;
		display: flex;
		justify-content: center;
		background: #eef1f5;
		margin: 10rpx 0 10rpx 32rpx;
		border-radius: 32rpx;
		padding: 8rpx 16rpx;
	}
	.footer-center .input-text {
		flex: 1;
		border: none;
		overflow: hidden;
		width: 100%;
	}
</style>