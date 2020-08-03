<template>
	<view class="index">
		<view class="shop">
			<view class="shop-logo">
				<image src="/static/index/cf.png" mode=""></image>
			</view>
			<view class="shop-main">
				<view class="shop-name">
					武汉陆地点
				</view>
				<view class="shop-card">
					(NO.45786)
				</view>
			</view>
			<view class="shop-right">
				<image src="/static/user/yjt.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components:{
			
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.index {
		width: 100%;
		overflow: hidden;
		padding-top: 20upx;
		.shop{
			width: 690upx;
			height: 102upx;
			margin: 0 30upx;
			display: flex;
			.shop-logo{
				flex-basis: 102upx;
				height: 102upx;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 102upx;
					height: 102upx;
				}
			}
			.shop-main{
				flex: 1;
				height: 102upx;
				margin-left: 20upx;
				.shop-name{
					height: 60upx;
					line-height: 60upx;
					font-size:44upx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(18,18,23,1);
				}
				.shop-card{
					height: 42upx;
					line-height: 42upx;
					font-size:30upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(49,48,48,1);
				}
			}
			.shop-right{
				flex-basis: 30upx;
				height: 102upx;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 17upx;
					height: 30upx;
				}
			}
		}
	}

</style>
