<template>
	<view class="index">
		<view class="main" style="background: url(/static/user/txbj.png);">
			<view class="main-content">
				<view class="main-name">
					提现说明
				</view>
				<view class="main-type">
					<text>账户总收益</text>
				</view>
				<view class="main-title">
				    目前账户中所有的账户金额，等于已提现金额+可提现金额+提现审核中的金额
				</view>
			</view>
			<view class="main-content">
				<view class="main-type">
					<text>可提现金额</text>
				</view>
				<view class="main-title">
				    指账户中可以进行提现的所有金额
				</view>
			</view>
			<view class="main-content">
				<view class="main-type">
					<text>已提现金额</text>
				</view>
				<view class="main-title">
				    已经提现成功并放款部分的金额
				</view>
			</view>
			<view class="rule">
				<view class="rule-type">
					<view class="son"></view>
					<view class="rule-type-title">账户余额每天可以手动提现一次，提现前需要先设置收款账户</view>
				</view>
				<view class="rule-type">
					<view class="son"></view>
					<view class="rule-type-title">单次提现金额最低1元，最高不超过10000元</view>
				</view>
				<view class="rule-type">
					<view class="son"></view>
					<view class="rule-type-title">账户中有待审核的提现申请时，不能发起提现申请</view>
				</view>
			</view>
			<view class="know" @click="handleKnow">
				我知道了
			</view>
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
	  background: #777777;
	  z-index: 9000;
	  opacity: 0.5;
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
			top:25%;
			height:auto;
			background:rgba(255,255,255,1);
			border-radius:20upx;
			background-size: 100% 100% !important;
			padding: 0 50upx;
			box-sizing: border-box;
			.main-content{
				margin-top: 30upx;
				.main-name{
					width: 100%;
					height: 100upx;
					line-height: 100upx;
					font-size:46upx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(15,98,77,1);
				}
				.main-type{
					width: 100%;
					height: auto;
					text{
						height:48upx;
						padding: 0 10upx;
						line-height: 48upx;
						background:rgba(188,158,104,1);
						border-radius:10upx;
						font-size:28upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(255,255,255,1);
				
					}
				}
				.main-title{
					font-size:28upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(51,51,51,1);
				}
			}
			.rule{
				width: 100%;
				margin-top:50upx;
				
				.rule-type{
					display: flex;
					margin-top: 25upx;
					.son{
						width:10upx;
						height:10upx;
						background:rgba(15,98,77,1);
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
			.know{
				width: 100%;
				text-align: center;
				margin: 40upx 0;
				font-size:30upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(15,98,77,1);
			}
		}
	}
</style>
