module.exports = (vm) => {
	// 封装日志打印模块
	const writeLog = (msg) => {
		console.log(msg)
		if (vm.$configs.isLogToServer) {
			vm.$u.api.writeLog({
				logStr: JSON.stringify(msg)
			})
		}
	}
	// 提取url中的解析字符串
	const urlParamHash = (url) => {
		var params = [],
			h;
		var hash = url.slice(url.indexOf("?") + 1).split('&');
		for (var i = 0; i < hash.length; i++) {
			h = hash[i].split("="); //
			params[h[0]] = h[1];
		}
		return params;
	}
	const jumpOpenBox = (url, from) => {
		// console.log(url)
		// console.log(url.indexOf(vm.$configs.qrcodeUrl)==0||url.indexOf(vm.$configs.activateQrcodeUrl)==0)
		if (url.indexOf(vm.$configs.qrcodeUrl) == 0 || url.indexOf(vm.$configs.activateQrcodeUrl) == 0) {
			var params = vm.$u.util.urlParamHash(url)
			// console.log(params.hasOwnProperty('deviceCode'))
			if (params.hasOwnProperty('deviceCode') && params.hasOwnProperty('t')) {
				if (from == 'home') {
					// uni.getLocation({
					// 	type: 'gcj02',
					// 	altitude: true,
					// 	isHighAccuracy: true,
					// 	success: function(res) {
					// 		console.log('获取定位成功')
					// console.log(1)
					// console.log(res)
					// console.log('当前位置的经度：' + res.longitude);
					// console.log('当前位置的纬度：' + res.latitude);
					// vm.$u.vuex('vuex_longitude', res.longitude);
					// vm.$u.vuex('vuex_latitude', res.latitude);
					var message = vm.vuex_message
					message.status = 6
					vm.$u.vuex('vuex_message', Object.assign({}, message))
					// 设置当前开箱来源为扫码
					vm.$u.vuex('vuex_open_from', 2)
					console.log('进入选箱页面,设置状态为6')
					console.log('获取定位成功,当前经纬度:' + vm.vuex_longitude + ',' + vm.vuex_latitude)

					// console.log('获取完经纬度，参数：'+JSON.stringify(params))
					uni.hideLoading()
					if (url.indexOf(vm.$configs.qrcodeUrl) == 0) {
						vm.$u.route({
							url: 'pages/openbox/index',
							params: {
								deviceCode: params['deviceCode'],
								t: params['t']
							},
							// type: 'redirectTo'
						});
					}
					if (url.indexOf(vm.$configs.activateQrcodeUrl) == 0) {
						vm.$u.route({
							url: 'pages/public/activate',
							params: {
								deviceCode: params['deviceCode'],
								t: params['t']
							},
							// type: 'redirectTo'
						});
					}
					// 	},
					// 	fail:function(err){
					// 		console.log(err)
					// 	}
					// })
				} else {
					var message = vm.vuex_message
					message.status = 6
					vm.$u.vuex('vuex_message', Object.assign({}, message))
					// 设置当前开箱来源为扫码
					vm.$u.vuex('vuex_open_from', 2)
					console.log('微信扫码进入选箱页面,设置状态为6')
					console.log('微信扫码，参数：', params)


					// var logMsg = {
					// 	nickName: vm.vuex_user.nickName,
					// 	event: '微信扫码',
					// 	deviceCode: params['deviceCode'],
					// 	longitude: vm.vuex_longitude,
					// 	latitude: vm.vuex_latitude,
					// 	message: message,
					// 	qrcodeUrl: url
					// }
					// vm.$u.util.writeLog(logMsg)

					uni.hideLoading()
					if (url.indexOf(vm.$configs.qrcodeUrl) == 0) {
						vm.$u.route({
							url: 'pages/openbox/index',
							params: {
								deviceCode: params['deviceCode'],
								t: params['t']
							},
							// type: 'redirectTo'
						});
					}
					if (url.indexOf(vm.$configs.activateQrcodeUrl) == 0) {
						vm.$u.route({
							url: 'pages/public/activate',
							params: {
								deviceCode: params['deviceCode'],
								t: params['t']
							},
							// type: 'redirectTo'
						});
					}
				}
			} else {
				uni.hideLoading()
				vm.$u.toast('参数错误！')
				return false
			}
		} else {
			uni.hideLoading()
			vm.$u.toast('未识别的二维码！')
			return false
		}
	}
	// 转换字符数值为真正的数值
	const navbarHeight = () => {
		const systemInfo = wx.getSystemInfoSync();
		// #ifdef MP
		// 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
		// 此方法有缺陷，暂不用(会导致少了几个px)，采用直接固定值的方式
		// return menuButtonInfo.height + (menuButtonInfo.top - this.statusBarHeight) * 2;//导航高度
		let height = systemInfo.platform == 'ios' ? 44 : 48;
		return height;
		// #endif
	}
	const callTel = (tel) => {
		wx.makePhoneCall({
			phoneNumber: tel
		})
	}
	const formatPhone = (mobile) => {
		var reg = /^(\d{3})\d{4}(\d{4})$/;
		mobile = mobile.replace(reg, "$1****$2");
		return mobile
	}

	const formatDate = (date, fmt) => {
		date = new Date(date)
		let ret;
		const opt = {
			"Y+": date.getFullYear().toString(), // 年
			"m+": (date.getMonth() + 1).toString(), // 月
			"d+": date.getDate().toString(), // 日
			"H+": date.getHours().toString(), // 时
			"M+": date.getMinutes().toString(), // 分
			"S+": date.getSeconds().toString() // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length,
					"0")))
			};
		};
		return fmt;
	}

	const showErr = (msg) => {
		uni.showToast({
			title: msg,
			duration: 2000,
			icon: 'none',
			mask: true
		});
	}

	const getWasteTypeInfo = (id, k) => {
		var arr = vm.vuex_wasteTypeList.filter(function(val) {
			return val.id == id
		})
		return arr[0][k]
	}

	const getReportTypeInfo = (id, k) => {
		var arr = vm.vuex_reportList.filter(function(val) {
			return val.id == id
		})
		return arr[0][k]
	}

	const getRecycleType = (id) => {
		var recycleType = vm.vuex_recycleTypeList.filter(val => {
			return val.id == id
		})
		return recycleType[0].name
	}

	const updateLocation = (res) => {
		this.$u.vuex('vuex_longitude', res.longitude);
		this.$u.vuex('vuex_latitude', res.latitude);
		console.log('更新时间：' + new Date())

		var lnglat = res.longitude + ',' + res.latitude
		if (process.env.NODE_ENV === 'development') {
			lnglat = '113.900574,22.528753'
		}
		console.log(lnglat)
		var nearbyDevice = __this.vuex_nearbyDevice
		__this.$u.api.nearbyDevice({
			getdistance: lnglat
		}).then(res => {
			if (res.data != null) {
				uni.offLocationChange(function(r) {
					console.log('取消监听实时地理位置变化', r)
				})
				nearbyDevice = res.data
				console.log('附近设备：' + JSON.stringify(nearbyDevice))
				__this.$u.vuex('vuex_nearbyDevice', null)
				__this.$u.vuex('vuex_nearbyDevice', nearbyDevice)
				__this.$u.vuex('vuex_currentDeviceInfo', null)
				__this.$u.vuex('vuex_currentDeviceInfo', nearbyDevice)
			} else {
				nearbyDevice.lng = ''
				nearbyDevice.lat = ''
				nearbyDevice.title = '当前无可用投递柜'
				nearbyDevice.distance = ''
				__this.$u.vuex('vuex_nearbyDevice', null)
				__this.$u.vuex('vuex_nearbyDevice', nearbyDevice)
				__this.$u.vuex('vuex_currentDeviceInfo', null)
				__this.$u.vuex('vuex_currentDeviceInfo', nearbyDevice)
			}
		}).catch(err => {
			console.log(err)
			nearbyDevice.lng = ''
			nearbyDevice.lat = ''
			nearbyDevice.title = '获取附近智能柜失败！'
			nearbyDevice.distance = ''
			__this.$u.vuex('vuex_nearbyDevice', null)
			__this.$u.vuex('vuex_nearbyDevice', nearbyDevice)
			__this.$u.vuex('vuex_currentDeviceInfo', null)
			__this.$u.vuex('vuex_currentDeviceInfo', nearbyDevice)
		})
		// console.log(__this.vuex_currentDeviceInfo)
		// console.log(__this.vuex_currentDeviceInfo)
		let qqmapsdk = new QQMapWX({
			key: '2GABZ-I233Q-SZB5B-GHBYV-FKTNJ-O5FP2'
		});
		//逆地址解析
		qqmapsdk.reverseGeocoder({
			location: {
				latitude: res.latitude,
				longitude: res.longitude
			},
			success(res) {
				if (res.status == 0) {
					__this.$u.vuex('vuex_homeTitle', res.result.formatted_addresses.recommend)
				}
			}
		});
	}

	const goBackHome = (deviceCode) => {

		vm.$u.api
			.goBack({
				deviceCode: deviceCode
			})
			.then(res => {
				vm.$u.vuex('vuex_message', {});
				vm.$u.vuex('vuex_currentDeviceInfo', {});
				vm.$u.route({
					url: 'pages/home/index',
					type: 'switchTab'
				});
			})
			.catch(res => {
				vm.$u.util.showErr(res.msg);
			});
	}

	// 开箱
	const openBox = (item, updownFlag, t, open_from) => {
		// 先判断从哪里开箱
		if (Object.keys(vm.vuex_currentDeviceInfo).length == 0) {
			// 首页一键开箱
			if (Object.keys(vm.vuex_nearbyDevice).length == 0) {
				// 如果附近设备没有数据，则提示错误信息
				vm.$u.util.showErr('附近暂无设备')
				vm.$u.vuex('vuex_pressed_index', -1)
				return false
			} else {
				let deliver_info = vm.vuex_one_key_open_deliver_info
				if ('count' in deliver_info && 'date' in deliver_info) {
					if (parseInt(deliver_info.count) >= parseInt(vm.vuex_one_key_open_deliver_count_limit)) {
						// 锁定状态
						console.log(new Date().getTime(), deliver_info.unsealTime)
						if (new Date().getTime() > deliver_info.unsealTime) {
							// 如果当前时间大于记录的锁定时间，则重置一键开箱累计次数
							deliver_info.count = 0
							deliver_info.date = ''
							deliver_info.unsealTime = ''
							vm.$u.vuex('vuex_one_key_open_deliver_info', deliver_info)
						} else {
							console.log(vm.$u.timeFormat(deliver_info.unsealTime, 'yyyy-mm-dd hh:MM:ss'))
							vm.$u.util.showErr('一键开柜次数已超上限，请' + vm.$u.timeFormat(deliver_info.unsealTime,
								'yyyy-mm-dd hh:MM:ss') + '后再使用！')
							return false
						}
					}
				}
				var currentDevice = vm.vuex_nearbyDevice
			}
		} else {
			// 选箱页面开箱
			var currentDevice = vm.vuex_currentDeviceInfo
		}
		// return false
		var __this = vm

		// 判断当前用户是否登录
		if (!vm.vuex_token) {

			vm.$u.util.showErr('请登录后再操作')
			setTimeout(() => {
				vm.$u.route('pages/public/login', {
					path: '/pages/home/index',
					type: 'switchTab'
				})
			}, 2000)
			return false
		}

		// 判断当前用户距离设备距离是否在允许开箱阀值内
		// console.log(parseFloat(vm.vuex_nearbyDevice.distance),parseFloat(vm.vuex_can_open_distance))
		if (parseFloat(currentDevice.distance) > parseFloat(vm.vuex_can_open_distance)) {
			// 大于开箱阀值
			vm.$u.util.showErr('走近智能回收柜，才能开柜哦')
			vm.$u.vuex('vuex_pressed_index', -1)
			if (t != '') {
				vm.$u.util.goBackHome(currentDevice.deviceCode)
			}
			return false
		}

		if (t !== '1619347006021') {
			// 不是固定码就需要判断是否支持当前开箱方式
			console.log(item)
			// 判断当前选择箱子是否支持当前开箱方式
			if (item.openTypes.indexOf(1) < 0) {
				vm.$u.util.showErr('当前垃圾柜不支持此种开柜方式！')
				vm.$u.vuex('vuex_pressed_index', -1)
				if (t != '') {
					vm.$u.util.goBackHome(currentDevice.deviceCode)
				}
				return false
			}
		}

		// 判断当前选择箱子是否正常状态
		if (item.status > 0) {
			vm.$u.util.showErr('当前垃圾柜暂停使用！')
			vm.$u.vuex('vuex_pressed_index', -1)
			if (t != '') {
				vm.$u.util.goBackHome(currentDevice.deviceCode)
			}
			return false
		}

		// 开上箱
		if (updownFlag == 1) {
			// console.log(item)

			// 判断当前选择箱子是否已满
			if (item.fullStatus == 1) {
				vm.$u.util.showErr('抱歉，该柜已满无法继续投递')
				vm.$u.vuex('vuex_pressed_index', -1)
				if (t != '') {
					vm.$u.util.goBackHome(currentDevice.deviceCode)
				}
				return false
			}
			if (vm.vuex_currentDeviceInfo.operateMark == 1) {
				// 当前是清运人员
				vm.$u.util.showErr('清运人员不能进行投递操作')
				vm.$u.vuex('vuex_pressed_index', -1)
				if (t != '') {
					vm.$u.util.goBackHome(currentDevice.deviceCode)
				}
				return false
			}
		}
		// 开下箱
		else if (updownFlag == 2) {
			// 判断当前选择箱子是否正常状态

			// 判断当前是否是清运人员或管理员
			if (currentDevice.operateMark > 0) {
				// 判断是否有清运当前垃圾箱的权限
				if (currentDevice.clearBoxs.indexOf(item.id) < 0) {
					vm.$u.util.showErr('没有清运当前垃圾柜的权限')
					vm.$u.vuex('vuex_pressed_index', -1)
					if (t != '') {
						vm.$u.util.goBackHome(currentDevice.deviceCode)
					}
					return false
				}
			} else {
				// 普通用户没有清运权限
				vm.$u.util.showErr('您没有清运垃圾柜的权限')
				vm.$u.vuex('vuex_pressed_index', -1)
				if (t != '') {
					vm.$u.util.goBackHome(currentDevice.deviceCode)
				}
				return false
			}
		} else {
			vm.$u.util.showErr('参数错误！')
			vm.$u.vuex('vuex_pressed_index', -1)
			if (t != '') {
				vm.$u.util.goBackHome(currentDevice.deviceCode)
			}
			return false
		}
		vm.$u.vuex('vuex_pressed_index', -1)
		currentDevice.boxId = item.id
		currentDevice.updownFlag = updownFlag
		console.log('赋值后：', currentDevice)
		vm.$u.vuex('vuex_currentDeviceInfo', Object.assign({}, currentDevice))
		console.log('点击开柜，当前操作设备信息：', vm.vuex_currentDeviceInfo)
		clearTimeout(getApp().globalData.timer)
		console.log(item)
		var messages = vm.vuex_message
		messages.status = 0
		messages.boxId = item.id
		messages.deviceCode = vm.vuex_currentDeviceInfo.deviceCode
		messages.updownFlag = updownFlag
		vm.$u.vuex('vuex_message', Object.assign({}, messages))

		var eventTitle = ''
		if (vm.vuex_open_from == 1) {
			eventTitle = '首页一键开柜'
		} else {
			eventTitle = '选柜界面开柜'
		}
		var logMsg = {
			event: eventTitle,
			nickName: vm.vuex_user.nickName,
			deviceCode: vm.vuex_currentDeviceInfo.deviceCode,
			boxId: item.id,
			order: item.order,
			boxLocation: item.boxLocation,
			updownFlag: updownFlag
		}
		vm.$u.util.writeLog(logMsg)
		console.log('开箱：t=' + t)
		if (t != '') {
			vm.$u.route({
				url: 'pages/openbox/operation',
				type: 'redirectTo',
				params: {
					t: t
				}
			})
		} else {
			console.log('open_from', open_from)
			if (vm.vuex_open_from == 1) {
				vm.$u.route({
					url: 'pages/openbox/operation',
					params: {
						open_from: 1
					}
				})
			} else {
				vm.$u.route({
					url: 'pages/openbox/operation',
					type: 'redirectTo',
					params: {
						t: t,
						open_from: open_from
					}
				})
			}
		}
		// uni.showLoading({
		// 	title: '开箱中...',
		// 	mask: true
		// })
		// __this.$u.api.oprateBox({
		// 	deviceCode: __this.vuex_currentDeviceInfo.deviceCode,
		// 	boxId: item.id,
		// 	updownFlag: updownFlag
		// }).then(res => {
		// 	__this.$u.vuex('vuex_operateMode', updownFlag)
		// 	getOpenBoxStatus()
		// }).catch(err=>{
		// 	if(err.code==100){
		// 		vm.$u.util.showErr(err.msg)
		// 	}
		// 	else{
		// 		vm.$u.util.showErr(err.msg)
		// 	}
		// })

	}

	// 获取开箱状态
	// const getOpenBoxStatus = () => {
	// 	var __this = vm
	// 	vm.$u.api.getBoxStatus({
	// 		deviceCode: __this.vuex_currentDeviceInfo.deviceCode,
	// 	}).then(res => {
	// 		console.log('aaaa',getApp().globalData.openBoxStatusTimer)
	// 		getApp().globalData.openBoxStatusTimer = setTimeout(()=>{

	// 			var status = parseInt(res.data.status)
	// 			console.log('当前状态1：',status)
	// 			if (status <= 0 || status == 6){
	// 				if(status==0){

	// 					var counter = vm.vuex_counter
	// 					counter++
	// 					vm.$u.vuex('vuex_counter', counter)
	// 					console.log('开箱时间：'+counter)
	// 					if(counter>120){
	// 						// 超过120秒，直接走异常
	// 						clearTimeout(getApp().globalData.openBoxStatusTimer)
	// 						vm.$u.util.showErr('开箱失败')
	// 						vm.$u.vuex('vuex_counter', 0)
	// 						vm.$u.api.excetionDeal({deviceCode:__this.vuex_currentDeviceInfo.deviceCode}).then(res=>{

	// 							vm.$u.route('pages/home/index',
	// 								{
	// 									type: 'switchTab'
	// 								}
	// 							)
	// 						})
	// 						return false
	// 					}
	// 				}
	// 				getOpenBoxStatus()
	// 			} 
	// 			else if(status == 7){
	// 				// 获取到7直接跳转到首页
	// 				clearTimeout(getApp().globalData.openBoxStatusTimer)

	// 				vm.$u.util.showErr('获取到状态7，跳转首页')
	// 				vm.$u.route(
	// 					{
	// 						url:'pages/home/index',
	// 						type: 'switchTab'
	// 					}
	// 				)
	// 			}
	// 			else {
	// 				console.log('当前状态2：',status)
	// 				__this.$u.vuex('vuex_deviceCode', __this.vuex_currentDeviceInfo.deviceCode)
	// 				// __this.$u.vuex('vuex_boxId', boxId)
	// 				// __this.openBoxStatus == 1
	// 				uni.hideLoading()
	// 				__this.$u.route({
	// 					url: 'pages/openbox/operation'
	// 				})
	// 			}
	// 		}, 1000)
	// 	})
	// }


	const connectMqtt = () => {
		var __this = vm
		// if (Object.keys(__this.vuex_user).length > 0) {
		// 	if (!__this.vuex_is_connected) {
		// 		const Stomp = require('./stomp-new.js').Stomp
		// 		// console.log(Stomp)
		// 		//socket是否连接
		// 		var socketConnected = false;
		// 		//待发送的消息队列
		// 		var messageQueue = [];
		// 		//是否断线重连
		// 		var reconnect = true;

		// 		//发送消息
		// 		function sendSocketMessage(msg) {
		// 			// console.log(msg);
		// 			// 如果socket已连接则发送消息
		// 			if (socketConnected) {
		// 				wx.sendSocketMessage({
		// 					data: msg
		// 				});
		// 			} else {
		// 				// socket没有连接将消息放入队列中
		// 				messageQueue.push(msg);
		// 			}
		// 		}

		// 		// 关闭连接
		// 		function close() {
		// 			if (socketConnected) {
		// 				wx.closeSocket();
		// 			}
		// 		}

		// 		// 定义一个符合WebSocket定义的对象
		// 		var ws = {
		// 			send: sendSocketMessage,
		// 			close: close
		// 		};
		// 		//心跳检测
		// 		var heartCheck = {
		// 			timeout: 60000, //1分钟发一次心跳
		// 			timeoutObj: null,
		// 		 serverTimeoutObj: null,
		// 			reset: function() {
		// 				clearTimeout(this.timeoutObj);
		// 				clearTimeout(this.serverTimeoutObj);
		// 				return this;
		// 			},
		// 			start: function() {
		// 				var self = this;
		// 				this.timeoutObj = setTimeout(function() {
		// 		 		//这里发送一个心跳，后端收到后，返回一个心跳消息，
		// 					//onmessage拿到返回的心跳就说明连接正常
		// 					stompClient.send(__this.vuex_user.mpResponseTopic, {}, "ping");
		// 					console.log("ping!")
		// 					heartCheck.start()
		// 				}, this.timeout)
		// 			}
		// 		}

		// 		// 创建一个 WebSocket 连接
		// 		function connect() {
		// 			wx.connectSocket({
		// 				url: __this.vuex_user.mpUrl, // activemq的ws端口
		// 				protocols: ['stomp'] //指明协议类型，这里很重要，否则客户端会因为报文头缺少协议信息拒绝连接
		// 			});
		// 		}

		// 		connect();

		// 		// 监听 WebSocket 连接打开事件
		// 		wx.onSocketOpen(function(res) {
		// 			console.log('WebSocket 连接成功：' + new Date().toLocaleString());
		// 			socketConnected = true;
		// 			__this.$u.vuex('vuex_is_connected', true);
		// 			heartCheck.reset().start(); //心跳检测重置
		// 			ws.onopen();
		// 			// 连接成功后，将队列中的消息发送出去
		// 			let queueLength = messageQueue.length;
		// 			for (let i = 0; i < queueLength; i++) {
		// 				const messageQueueElement = messageQueue.shift();
		// 				wx.sendSocketMessage({
		// 					data: messageQueueElement
		// 				});
		// 			}
		// 		});

		// 		// 监听 WebSocket 接受到服务器的消息事件
		// 		wx.onSocketMessage(function(res) {
		// 			heartCheck.reset().start(); //心跳检测重置
		// 			ws.onmessage(res);
		// 		});

		// 		// 监听 WebSocket 错误事件
		// 		wx.onSocketError(function(res) {
		// 			console.log('WebSocket 错误事件');
		// 		});

		// 		// 监听 WebSocket 连接关闭事件
		// 		wx.onSocketClose(function(res) {
		// 			console.log('WebSocket 连接关闭：' + new Date().toLocaleString());
		// 			socketConnected = false;
		// 			__this.$u.vuex('vuex_is_connected', false);
		// 			// 断线重连
		// 			if (reconnect) {
		// 				connect();
		// 			}
		// 		});

		// 		/**
		// 		 * 定期发送心跳或检测服务器心跳
		// 		 *  The heart-beating is using window.setInterval() to regularly send heart-beats and/or check         server heart-beats.
		// 		 *  可看stomp.js的源码（195,207，489行），由于小程序没有window对象，所以我们要调用小程序的定时器api实现
		// 		 */
		// 		Stomp.setInterval = function(interval, f) {
		// 			return setInterval(f, interval);
		// 		};
		// 		// 结束定时器的循环调用
		// 		Stomp.clearInterval = function(id) {
		// 			return clearInterval(id);
		// 		};

		// 		var client_id = `mp${__this.vuex_user.id}${new Date().getTime()}`;
		// 		__this.$u.vuex('vuex_client_id', client_id)
		// 		var stompClient = Stomp.over(ws);
		// 		var option = {
		// 			login: __this.vuex_user.username,
		// 			passcode: __this.vuex_user.password,
		// 			'client-id': client_id
		// 		};
		// 		stompClient.connect(option,
		// 			function() {
		// 				stompClient.subscribe(__this.vuex_user.mpResponseTopic, __this.$u.util.onMessage)
		// 			}
		// 		)
		// 	}
		// }
	}

	const onMessage = (message) => {
		var __this = vm
		// console.log('主題訂阅成功')
		// console.log('获取到的消息：'+ message.body);
		// console.log('获取到消息时，当前操作设备信息：'+ JSON.stringify(__this.vuex_currentDeviceInfo));
		if (message.body) {
			// console.log('获取到的消息：'+message.body)
			// console.log('获取到消息时，当前操作设备信息：', __this.vuex_currentDeviceInfo)
			try {
				var messages = JSON.parse(message.body)
				// console.log('消息体deviceCode：'+ messages.deviceCode);
				// console.log('本地deviceCode：'+ __this.vuex_currentDeviceInfo.deviceCode);
				// console.log('消息体userid：'+ messages.userId);
				// console.log('本地id：'+ __this.vuex_user.id);
				if (messages.deviceCode == __this.vuex_currentDeviceInfo.deviceCode && messages.userId == __this
					.vuex_user.id) {
					var logMsg = {
						nickName: __this.vuex_user.nickName,
						event: '收到消息',
						client_id: __this.vuex_client_id,
						messages: messages,
						current_user_id: __this.vuex_user.id,
						current_device_code: __this.vuex_currentDeviceInfo.deviceCode
					}
					__this.$u.util.writeLog(logMsg)
					__this.$u.vuex('vuex_message', Object.assign({}, messages))
					console.log('当前操作设备的消息：' + message.body)
				}
			} catch (e) {
				//TODO handle the exception
			}
		}
	}

	const isIphoneX = () => {
		let mobile = wx.getSystemInfoSync();
		// console.log(mobile)
		if (mobile.model.indexOf("iPhone") > -1 && mobile.safeArea.top > 20) {
			return true;
		} else {
		 return false;
		}
	}
	/**
	 * JS格式化现在距${endTime}的剩余时间
	 * @param  {Date} endTime
	 * @return {String}
	 */
	const formatRemainTime =(endTime, type) => {
	    var startDate = new Date(); //开始时间
	    var endDate = new Date(endTime); //结束时间
	    var t = endDate.getTime() - startDate.getTime(); //时间差
		if(type==0) {
			return t;
		}
	    var d = 0,
	        h = 0,
	        m = 0,
	        s = 0;
	    if (t >= 0) {
	        d = Math.floor(t / 1000 / 3600 / 24);
	        h = Math.floor(t / 1000 / 60 / 60 % 24);
	        m = Math.floor(t / 1000 / 60 % 60);
	        s = Math.floor(t / 1000 % 60);
	    }
		var time = '';
		if(d>0) time += d + '天 ';
		if(h>0) time += h + '小时 ';
		if(m) time += m + '分钟 ';
		if(s) time += s + '秒 ';
	    return time;
	}
	
	const getStatus = (status, type) => {
		let title = '';
		let color = '';
		switch (status) {
			case 1:
				title = '待支付';
				color = '#ffaa00';
				break;
			case 2:
				title = '待确认';
				color = '#55aa7f';
				break;
			case 3:
				title = '待开始';
				color = '#aa5500';
				break;
			case 4:
				title = '已结束';
				color = '#ccd0d8';
				break;
			default:
				break;
		}
		return type==1?title:color;
	}
	
	const jia = (arg1, arg2) => {
	  arg1 = arg1.toString(), arg2 = arg2.toString();
	  var arg1Arr = arg1.split("."),
		arg2Arr = arg2.split("."),
		d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
		d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
	  var maxLen = Math.max(d1.length, d2.length);
	  var m = Math.pow(10, maxLen);
	  var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
	  var d = arguments[2];
	  return typeof d === "number" ? Number((result).toFixed(d)) : result;
	}
	
	const jian = (arg1, arg2) => {
	  return uni.$u.util.jia(arg1, -Number(arg2), arguments[2]);
	}
	
	const goLogin = () => {
		uni.$u.route({
			url: '/pages/public/login'
		})
	}

	uni.$u.util = {
		goLogin,
		writeLog,
		urlParamHash,
		jumpOpenBox,
		formatPhone,
		showErr,
		getWasteTypeInfo,
		openBox,
		getRecycleType,
		formatDate,
		updateLocation,
		navbarHeight,
		isIphoneX,
		callTel,
		connectMqtt,
		onMessage,
		getReportTypeInfo,
		formatRemainTime,
		getStatus,
		goBackHome,
		jia,
		jian,
	};

}
