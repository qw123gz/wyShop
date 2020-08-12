<template>
	<view class="main">
		 <!-- <code-elf-guide v-if="guidePages"></code-elf-guide> -->
		 <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		 	<swiper-item class="swiper-item">
		 		<view class="swiper-item-img">
					<image src="/static/guid/wy1.png" mode=""></image>
				</view>
				<view class="swiper-item-title">
					<view class="title-1">
						开店无忧
					</view>
					<view class="title-2">
						以线下连锁店为服务驱动
					</view>
				</view>
				<view class="date"  @click="toIndex">
					跳过
				</view>
		 	</swiper-item>
		 	<swiper-item class="swiper-item">
		 		<view class="swiper-item-img">
		 			<image src="/static/guid/wy2.png" mode=""></image>
		 		</view>
				<view class="swiper-item-title">
					<view class="title-1">
						管理无忧
					</view>
					<view class="title-2">
						以直营合伙制为组织驱动
					</view>
				</view>
				<view class="date"  @click="toIndex">
					跳过
				</view>
		 	</swiper-item>
			<swiper-item class="swiper-item">
				<view class="swiper-item-img">
					<image src="/static/guid/wy3.png" mode=""></image>
				</view>
				<view class="swiper-item-title">
					<view class="title-1">
						赚钱无忧
					</view>
					<view class="title-2">
						以无忧茶坊APP为网络驱动
					</view>
				</view>
				<view class="date" @click="toIndex">
					跳过
				</view>
			</swiper-item>
			<!-- <swiper-item class="swiper-item">
				<view class="small4">
					<image src="/static/swiper/k1.png" mode=""></image>
				</view>
				<view class="small5">
					<image src="/static/swiper/k2.png" mode=""></image>
				</view>
				<view class="small6">
					人人都是茶老板
				</view>
			</swiper-item> -->
		 </swiper>
	</view>
</template>

<script>
	    import codeElfGuide from '@/components/code-elf-guide/code-elf-guide.vue'
	    export default {
	        components: {
	            codeElfGuide
	          },
	        data() {
	            return {
	                guidePages:true,
					time:9
	            }
	        },
	        onLoad(){
	            // this.loadExecution()
				this.getGued()
	        },
			onHide() {
				clearInterval()
				clearInterval
			},
			onUnload() {
				clearInterval
			},
	        methods: {
				toIndex(){
					uni.switchTab({
					    url: '/pages/index/index'
					});
				},
				getGued(){
					let value = uni.getStorageSync('launchFlag');
					console.log(value)
					if (value) {
					    // launchFlag=true直接跳转到首页
					    uni.switchTab({
					        url: '/pages/index/index'
					    });
						
					} else {
					    // launchFlag!=true显示引导页
					    this.guidePages = true
						uni.setStorageSync('launchFlag',true)
					}
				},
	            loadExecution: function(){
	                /**
	                 * 获取本地存储中launchFlag的值
	                 * 若存在，说明不是首次启动，直接进入首页；
	                 * 若不存在，说明是首次启动，进入引导页；
	                 */
	                try {
	                    // 获取本地存储中launchFlag标识
	                    const value = uni.getStorageSync('launchFlag');
						console.log(value)
	                    if (value) {
	                        // launchFlag=true直接跳转到首页
	                        uni.switchTab({
	                            url: '/pages/index/index'
	                        });
	                    } else {
	                        // launchFlag!=true显示引导页
	                        this.guidePages = true
	                    }
	                } catch(e) { 
	                    // error 
	                    uni.setStorage({ 
	                        key: 'launchFlag', 
	                        data: true, 
	                        success: function () {
	                            console.log('error时存储launchFlag');
	                        } 
	                    }); 
	                    this.guidePages = true
	                }
	            }
	        }
	    }
</script>

<style lang="less" scoped>
	.main{
		width: 100%;
		height: 100vh;
		.swiper{
			width: 100%;
			height: 100vh;
			.swiper-item{
				width: 100%;
				height: 100vh;
				position: relative;
				.swiper-item-img{
					width: 632upx;
					height: 900upx;
					margin: 50upx auto 0 auto;
					image{
						width: 632upx;
						height: 895upx;
					}
				}
				.swiper-item-title{
					width: 100%;
					text-align: center;
					.title-1{
						font-size:48upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(49,48,48,1);
					}
					.title-2{
						margin-top: 15upx;
						font-size:32upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(101,101,103,1);
					}
				}

				.date{
					position: absolute;
					right: 50upx;
					top:60upx;
					font-size:24upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(145,146,151,1);
				}
			}
		}
	}
</style>
