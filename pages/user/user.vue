<template>
	<view class="index">
		<!-- 头部店名 -->
		<view class="shop" @click="edit">
			<view class="shop-logo">
				<image src="/static/index/cf.png" mode=""></image>
			</view>
			<view class="shop-main">
				<view class="shop-name">
					{{information.sname}}
				</view>
				<view class="shop-card">
					({{information.scode}})
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
						{{integral.total_revenue}}
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
						{{integral.withdrawable}}
					</view>
				</view>
			</view>
			<view class="bbb"></view>
			<view class="reflect-btn" @click="toReflect">
				<view class="btn">
					去提现
				</view>
			</view>
			<view class="cly">
				
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
			<view class="tab-item" @click="toIntegtral">
				<view class="item-icon">
					<image src="/static/user/utab3.png" mode=""></image>
				</view>
				<view class="item-name">
					积分回收
				</view>
			</view>
			<view class="tab-item" @click="toCode">
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
		<!-- 弹窗提示是否退出积分 -->
		<view class="dilog" v-if="dilog">
			<view class="dilog-name">
				是否拨打客服电话
			</view>
			<view class="dilog-title">
				{{phone}}
			</view>
			<view class="dilog-btn">
				<view class="btn-box">
					<view class="btn-no" >
						<image src="/static/user/call.png" mode=""></image>
					</view>
					<view class="btn-yes" @click="sendPhone">
						立即拨打
					</view>
				</view>
			</view>
			<view class="close" @click="callPhone">
				<image src="/static/user/close.png" mode=""></image>
			</view>
		</view>
		<!-- 遮罩层 -->
		<view class="mask" v-if="dilog"  :catchtouchmove="true"></view>
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
				isShowReflect:false,
				storeid:'',
				integral:{},
				dilog:false,//联系客服
				phone:'',//客服电话
				information:'',//门店信息
			}
		},
		onLoad() {
             
			
		}, 
		onShow() {
			this.storeid = uni.getStorageSync('storeid')
			this.getInterga()
			this.getPhone()
			this.getInformation()//获取门店信息
		},
		methods: {
			//获取门店信息
			getInformation(){
				let data = {
					cmd:'getstoreinfobystoreid',
					clientid:this.$clientid.index,
					sign:this.$clientid.sign,
					storeid:this.storeid
				}
				this.$post('',data).
				  then((res)=>{
					  console.log(res)
					  if(res.status == 0){
						  this.information = res.detail
					  }
				  })
			},
			//点击头部信息
			edit(){
				// uni.navigateTo({
				// 	url:'./edit/edit.information'
				// })
				uni.navigateTo({
					url:'../index/edit.index?info=' + encodeURIComponent(JSON.stringify(this.information))
				})
			},
			//退出登录
			logout(){
				uni.showModal({
					title:'提示',
					content:'是否确定退出登录？',
					success:((res)=>{
						if(res.confirm){
							console.log('退出')
							uni.clearStorageSync()
							uni.setStorageSync('launchFlag',true)
							uni.reLaunch({
								url:'../login/login'
							})
						}else if (res.cancel){
							console.log('取消退出')
						}
					})
				})
			},
			//获取积分收益
			getInterga(){
				let data = {
					cmd: 'getstoreaccountcash',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					storeid:this.storeid
				}
				this.$post('', data).
				then((res) => {
					// console.log(res)
					if (res.status == 0) {
						this.integral = res.detail
					} else {
				        
					}
				})
			},
			//点击积分收款
			toCode(){
				let info = {
					storeid:this.information.storeid,
					scode:this.information.scode,
					sname:this.information.sname,
					slogo:this.information.slogo
				}
				uni.navigateTo({
					url:'../index/code?info=' + JSON.stringify(info)
				})
			},
			//点击积分回收
			toIntegtral(){
				uni.navigateTo({
					url:'./integral/integral'
				})
			},
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
            //获取客服联系电话
			getPhone(){
				let data = {
					cmd: 'gethotline',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign
				}
				this.$post('', data).
				then((res) => {
					// console.log(res)
					if (res.status == 0) {
						this.phone = res.detail.txt
					} else {
				        
					}
				})
			},
			//拨打手机号
			callPhone(){
				this.dilog = !this.dilog
				
			},
			sendPhone(){
				uni.makePhoneCall({
					phoneNumber:this.phone
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
			height: 280upx;
			margin: 30upx auto;
			background:linear-gradient(90deg,rgba(231,211,151,1) 0%,rgba(224,190,112,1) 99%);
			border-radius: 20upx 20upx 5upx 5upx;
			.reflect-money{
				width: 100%;
				height: 170upx;
				padding: 30upx 0;
				box-sizing: border-box;
				display: flex;
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
			.bbb{
				width: 100%;
				height: 1upx;
				background: #fff;
				opacity: 0.3;
			}
			.reflect-btn{
				width: 100%;
				height: 80upx;
				display: flex;
				justify-content: center;
				align-items: flex-end;
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
			.cly{
				width: 100%;
				height: 52upx;
				background:linear-gradient(90deg,rgba(231,211,151,1) 0%,rgba(224,190,112,1) 99%);
				border-radius:0 0 50% 50%;
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
				line-height: 106upx;
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
		/* 弹出层 */
		.mask{
		  width: 100%;
		  height: 100vh;
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
		.dilog{
			width:62%;
			height:304upx;
			background:rgba(255,255,255,1);
			border-radius:20upx;
			position: fixed;
			z-index: 100;
			top:450upx;
			left: 19%;
			.dilog-name{
				width: 100%;
				text-align: center;
				padding: 30upx 0;
				font-size:32upx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(49,48,48,1);
			}
			.dilog-title{
				width: 100%;
				text-align: center;
				// padding: 30upx 0;
				font-size:40upx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(228,195,125,1);
			}
			.dilog-btn{
				width: 100%;
				padding: 0 30upx;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 40upx;
				.btn-box{
					width:300upx;
					height:74upx;
					padding-left: 50upx;
					display: flex;
					box-sizing: border-box;
					background:rgba(6,199,149,1);
					border-radius:39upx;
					.btn-no{
						flex-basis: 50upx;
						height: 74upx;
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							width: 32upx;
							height: 32upx;
						}
					}
					.btn-yes{
						flex: 1;
						height: 74upx;
						line-height: 74upx;
						text-align: left;
						font-size:32upx;
						font-family:PingFang SC;
						font-weight:bold;
						color:rgba(255,255,255,1);
					}
				}
				.btn-yes{
					width:235upx;
					text-align: center;
					height:74upx;
					border-radius:37upx;
					line-height: 74upx;
					background:rgba(6,199,149,1);
					font-size:32upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(255,255,255,1);
				}
			}
			.close{
				position: absolute;
				z-index: 999;
				width: 56upx;
				height: 56upx;
				top:370upx;
				left:200upx;
				image{
					width: 56upx;
					height: 56upx;
				}
				
			}
		}

	}
</style>