<template>
	<view class="login">
		<view class="login-name">
			添加银行卡
		</view>
		<view class="login-main">
			<view class="login-input">
				<view class="input-name">
					持卡人
				</view>
				<input class="input-con" placeholder-class="bankHoderClass"  data-type="uname"
				 @input="handleInput" type="text" placeholder="持卡人姓名" value=""
				  v-model="bankInfo.uname" />
			</view>
			<view class="login-input">
				<view class="input-name">
					卡号
				</view>
				<input class="input-con" placeholder-class="bankHoderClass"  data-type="bankCode"
				 @input="handleInput" type="number" placeholder="持卡人银行卡号" value="" 
				 v-model="bankInfo.bankCode" />

			</view>
			<view @click="submit" class="btn" v-if="bankInfo.uname && bankInfo.bankCode">
				下一步
			</view>
			<view class="btn btn-no" v-else>
				下一步
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
				bankInfo: {
					uname: '',
					bankCode: ''
				}
			}
		},
		onLoad() {

		},
		methods: {
			// 输入框的获取
			handleInput(e) {
				let type = e.currentTarget.dataset.type
				let value = e.detail.value
				this.bankInfo[type] = value
			},
			//点击下一步
			submit() {
				if (!this.bankInfo.uname) {
					uni.showToast({
						title: '请输入持卡人姓名',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				if (!this.bankInfo.bankCode) {
					uni.showToast({
						title: '请输入持卡人银行卡号',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				this.next()
			},
			//提交信息
			next(){
				uni.setStorageSync('bankInfo',this.bankInfo)
				uni.redirectTo({
					url:'./bank.three?bank=' + JSON.stringify(this.bankInfo)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.login {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background: #fff;

		.login-name {
			width: 100%;
			text-align: left;
			height: 100upx;
			line-height: 100upx;
			font-size:36upx;
			font-family:PingFang SC;
			font-weight:bold;
			padding-left: 30upx;
			box-sizing: border-box;
			color:rgba(51,51,51,1);
		}

		.login-main {
			width: 690upx;
			margin: 0 auto;
			height: auto;

			.login-input {
				width: 100%;
				height: 100upx;
				
				border-bottom: 1px solid #EBEBEB;
                margin-top: 20upx;
				display: flex;
				.input-name{
					flex-basis: 180upx;
					height: 100upx;
					line-height: 100upx;
					font-size:30upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(51,51,51,1);
				}
				.input-con {
					flex: 1;
					padding: 0 !important;
					height: 100%;
					line-height: 100upx;
					font-size: 30upx;
					font-family: Sanomat Grab Web;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			}


			.btn {
				width: 100%;
				height: 88upx;
				text-align: center;
				line-height: 88upx;
				background:rgba(6,199,149,1);
				border-radius: 44upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				margin: 100upx 0 50upx 0;
			}

			.btn-no {
				// opacity: 0.5;
				background:rgba(246,246,246,1);
				color:rgba(206,206,206,1);
			}
		}
	}
</style>
