<template>
	<view class="no-more" :style="{ 'padding-top': top + 'upx' }">
		<image src="/static/user/nodata.png" mode="widthFix"></image>
		<text style="line-height: normal;">{{ description || '暂无记录' }}</text>
	</view>
</template>
<script>
	import Vue from 'vue'
	export default {
		props: {
			top: {
				type: Number,
				default: 200
			},
			description: {
				type: String,
			}
		}
	}
</script>
<style scoped lang="scss">
	.no-more {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 450upx;
		// padding-top: 50upx;

		image {
			width: 414upx;
			height: 267upx;
		}

		text {
			font-size: 30upx;
			font-weight: 500;
			position: relative;
			top: 50upx;
			color: rgba(49, 48, 48, 1);
			// padding-top: 30upx;
		}
	}
</style>
