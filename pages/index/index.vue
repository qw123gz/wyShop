<template>
	<view class="index">
		<view class="shop">
			<view class="shop-name" @click="toEdit">
				<view class="shop-title">
					武汉路地点
				</view>
				<view class="shop-card">
					(No.432642)
				</view>
			</view>
			<view class="shop-icon" @click="toCode">
				<image src="/static/index/shopicon.png" mode=""></image>
			</view>
		</view>
		<view class="sales">
			<view class="yest-sales">
				<view class="yest-img">
					<image src="/static/index/today.png" mode=""></image>
				</view>
				<view class="yest-total">
					<view class="yest-total-name">
						销售额(元)
					</view>
					<view class="yest-total-count">
						12000
					</view>
				</view>
				<view class="yest-total two">
					<view class="yest-total-name">
						套餐
					</view>
					<view class="yest-total-count">
						4
					</view>
				</view>
				<view class="yest-total">
					<view class="yest-total-name">
						积分
					</view>
					<view class="yest-total-count">
						12000
					</view>
				</view>
			</view>
			<view class="yest-sales today-sales">
				<view class="yest-img">
					<image src="/static/index/yesday.png" mode=""></image>
				</view>
				<view class="yest-total">
					<view class="yest-total-name">
						销售额(元)
					</view>
					<view class="yest-total-count">
						12000
					</view>
				</view>
				<view class="yest-total two">
					<view class="yest-total-name">
						套餐
					</view>
					<view class="yest-total-count">
						4
					</view>
				</view>
				<view class="yest-total">
					<view class="yest-total-name">
						积分
					</view>
					<view class="yest-total-count">
						12000
					</view>
				</view>
			</view>
		</view>
		<view class="code">
			<view class="code-title">
				<view class="code-title-name">
					积分收款码
				</view>
				<view class="code-title-msg">
					店铺收取积分时出示此二维码
				</view>
			</view>
			<view class="code-box">
				<view class="code-bg">
					<image  src="/static/index/codebg.png" mode=""></image>
				</view>
				<view class="code-son">
					<image  src="/static/index/scode.png" mode=""></image>
				</view>
				<view class="code-integral">
					积分码
				</view>
			</view>
		</view>
		<!-- 最新消息 -->
		<view class="notice">
			<view class="notice-name">
				最新消息
			</view>
			<view class="notice-list">
				<view class="list" v-for="(item,index) in 5" :key="index">
					<view class="list-img">
						<image src="/static/index/login.png" mode=""></image>
					</view>
					<view class="list-main">
						<view class="list-main-name">
							200积分回收
						</view>
						<view class="list-main-title">
							2茶友xxx支付200元积分，本店的茶水费奖励将在12小时后发放。
						</view>
						<view class="list-main-date">
							05-20 12:02:12
						</view>
					</view>
				</view>
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
				noticeList:[]
			}
		},
		onLoad() {

		},
		methods: {
			//跳转店铺信息
			toEdit(){
				uni.navigateTo({
					url:'./edit.index'
				})
			},
             //跳转二维码页面
			 toCode(){
				 uni.navigateTo({
				 	url:'./code'
				 })
			 }
		}
	}
</script>

<style lang="less" scoped>
	.index {
		width: 100%;
		overflow: hidden;
		.shop{
			width: 100%;
			height: 120upx;
			padding: 0 30upx;
			box-sizing: border-box;
			display: flex;
			.shop-name{
				flex: 1;
				height: 120upx;
				.shop-title{
					width: 570upx;
					font-size:50upx;
					height: 70upx;
					line-height: 70upx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(18,18,23,1);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.shop-card{
					width: 570upx;
					height: 50upx;
					line-height: 50upx;
					font-size:30upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(18,18,23,1);
				}
			}
			.shop-icon{
				flex-basis: 120upx;
				height: 120upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.sales{
			width: 100%;
			padding: 0 30upx;
			box-sizing: border-box;
			margin: 44upx 0;
			.today-sales{
				background:linear-gradient(0deg,rgba(60,54,49,1) 0%,rgba(79,72,69,1) 100%) !important;
				box-shadow:0px 10upx 20upx 0px rgba(0, 0, 0, 0.1);
				border-radius:11upx !important;
				margin-top: 30upx;
			}
			.yest-sales{
				width: 100%;
				height:100upx;
				padding: 30upx 0;
				background:linear-gradient(90deg,rgba(255,111,6,1) 0%,rgba(255,120,9,1) 100%);
				box-shadow:0px 10upx 20upx 0px rgba(0, 0, 0, 0.1);
				border-radius:20upx;
				display: flex;
				.yest-img{
					flex-basis: 124upx;
					height: 100upx;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 64upx;
						height: 64upx;
					}
				}
				.two{
					flex-basis: 120upx !important;
				}
				.yest-total{
					flex-basis: 220upx;
					height: 100upx;
					.yest-total-name{
						width: 100%;
						height: 40upx;
						line-height: 40upx;
						font-size:22upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(255,226,203,1);
					}
					.yest-total-count{
						width: 100%;
						height: 60upx;
						line-height: 60upx;
						font-size:54upx;
						font-family:DIN 1451 Mittelschrift;
						font-weight:400;
						color:rgba(255,255,255,1);
					}
				}
			}
		}
		.code{
			width:690upx;
			height:300upx;
			background:rgba(255,255,255,1);
			border:1px solid rgba(228,228,228,1);
			border-radius:20upx;
			margin: 30upx auto;
			display: flex;
			padding: 25upx;
			box-sizing: border-box;
			.code-title{
				flex: 1;
				height: 250upx;
				padding-right: 86upx;
				padding-top: 50upx;
				box-sizing: border-box;
				.code-title-name{
					font-size:48upx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(101,101,103,1);
				}
				.code-title-msg{
					font-size:30upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(145,146,151,1);
					line-height:48upx;
				}
			}
			.code-box{
				flex-basis: 250upx;
				height: 250upx;
				position: relative;
				.code-bg{
					width: 100%;
					height: 100%;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.code-son{
					position: absolute;
					z-index: 10;
					top:61upx;
					left: 80upx;
					width: 90upx;
					height: 90upx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.code-integral{
					position: absolute;
					z-index: 10;
					top:170upx;
					left: 80upx;
					font-size:28upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(255,255,255,1);
				}
			}
		}
		.notice{
			width: 750upx;
			padding:0 30upx;
			margin-top: 50upx;
			.notice-name{
				width: 690upx;
				height: 80upx;
				line-height: 80upx;
				font-size:44upx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(49,48,48,1);
			}
			.notice-list{
				width: 690upx;
				.list{
					width: 690upx;
					height: auto;
					display: flex;
					padding: 30upx 0;
					border-bottom: 1px solid #E4E4E4;
					.list-img{
						flex-basis: 80upx;
						height: 80upx;
						image{
							width: 100%;
							height: 80upx;
						}
					}
					.list-main{
						flex-basis: 610upx;
						padding-left: 32upx;
						box-sizing: border-box;
						.list-main-name{
							width: 100%;
							height: 80upx;
							line-height: 80upx;
							font-size:34upx;
							font-family:PingFang SC;
							font-weight:bold;
							color:rgba(49,48,48,1);
						}
						.list-main-title{
							width: 100%;
							font-size:32upx;
							font-family:PingFang SC;
							font-weight:500;
							color:rgba(49,48,48,1);
							line-height:48upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
						.list-main-date{
							width: 100%;
							font-size:26upx;
							font-family:PingFang SC;
							font-weight:500;
							color:rgba(145,146,151,1);
							line-height:46upx;
						}
					}
				}
			}
		}
	}

</style>
