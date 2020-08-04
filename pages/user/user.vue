<template>
	<view class="index">
		<!-- 头部店名 -->
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
		<!-- 提现数据 -->
		<view class="reflect">
			<view class="reflect-money">
				<view class="money-total">
					<view class="money-name">
						总收益(元)
					</view>
					<view class="money-price">
						1365.90
					</view>
				</view>
				<view class="money-total" @click="changeReflect">
					<view class="money-name">
						可提现(元) 
						<text class="mark">
							<image src="/static/user/twen.png" mode=""></image>
						</text>
					</view>
					<view class="money-price">
						1365.90
					</view>
				</view>
			</view>
			<view class="reflect-btn" @click="toReflect">
				<view class="btn">
					去提现
				</view>
			</view>
		</view>
		<!-- tab -->
		<view class="tab">
			<view class="tab-item" @click="toCash">
				<view class="item-icon">
					<image src="/static/user/utab1.png" mode=""></image>
				</view>
				<view class="item-name">
					现金流水
				</view>
			</view>
			<view class="tab-item" @click="toSetMeal">
				<view class="item-icon">
					<image src="/static/user/utab2.png" mode=""></image>
				</view>
				<view class="item-name">
					套餐销售
				</view>
			</view>
			<view class="tab-item">
				<view class="item-icon">
					<image src="/static/user/utab3.png" mode=""></image>
				</view>
				<view class="item-name">
					积分回收
				</view>
			</view>
			<view class="tab-item">
				<view class="item-icon">
					<image src="/static/user/utab4.png" mode=""></image>
				</view>
				<view class="item-name">
					积分收款
				</view>
			</view>
		</view>
		<!--  -->
		<view class="ul-type"  @click="toMyAcount">
			<view class="type-icon">
				<image src="/static/user/zhaq.png" mode=""></image>
			</view>
			<view class="type-title">
				账户安全
			</view>
			<view class="type-name">
				
			</view>
			<view class="type-right">
				<image src="/static/user/yjt.png" mode=""></image>
			</view>
		</view>
		<view class="ul-type"  @click="callPhone">
			<view class="type-icon">
				<image src="/static/user/dh.png" mode=""></image>
			</view>
			<view class="type-title">
				联系客服
			</view>
			<view class="type-name">
				
			</view>
			<view class="type-right">
				<image src="/static/user/yjt.png" mode=""></image>
			</view>
		</view>
		<view class="ul-type"  @click="toMyApp">
			<view class="type-icon">
				<image src="/static/user/gyapp.png" mode=""></image>
			</view>
			<view class="type-title">
				关于无忧茶坊店主APP
			</view>
			<view class="type-name">
				
			</view>
			<view class="type-right">
				<image src="/static/user/yjt.png" mode=""></image>
			</view>
		</view>
		<view class="logOut"  @click="logout">
			安全退出
		</view> 
		<!-- 体现说明 -->
		<reflect v-if="isShowReflect" @changeReflect="changeReflect"></reflect>
	</view>
</template>

<script>
	import reflect from "@/components/user/reflect.say.vue"
	export default {
		components:{
			reflect
		},
		data() {
			return {
				isShowReflect:false
			}
		},
		onLoad() {

		},
		methods: {
			//点击现金流水
			toCash(){
				uni.navigateTo({
					url:'./cash/cash'
				})
			},
			//点击套餐
			toSetMeal(){
				uni.navigateTo({
					url:'./set.meal/set.meal'
				})
			},
			//拨打手机号
			callPhone(){
				uni.makePhoneCall({
					phoneNumber:'15071307905'
				})
			},
			//点击关于app
			toMyApp(){
				console.log(1)
				uni.navigateTo({
					url:'./my.app/my.app'
				})
			},
			//点击账户安全
			toMyAcount(){
				uni.navigateTo({
					url:'./acount/reset'
				})
			},
			//点击可提现问好
			changeReflect(){
				this.isShowReflect = !this.isShowReflect
			},
            //点击去提现
			toReflect(){
				uni.navigateTo({
					url:'./reflect/reflect.index'
				})
			},
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
		.reflect{
			width: 690upx;
			height: 300upx;
			margin: 30upx auto;
			background:linear-gradient(90deg,rgba(231,211,151,1) 0%,rgba(224,190,112,1) 99%);
			.reflect-money{
				width: 100%;
				height: 170upx;
				padding: 30upx 0;
				box-sizing: border-box;
				display: flex;
				border-bottom: 1px solid #FFFFFF;
				.money-total{
					flex: 1;
					.money-name{
						text-align: center;
						height: 40upx;
						line-height: 40upx;
						font-size:24upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(255,247,228,1);
						.mark{
							display: inline-block;
							width: 24upx;
							height: 24upx;
							position: relative;
							top:3upx;
							left: 10upx;
							image{
								width: 24upx;
								height: 24upx;
							}
						}
					}
					.money-price{
						text-align: center;
						height: 50upx;
						line-height: 50upx;
						font-size:50upx;
						font-family:DIN 1451 Mittelschrift;
						font-weight:400;
						color:rgba(255,255,255,1);
					}
				}
			}
			.reflect-btn{
				width: 100%;
				height: 130upx;
				display: flex;
				justify-content: center;
				align-items: center;
				.btn{
					width:180upx;
					text-align: center;
					line-height: 56upx;
					height:56upx;
					background:linear-gradient(-90deg,rgba(255,235,199,1) 0%,rgba(255,252,243,1) 100%);
					border-radius:28upx;
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(162,133,89,1);
				}
			}
		}
		.tab{
			width: 690upx;
			height: auto;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			.tab-item{
				width: 150upx;
				height: auto;
				.item-icon{
					width: 100%;
				    height: 90upx;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 54upx;
						height: 54upx;
					}
				}
				.item-name{
					width: 100%;
					height: 40upx;
					text-align: center;
					line-height: 40upx;
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(63,58,53,1);
				}
			}
		}
		.ul-type{
			width: 690upx;
			height: 100upx;
			margin: 30upx auto 0;
			display: flex;
			.type-icon{
				flex-basis: 40upx;
				height: 100upx;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 36upx;
					height: 36upx;
				}
			}
			.type-title{
				flex: 1;
				height: 100upx;
				margin-left: 15upx;
				line-height: 100upx;
				font-size:30upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
			}
			.type-name{
				flex: 1;
				height: 100upx;
				text-align: right;
				line-height: 100upx;
				margin-right: 15upx;
				font-size:30upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(153,153,153,1);
			}
			.type-right{
				flex-basis: 20upx;
				height: 100upx;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 14upx;
					height: 24upx;
				}
			}

		}
	.logOut{
		width: 690upx;
		height:88upx;
		margin: 80upx auto 150upx auto;
		line-height: 88upx;
		text-align: center;
		border:1px solid rgba(244,83,46,1);
		border-radius:44upx;
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(244,83,46,1);
		
	}



	}

</style>
