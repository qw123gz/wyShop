<template>
	<view class="content">
		<swiper class="swiper" 
		:autoplay="autoplay" 
		:duration="duration">
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="/static/swiper/s1.png" mode="aspectFit"></image></view>
					
				</view>
				<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="/static/swiper/s2.png" mode="aspectFit"></image></view>
					
				</view>
				<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="/static/swiper/s3.png" mode="aspectFit"></image></view>
				</view>
				<view class="jump-over" @tap="launchFlag()">{{experience}}</view>
			</swiper-item>
		</swiper>
		<!-- <view class="uniapp-img"><image src="../../static/guide/uniapp4@2x.png" mode="aspectFit"></image></view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				duration: 500,
				jumpover: '跳过',
				experience: '立即体验'
			}
		},
		methods: {
			launchFlag: function(){
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				uni.setStorage({
						key: 'launchFlag',
						data: true,
				});
				uni.switchTab({
					url: '/pages/index/index'
				});
				
			}
		}
	}
</script>
<style>
	page,
	.content{
		width: 100%;
		height: 100vh;
		background-size: 100% 100% ;
		padding: 0;
	}
	.swiper{
		width: 100%;
		height: 100vh;
		background: #FFFFFF;
	}
	.swiper-item {
		width: 100%;
		height: 100vh;
	}
	.swiper-item-img{
		width: 100%;
		height: 100vh;
		margin: 0 auto;
	}
	.swiper-item-img image{
		width: 100%;
		height: 100vh;
		background-size:  100% 100%;
		background-position: initial !important;
		background-repeat: initial !important;
	}
/* 	.uniapp-img{
		height: 20%;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items:center;
		overflow: hidden;
	}
	.uniapp-img image{
		width: 40%;
	} */
	
	.jump-over,.experience{
		position: absolute;
		height: 60upx;
		line-height: 60upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 32upx;
		color: #454343;
		border: 1px solid #454343;
		z-index: 999;
	}
	.jump-over{
		right: 45upx;
		top: 125upx;
	}
	.experience{
		right: 50%;
		margin-right: -105upx;
		bottom: 0;
	}
</style>
