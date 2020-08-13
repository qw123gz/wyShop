<template>
	<view class="login">
		<view class="login-name">
			验证银行预留手机号
		</view>
		<view class="login-main">
			<view class="login-input">
				<view class="input-name">
					手机号
				</view>
				<input class="input-con" placeholder-class="bankHoderClass"  data-type="bankPhone"
				 @input="handleInput" type="text" placeholder="请输入手机号" value=""
				  v-model="bankInfo.bankPhone" />
			</view>
			<view class="login-input">
				<view class="input-name">
					验证码
				</view>
				<input class="input-con" placeholder-class="bankHoderClass"  data-type="bankIviCode"
				 @input="handleInput" type="number" placeholder="填写验证码" value="" 
				 v-model="bankInfo.bankIviCode" />
                <view class="captchaCode-code">
                	<text @click="sendCode" class="code-yes"
                	  :class="[phoneTitle != '获取验证码'  ? 'code-no' : '']"
                	  v-if="bankInfo.bankPhone">{{phoneTitle}}</text>
                	<text v-else class="code-no">获取验证码</text>
                </view>
			</view>
			<view @click="submit" class="btn" v-if="bankInfo.bankPhone && bankInfo.bankIviCode">
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
					bankPhone: '',
					bankIviCode: ''
				},
				disabled:false,
				countdown:60,
				phoneTitle:'获取验证码',
				isSubmit:false,//是否可以提交
				bank:'',//缓存的银行卡信息
				storeid:'',
			}
		},
		onLoad() {

		},
		onShow() {
			this.bank = uni.getStorageSync('bankInfo')
			this.storeid = uni.getStorageSync('storeid')
			this.bankInfo.bankPhone = this.bank.bankPhone.substr(0,3) + '****' + this.bank.bankPhone.substr(-4)
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
				if (!this.bankInfo.bankPhone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				if (!this.bankInfo.bankIviCode) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				this.next()
			},
			//提交信息
			next(){
				let bankInfo = uni.getStorageSync('bankInfo')
				// for(let key in bankInfo){
				// 	this.bankInfo[key] = bankInfo[key]
				// }
				bankInfo.bankIviCode = this.bankInfo.bankIviCode

				uni.setStorageSync('bankInfo',bankInfo)
				this.sendMessage()
				
			},
			//提交数据
			sendMessage(){
				let bankInfo = uni.getStorageSync('bankInfo')
				console.log(bankInfo)
				let data = {
					cmd:'bindstorebankcard',
					clientid:this.$clientid.index,
					sign:this.$clientid.sign,
					owner:bankInfo.uname,
					storeid:this.storeid,
					cardno:bankInfo.bankCode,
					isbank:bankInfo.bankName,
					obank:bankInfo.bankCity,
					branch:bankInfo.bankAddress,
					phone:bankInfo.bankPhone,
					yzcode:bankInfo.bankIviCode
				}
				this.$post('',data)
				   .then((res)=>{
					   if(res.status == 0){
						   uni.showToast({
						   	  title:res.msg,
						   	  icon:'none',
						   	  duration:1000,
							  success: () => {
							  	setTimeout(()=>{
									uni.redirectTo({
										url:'./bank.one'
									})
								},1000)
							  }
						   })
					   }else{
						   uni.showToast({
						   	  title:res.msg,
						   	  icon:'none',
						   	  duration:1000
						   })
					   }
				   })
			},
			//发送验证码
			sendCode(){
				if(!this.disabled){
					let result = this.$isPhoneNum(this.bank.bankPhone)
					if(result){
						this.getCode()
						// this.setTime()
					}else{
						
					}
				}
				
			},
			//获取短信验证码
			getCode(){
				// let bank = uni.getStorageSync(bankInfo)
				let data = {
					cmd:'verificationcode',
					phone:this.bank.bankPhone,
					t:'bank',
					clientid:this.$clientid.index,
					sign:this.$clientid.sign,
				}
				this.$post('',data)
				.then((res)=>{
					console.log(res)
					if(res.status == 0){
						uni.showToast({
							title:'发送成功',
							icon:'none'
						})
						this.setTime()
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
			//短信倒计时
			setTime(){
				let num = this.countdown
				if(this.countdown == 0){
					this.disabled = false
					this.phoneTitle = '获取验证码'
					this.countdown = 60
					return
				}else{
					this.disabled = true
					this.phoneTitle = '已发送(' + this.countdown +')'
					this.countdown --
				}
				setTimeout(()=>{
					this.setTime()
				},1000)
			},
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
			width: 590upx;
			margin: 0 auto;
			margin-top: 50upx;
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
				.captchaCode-code{
					flex-basis: 200upx;
					text-align: center;
					height: 100upx;
					line-height: 100upx;
					font-size:34upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(6,199,149,1);
					.code-no{
						font-size:34upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(206,206,206,1);
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
				background:rgba(246,246,246,1);
				color:rgba(206,206,206,1);
			}
		}
	}
</style>
