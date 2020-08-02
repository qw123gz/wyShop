<template>
	<view class="no-more">
		<view class="title-top">
			<text></text>
			<text>没有更多内容</text>
			<text></text>
		</view>
	</view>
</template>

<script>
</script>

<style >

	.no-more{
		width: 100%;
		height: 88upx;
		background: #F6F5F5;
	}
	.title-top{
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.title-top text:nth-child(1) {
	  display: inline-block;
	  width: 46upx;
	  height: 1px;
	  background: #CECECE;
	  position: relative;
	  top: -10upx;
	}
	
	.title-top text:nth-child(2) {
	  display: inline-block;
	  width: 200upx;
	  height: 88upx;
	  text-align: center;
	  line-height: 88upx;
	  font-size:22upx;
	  font-family:PingFang SC;
	  font-weight:500;
	  color:rgba(206,206,206,1);
	}
	
	.title-top text:nth-child(3) {
	  display: inline-block;
	  width: 46upx;
	  height: 1px;
	  background: #CECECE;
	  position: relative;
	  top: -10upx;
	}
</style>
