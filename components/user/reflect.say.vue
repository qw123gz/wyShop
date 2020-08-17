<template>
	<view class="index">
		<view class="main" style="background: url(/static/user/txbj1.png);">
			<view class="main-content">
				<view class="main-name">
					提现说明
				</view>
				<view class="main-title">
					操作简单  到账快捷
				</view>
			</view>
			<view class="say">
				<view class="say-name">
					可用余额
				</view>
				<view class="say-title">
                     指账户中可以进行提现的所有金额 
				</view>
			</view>
			<view class="say">
				<view class="say-name">
					总收益
				</view>
				<view class="say-title">
			          等于已提现金额+可提现金额+提现审核中的金额  
				</view>
			</view>
			<view class="rule">
				<view class="rule-type">
					<view class="son"></view>
					<view class="rule-type-title">账户余额每天可以手动提现一次，提现前需要先设置收款账户</view>
				</view>
				<view class="rule-type">
					<view class="son"></view>
					<view class="rule-type-title">当日提现金额最低1000元，最高不超过100000元 </view>
				</view>
				<view class="rule-type"> 
					<view class="son"></view>
					<view class="rule-type-title">账户中有待审核的提现申请时，不能发起提现申请</view>
				</view>
			</view>
			
		</view>
		<view class="know" @click="handleKnow">
			<image src="/static/user/close.png" mode=""></image>
		</view>
		<view class="mask"  :catchtouchmove="true"></view>
	</view>
	
</template>

<script>
	export default {
		data(){
			return {
				isShowReflect:false
			}
		},
		onLoad() {
			
		},
		methods:{
			//点击我知道了
			handleKnow(){
				this.$emit('changeReflect')
			}
		}
	}
</script>

<style lang="less" scoped>
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
	  z-index: 9000;
	  opacity: 0.6;
	  overflow: hidden;
	}
	.index{
		width: 100%;
		height: 100vh;
		.main{
			width: 80%;
			position: fixed;
			z-index: 999999;
			margin: 0 10%;
			top:15%;
			height:900upx;
			background:rgba(255,255,255,1);
			border-radius:20upx;
			background-size: 100% 100% !important;
			padding: 0 50upx;
			box-sizing: border-box;
			
			.main-content{
				width: 100%;
				padding-top: 80upx;
				margin-bottom: 140upx;
				.main-name{
					width: 100%;
					text-align: right;
					font-size:44upx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(255,255,255,1);
					height: 60upx;
					line-height:60upx;
					text-shadow:0px 3px 7px rgba(0,118,88,0.2);
				}
				.main-title{
					width: 100%;
					text-align: right;
					font-size:28upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(255,255,255,1);
					line-height:48upx;
				}
			}
			.say{
				width: 100%;
				display: flex;
				.say-name{
					width: 130upx;
					height:46upx;
					line-height: 46upx;
					text-align: center;
					background:rgba(228,195,125,1);
					border-radius:4upx;
					font-size:28upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(255,255,255,1);
				}
				.say-title{
					flex: 1;
					font-size:28upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(49,48,48,1);
					line-height:48upx;
					margin-left: 30upx;
				}
			}
			.rule{
				width: 100%;
				margin-top:50upx;
				padding-bottom: 50upx;
				.rule-type{
					display: flex;
					margin-top: 15upx;
					.son{
						width:10upx;
						height:10upx;
						background:#06C795;
						border-radius:50%;
						position: relative;
						top:10upx;
					}
					.rule-type-title{
						flex: 1;
						font-size:28upx;
						margin-left: 20upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(102,102,102,1);
						line-height:40upx;
					}
				}

			}
			
		}
		.know{
			position: fixed;
			z-index: 999999;
			top:1100upx;
			left: 46%;
			width: 56upx;
			height: 56upx;
			margin: 50upx auto;
			image{
				width: 100%;
				height: 100%;
			}
			
		}
	}
</style>
