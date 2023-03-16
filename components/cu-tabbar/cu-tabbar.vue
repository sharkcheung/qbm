<template>
	<view class="tabbar-box">
		<u-tabbar :value="currentTab" :placeholder="false" activeColor="#F35917" inactiveColor="#868E9D">
			<u-tabbar-item v-for="(item,index) in tabList" @click="changeTab(item)" :text="item.name" :key="index">
				<image
					class="tabbar-box__slot-icon"
					slot="active-icon"
					:src="item.activeIcon"
				></image>
				<image
					class="tabbar-box__slot-icon"
					slot="inactive-icon"
					:src="item.inactiveIcon"
				></image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		name:"cu-tabbar",
		props: {
			currentTab: {
				type: Number,
				default: 0
			},
			tabList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			changeTab(item) {
				uni.$u.route({
					type: 'switchTab',
					url: item.path
				})
			},
		}
	}
</script>

<style lang="scss">
	.tabbar-box {
		&__slot-icon {
			width: 17px;
			height: 17px;
		}
	}
</style>