<template>
	<view class="index">
		<view class="shop" @click="toEdit">
			<view class="shop-name">
				<view class="shop-title">
					{{information.sname}}
				</view>
				<view class="shop-card">
					({{information.scode}})
				</view> 
			</view>
			<view class="shop-icon" >
				<image src="/static/index/wynn.png" mode=""></image>
			</view>
		</view>
		<view class="sales">
			<view class="yest-sales">
				<view class="yest-img">
					<image src="/static/index/today.png" mode=""></image>
				</view>
				<view class="yest-total" @click="toCash">
					<view class="yest-total-name">
						收入(元)
					</view>
					<view class="yest-total-count">
						{{info.todaysincome || 0}}
					</view>
				</view>
				<view class="yest-total two"  @click="toSetMeal">
					<view class="yest-total-name">
						套餐
					</view>
					<view class="yest-total-count">
						{{info.todayspageket || 0}}
					</view>
				</view>
				<view class="yest-total"  @click="toIntegral">
					<view class="yest-total-name">
						积分
					</view>
					<view class="yest-total-count">
						{{info.todayscore || 0}}
					</view>
				</view>
			</view>
			<view class="yest-sales today-sales">
				<view class="yest-img">
					<image src="/static/index/yesday.png" mode=""></image>
				</view>
				<view class="yest-total"  @click="toCash">
					<view class="yest-total-name">
						收入(元)
					</view>
					<view class="yest-total-count">
						{{info.yesterdayincome || 0}}
					</view>
				</view>
				<view class="yest-total two"  @click="toSetMeal">
					<view class="yest-total-name">
						套餐
					</view>
					<view class="yest-total-count">
						{{info.yesterdaypageket || 0}}
					</view>
				</view>
				<view class="yest-total"  @click="toIntegral">
					<view class="yest-total-name">
						积分
					</view>
					<view class="yest-total-count">
						{{info.yesterdayscore || 0}}
					</view>
				</view>
			</view>
		</view>
		<view class="code" @click="toCode">
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
				<view class="list" v-for="(item,index) in noticeList" :key="index">
					<view class="list-img">
						<image :src="item.icon" mode=""></image>
					</view>
					<view class="list-main">
						<view class="list-main-name">
							{{item.mtitle}}
						</view>
						<view class="list-main-title">
							{{item.mmessage}}
						</view>
						<view class="list-main-date">
							{{item.createtime}}
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
				noticeList:[],//消息列表
				info:'',//积分信息
				information:'',//门店信息
				page:1,
				pagesize:10,
				isMore:false
			}
		},
		onLoad() {
			
           
		},
		onShow() {
			this.storeid = uni.getStorageSync('storeid')
			this.getInter()//获取积分现金
			this.getInformation()//获取门店信息
			this.getNotice()//获取门店消息
		},
		onReachBottom() {
			
		},
		methods: {
			//点击跳转现金明细
			toCash(){
				uni.navigateTo({
					url:'../user/cash/cash'
				})
			},
			//点击跳转套餐明细
			toSetMeal(){
				uni.navigateTo({
					url:'../user/set.meal/set.meal'
				})
			},
			//点击跳转积分明细
			toIntegral(){
				uni.navigateTo({
					url:'../user/integral/integral'
				})
			},
			//getGude
			getGude(){
				let value = uni.getStorageSync('launchFlag');
				console.log(value)
				if(!value){
					uni.redirectTo({
						url:'./swiper'
					})
				}
			},
			//获取门店最新消息通知
			getNotice(){
				let data = {
					cmd:'getstorebestnewmess',
					clientid:this.$clientid.index,
					sign:this.$clientid.sign,
					storeid:this.storeid
				}
				this.$post('',data).
				  then((res)=>{
					  console.log(res)
					  if(res.status == 0){
						  this.noticeList = res.response
					  }
				  })
			},
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
			//获取门店的积分
			getInter(){
				let data = {
					cmd:'getstorecashandscore',
					clientid:this.$clientid.index,
					sign:this.$clientid.sign,
					storeid:this.storeid
				}
				this.$post('',data).
				  then((res)=>{
					  console.log(res)
					  if(res.status == 0){
						  this.info = res.detail
					  }
				  })
			},
			//跳转店铺信息
			toEdit(){
				uni.navigateTo({
					url:'./edit.index?info=' + encodeURIComponent(JSON.stringify(this.information))
				})
			},
             //跳转二维码页面
			 toCode(){
				 let info = {
					 storeid:this.information.storeid,
					 scode:this.information.scode,
					 sname:this.information.sname,
					 slogo:this.information.slogo
				 }
				 uni.navigateTo({
				 	url:'./code?info=' + JSON.stringify(info)
				 })
			 }
		}
	}
</script>

<style lang="scss" scoped>
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
				.two{
					flex-basis: 160upx !important;
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
							// display: -webkit-box;
							// -webkit-box-orient: vertical;
							// -webkit-line-clamp: 2;
							// overflow: hidden;
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
