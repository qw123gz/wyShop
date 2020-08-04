<template>
	<view class="app">
		<view class="logo">
			<image src="/static/user/applogo.png" mode=""></image>
		</view>
		<view class="name">
			无忧茶坊
		</view>
		<view class="version">
			Version {{integral.version}}
		</view>
		<view class="type bt">
			<view class="type-name">
				检查更新
			</view>
			<view class="type-img">
				<image src="/static/user/yjt.png" mode=""></image>
			</view>
		</view>
		<view class="type" @click="toInfition('yhxy')">
			<view class="type-name">
				用户协议
			</view>
			<view class="type-img">
				<image src="/static/user/yjt.png" mode=""></image>
			</view>
		</view>
		<view   class="type" @click="toInfition('yszc')">
			<view class="type-name">
				隐私政策
			</view>
			<view class="type-img">
				<image src="/static/user/yjt.png" mode=""></image>
			</view>
		</view>
		<!-- 遮罩层 -->
		<view class="mask" v-if="dilog"  :catchtouchmove="true"></view>
		<!-- 弹窗 -->
		<view class="diog"  v-if="dilog"  style="background: url(/static/user/gx.png);">
			<view class="box">
				<image src="/static/user/gxlogo.png" mode=""></image>
			</view>
			<view class="main">
				<view class="main-name">
					发现新版本
				</view>
				<view class="main-vertion">
					V1.1.2
				</view>
			</view>
			<view class="title">
				系统检测到有新版本，是否立即更新？
			</view>
			<view class="diog-btn">
				<view class="btn-no" @click="closeDilog">
					暂不更新
				</view>
				<view class="btn-yes">
					立即更新
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Copyright from '@/components/Copyright.vue'
	export default {
		components:{
			Copyright
		},
		data(){
			return {
				version : '1.0.0',
				integral:{},
				dilog:false
			}
		},
		onLoad() {
			this.getVersion()
		},
		methods:{
			//点击暂不更新
			closeDilog(){
				this.diolg = !this.dilog
			},
			//跳转协议页面
			toInfition(e){
				console.log(e)
				let t = e
				console.log(e)
				uni.navigateTo({
					url:'./infition?t=' + t
				})
			},
			//获取无忧信息
			getVersion(){
				let data = {
					cmd: 'getbaseprofile',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign
				}
				this.$post('', data).
				then((res) => {
					// console.log(res)
					if (res.status == 0) {
						this.integral = res.detail
					} else {
				        
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.app{
		width: 100%;
		height: 100vh;
		background: #fff;
		.logo{
			width: 100%;
			height: 234upx;
			margin-top: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 120upx;
				height: 114upx;
			}
		}
		.name{
			width: 100%;
			text-align: center;
			font-size:40upx;
			line-height: 50upx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
		}
		.version{
			width: 100%;
			height: 100upx;
			text-align: center;
			line-height: 100upx;
			font-size:30upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			margin-bottom: 50upx;
		}
		.bt{
			border-top: 1px solid #EBEBEB;
		}
		.type{
			width: 610upx;
			height: 100upx;
			margin: 0 auto;
			display: flex;
			border-bottom: 1px solid #EBEBEB;
			.type-name{
				flex: 1;
				height: 100upx;
				line-height: 100upx;
				font-size:30upx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(51,51,51,1);
			}
			.type-img{
				flex-basis: 30upx;
				height: 100upx;
				display: flex;
				justify-content:center;
				align-items: center;
				image{
					width: 13upx;
					height: 22upx;
				}
			}
		}
	/* 弹出层 */
	.mask{
	  width: 100%;
	  height: 100%;
	  position: fixed;
	  top: 0;
	  left: 0;
	  bottom: 0;
	  right: 0;
	  background: #666666;
	  z-index: 10;
	  opacity: 0.6;
	  overflow: hidden;
	}
	.diog{
		width: 78%;
		height: 555upx;
		position: fixed;
		z-index: 100;
		left: 11%;
		top:520upx;
		background-size: 100% 100% !important;
		.box{
			width: 100%;
			height: 162upx;
			position: relative;
			top:-80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 162upx;
				height: 162upx;
			}
		}
		.main{
			width: 100%;
			position: relative;
			top:-60upx;
			.main-name{
				text-align: center;
				font-size:36upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(49,48,48,1);
			}
			.main-vertion{
				text-align: center;
				font-size:28upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(6,199,149,1);
			}
		}
		.title{
			width: 100%;
			padding: 50upx 66upx;
			box-sizing: border-box;
			text-align: center;
			font-size:32upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(49,48,48,1);
			line-height:48upx;
		}
		.diog-btn{
			width: 500upx;
			height: 74upx;
			margin:0 auto;
			display: flex;
			justify-content: space-between;
			.btn-no{
				width:235upx;
				text-align: center;
				line-height: 74upx;
				height:74upx;
				border:1px solid rgba(6,199,149,1);
				border-radius:37upx;
				font-size:32upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(6,199,149,1);
			}
			.btn-yes{
				width:235upx;
				text-align: center;
				line-height: 74upx;
				height:74upx;
				background:rgba(6,199,149,1);
				border-radius:37upx;
				font-size:32upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(255,255,255,1);
			}
		}
	}
	}
</style>
