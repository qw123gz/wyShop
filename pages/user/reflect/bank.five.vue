<template>
	<view class="index mainBg">
		<!-- 图标 -->
		<view class="suc-top">
			<view class="suc-icon">
				<image src="/static/user/txcg.png" mode=""></image>
			</view>
			<view class="suc-name">
				提现申请成功
			</view>
			<view class="suc-title">
				到账时间根据银行入账时间而定
			</view>
		</view>
		<!-- 内容 -->
		<view class="bank">
			<view class="bank-title">
				到账账户
			</view>
			<view class="bank-main">
				<view class="back-name">
					<view class="back-name-title">
						工商银行(尾号1234)
					</view>
					<view class="back-name-img">
						<image src="/static/index/cf.png" mode=""></image>
					</view>
					
				</view>
				
			</view>
		</view>
		<view class="bank">
			<view class="bank-title">
				提现金额
			</view>
			<view class="bank-main">
				<view class="back-name">
					<view class="back-name-title">
						123元
					</view>
				</view>
				
			</view>
		</view>
		<!-- 返回 -->
		<view class="btn" @click="handleBack">
			返回
		</view>
	</view>
</template>

<script>
	export default {
		components:{
			
		},
		data(){
			return {
				
			}
		},
		onLoad() {
			
		},
		//监听又上角点击事件
		onNavigationBarButtonTap(e){
			console.log(e)
			uni.navigateTo({
				url:'./reflect.recording'
			})
		},
		methods:{
			//点击返回
			handleBack(){
				uni.redirectTo({
					url:'./reflect.index'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.index{
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		.suc-top{
			width: 100%;
			background: #FFFFFF;
			
			.suc-icon{
				width: 100%;
				padding-top: 30upx;
				
				height: 210upx;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 130upx;
					height: 130upx;
				}
			}
			.suc-name{
				width: 100%;
				text-align: center;
				font-size:34upx;
				line-height: 50upx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(51,51,51,1);
			}
			.suc-title{
				width: 100%;
				text-align: center;
				line-height: 50upx;
				padding-bottom: 50upx;
				font-size:26upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(102,102,102,1);
			}
		}
		.bank{
			width: 100%;
			height: 90upx;
			display: flex;
			background: #fff;
			padding: 0 30upx;
			box-sizing: border-box;
			.bank-title{
				flex-basis: 130upx;
				height: 90upx;
				line-height: 90upx;
				font-size:30upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
			}
			.bank-main{
				flex: 1;
				height: 90upx;
				display: flex;
				
				.bank-no{
					width: 100%;
					text-align: right;
					margin-right: 20upx;
					height: 90upx;
					line-height: 90upx;
					font-size:30upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(51,51,51,1);
				}
				.back-name{
					width: 100%;
					text-align: right;
					margin-right: 20upx;
					height: 90upx;
					
					display: flex;
					flex-direction: row-reverse;
					.back-name-img{
						flex-basis: 70upx;
						height: 90upx;
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							width:38upx;
							height:38upx;
						}
					}
					.back-name-title{
						flex-basis: auto;
						height: 90upx;
						line-height: 90upx;
						font-size:30upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(51,51,51,1);
					}
				}
			}
			.bank-right{
				flex-basis: 20upx;
				height: 90upx;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width:14upx;
					height:24upx;
				}
			}
		}
		.btn{
			width:630upx;
			text-align: center;
			margin: 100upx auto;
			height:88upx;
			line-height: 88upx;
			background:rgba(15,98,77,1);
			border-radius:44upx;
			font-size:30upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
		}
	}
</style>
