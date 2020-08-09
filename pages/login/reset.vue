<template>
	<view class="login">
		<view class="login-name">
			找回密码
		</view>
		<view class="login-main">
			<view class="login-input">
				<input placeholder-class="hoderClass"  data-type="account" @input="handleInput"
				 type="number" placeholder="请输入手机号"
				 value="" v-model="uesrReset.account" />
			</view>
			<view class="login-input">
				<input placeholder-class="hoderClass"  data-type="password" @input="handleInput" 
				type="password" placeholder="请设置新密码"
				 value="" v-model="uesrReset.password" />
			</view>
			<view class="login-input">
				<input placeholder-class="hoderClass"  data-type="newPassword" @input="handleInput"
				 type="password" placeholder="请确认新密码"
				 value="" v-model="uesrReset.newPassword" />
			</view>
			<view class="login-code">
				<input placeholder-class="hoderClass"  class="captchaCode-input" data-type="captchaCode"
				 @input="handleInput" type="number" placeholder="请输入验证码"
				 value="" v-model="uesrReset.captchaCode" />
				 <view class="captchaCode-code">
				 	<text @click="sendCode" class="code-yes"
					  :class="[phoneTitle != '获取验证码' ? 'code-no' : '']"
					  v-if="uesrReset.account">{{phoneTitle}}</text>
					<text v-else class="code-no">获取验证码</text>
				 </view>
			</view>
			<view @click="submit" class="btn" v-if="isSubmit">
				提交
			</view>
			<view class="btn btn-no" v-else>
				提交
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
				uesrReset: {
					account: '',//手机号
					password: '',//密码
					newPassword:'',//新密码
					captchaCode:'',//验证码
				},
				disabled:false,
				countdown:60,
				phoneTitle:'获取验证码',
				isSubmit:false,//是否可以提交
			}
		},
		onLoad() {

		},
		methods: {
			// 输入框的获取
			handleInput(e) {
				let type = e.currentTarget.dataset.type
				let value = e.detail.value
				this.uesrReset[type] = value
				if(this.uesrReset.newPassword &&
				  this.uesrReset.account &&
				  this.uesrReset.captchaCode &&
				  this.uesrReset.password 
				){
					this.isSubmit = true
					console.log(this.isSubmit)
				}else{
					this.isSubmit = false
				}
			},
			//点击登录
			submit() {
				if (!this.uesrReset.account) {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				if (!this.uesrReset.password) {
					uni.showToast({
						title: '请设置新密码',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				if (!this.uesrReset.newPassword) {
					uni.showToast({
						title: '请确认新密码',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				if (!this.uesrReset.captchaCode) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				if (this.uesrReset.password != this.uesrReset.newPassword) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none',
						duration: 1000
					})
					return false
				}

				this.sendPwd()
			},
			sendPwd() {
				let data = {
					cmd: 'fondpwd',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					phone:this.uesrReset.account,
					yzcode: this.uesrReset.captchaCode,
					newpwd: this.uesrReset.password,
					repwd: this.uesrReset.newPassword
				}
				this.$post('', data)
					.then((res) => {
						if (res.status == 0) {
							uni.showToast({
								title: '修改成功',
								icon: 'none',
								duration: 1500,
								success: () => {
									setTimeout(() => {
										uni.navigateBack({
			
										})
									}, 1500)
								}
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 1500
							})
			
						}
					})
			
			},
			//发送验证码
			sendCode(){
				if(!this.disabled){
					let result = this.$isPhoneNum(this.uesrReset.account)
					if(result){
						this.getCode()
						// this.setTime()
					}else{
						
					}
				}
				
			},
			//获取短信验证码
			getCode(){
				let data = {
					cmd:'verificationcode',
					phone:this.uesrReset.account,
					t:'fondpwd',
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
					this.phoneTitle = '已发送(' + this.countdown +')s'
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
			text-align: center;
			height: 200upx;
			line-height: 200upx;
			font-size: 46upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
		}

		.login-main {
			width: 590upx;
			margin: 0 auto;
			margin-top: 50upx;
			height: auto;
            .login-code{
				width: 100%;
				height: 100upx;
				margin-top: 20upx;
				border-bottom: 1px solid #EBEBEB;
				display: flex;
				.captchaCode-input{
					flex: 1;
					height: 100%;
					line-height: 100upx;
					padding: 0 !important;
					font-size: 34upx;
					font-family: Sanomat Grab Web;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
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
						color:rgba(49,48,48,1);
					}
				}
			}
			.login-input {
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				margin-top: 20upx;
				border-bottom: 1px solid #EBEBEB;

				input {
					padding: 0 !important;
					height: 100%;
					font-size: 34upx;
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
				background: rgba(6,199,149,1);;
				border-radius: 44upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				margin: 100upx 0 50upx 0;
			}

			.btn-no {
				// opacity: 0.5;
				color:rgba(206,206,206,1);
				background:rgba(246,246,246,1);
			}

		}
	}
</style>
