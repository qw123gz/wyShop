<template>
	<view class="copyright">
		<view class="">
			Copyright © 无忧茶坊2020-2021
		</view>
		<view class="">
			羊楼洞无忧(湖北)科技有限公司
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	.copyright{
		 margin: 80upx auto;
		
		 font-size: 22upx;
		 color: #999999FF;
		 position: fixed;
		 z-index: 10;
		 bottom: 0;
		 width: 100%;
		 text-align: center;
		 view{
			 &:first-child{
				 margin-bottom: 15upx;
			 }
		 }
	}
</style>
