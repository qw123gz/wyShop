<template>
	<view class="no-more" :style="{ 'padding-top': top + 'upx' }">
		<image src="/static/index/noList.png" mode="widthFix"></image>
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
	padding-top: 50upx;
	image {
		width: 377upx;
		height: 393upx;
	}
	text {
		color: #9DACB9;
		font-size:28upx;
		font-weight:400;
		position: relative;
		top:-80upx;
		// padding-top: 30upx;
	}
}
</style>
