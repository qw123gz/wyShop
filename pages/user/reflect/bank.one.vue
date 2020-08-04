<template>
	<view class="index">
		<!-- 有银行卡 -->
		<view class="" v-if="bankList.length > 0">
			<view class="bank-type" style="background: url(/static/user/gs.png);"
			 v-for="(item,index) in bankList" :key="index" @click="changeBack(JSON.stringify(item))">
				<view class="type-title">
					<view class="type-icon">
						<image src="/static/index/cf.png" mode=""></image>
					</view>
					<view class="type-main">
						<view class="type-name">
							{{item.issuing_bank}}
						</view>
						<view class="type-say">
							{{item.issuing_bank}}
						</view>
					</view>

				</view>
				<view class="type-code">
					**** **** **** **** <text>{{item.cardno.substr(-4)}}</text>
				</view>
			</view>
			<!-- 添加银行卡 -->
			<!--  -->
			<view class="bank-btn" @click="toBankTwo">
				<view class="btn-main">
					<view class="add-btn">
						<image src="/static/user/bankadd.png" mode=""></image>
					</view>
					<view class="name-btn">
						添加银行卡
					</view>
				</view>
			</view>
		</view>
        <!-- 没有银行卡 -->
		<view class="noBank" v-else  @click="toBankTwo">
			<view class="btn-main">
				<view class="add-btn">
					<image src="/static/user/bankadd.png" mode=""></image>
				</view>
				<view class="name-btn">
					添加银行卡
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
                 isBank:false,
				 bankList:[]
			}
		},
		onLoad() {

		},
		onShow() {
			this.uid = uni.getStorageSync('uid')
			this.getBankList()
		},
		methods: {
			//选择银行卡
			changeBack(e){
				console.log(e)
				let item = e
				uni.$emit('changeBack',item)
				uni.navigateBack({
					delta:1
				})
			},
			//点击添加银行卡
			toBankTwo() {
				uni.navigateTo({
					url: './bank.two'
				})
			},
			//获取银行卡列表
			getBankList(){
				let data = {
					cmd:'getuserbanklistbyuid',
					clientid:this.$clientid.index,
					sign:this.$clientid.sign,
					uid:this.uid
				}
				this.$post('',data)
				   .then((res)=>{
					   if(res.status == 0){
						   this.bankList = res.response
					   }else{
						   // uni.showToast({
						   // 	  title:res.msg,
						   // 	  icon:'none',
						   // 	  duration:1000
						   // })
					   }
				   })
			}
		}
	}
</script>

<style lang="less" scoped>
	.index {
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		padding-top: 30upx;
		background: #fff;

		.bank-type {
			width: 690upx;
			margin:30upx auto;
			height: 258upx;
			background-size: 100% 100% !important;

			.type-title {
				width: 100%;
				padding: 0 40upx;
				box-sizing: border-box;
				height: 140upx;
				display: flex;

				.type-icon {
					width: 68upx;
					height: 140upx;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 68upx;
						height: 68upx;
					}
				}

				.type-main {
					margin-left: 21upx;
					flex-basis: 1;
					height: 140upx;
					padding: 20upx 0;
					box-sizing: border-box;

					.type-name {
						width: 100%;
						height: 60upx;
						line-height: 60upx;
						font-size: 34upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba(255, 255, 255, 1);
					}

					.type-say {
						width: 100%;
						height: 40upx;
						line-height: 40upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);
						opacity: 0.8;
					}
				}

			}

			.type-code {
				padding-left: 120upx;
				width: 100%;

				box-sizing: border-box;
				font-size: 35upx;
				font-family: Sanomat Grab Web;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);

				// opacity:0.2;
				text {
					height: 50upx;
					line-height: 50upx;
					font-size: 48upx;
					font-family: Sanomat Grab Web;
					font-weight: 400;
					margin-left: 15upx;
					color: rgba(255, 255, 255, 1) !important;
					// opacity:0;
				}
			}
		}

		.bank-btn {
			width: 690upx;
			height: 96upx;
			margin: 30upx auto;
			background: rgba(6,199,149,1);
			border-radius: 20upx;
			display: flex;
			justify-content: center;
			align-items: center;

			.btn-main {
				width: 250upx;
				height: 96upx;
				display: flex;
				justify-content: center;
				align-items: center;

				.add-btn {
					flex-basis: 60upx;
					height: 96upx;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 33upx;
						height: 33upx;
					}
				}

				.name-btn {
					flex: 1;
					height: 96upx;
					line-height: 96upx;
					font-size: 34upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
		.noBank {
			width: 690upx;
			height: 130upx;
			margin: 30upx auto;
			background: rgba(6,199,149,1);
			border-radius: 20upx;
			display: flex;
			justify-content: center;
			align-items: center;
		
			.btn-main {
				width: 250upx;
				height: 130upx;
				display: flex;
				justify-content: center;
				align-items: center;
		
				.add-btn {
					flex-basis: 60upx;
					height: 130upx;
					display: flex;
					justify-content: center;
					align-items: center;
		
					image {
						width: 33upx;
						height: 33upx;
					}
				}
		
				.name-btn {
					flex: 1;
					height: 130upx;
					line-height: 130upx;
					font-size: 34upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}
</style>
