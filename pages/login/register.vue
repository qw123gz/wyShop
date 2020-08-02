<template>
	<view class="login">
		<view class="login-name">
			欢迎注册会员
		</view>
		<view class="login-main">
			<view class="login-input">
				<input placeholder-class="hoderClass" data-type="invitationCode" @input="handleInput"
				 type="text" placeholder="请输入邀请码"
				 value="" v-model="uesrRegister.invitationCode" />
			</view>
			<view class="login-input">
				<input placeholder-class="hoderClass" data-type="uname" @input="handleInput"
				 type="text" placeholder="请输入用户名"
				 value="" v-model="uesrRegister.uname" />
			</view>
			<view class="login-input">
				<input placeholder-class="hoderClass"  data-type="account" @input="handleInput"
				 type="number" placeholder="请输入手机号"
				 value="" v-model="uesrRegister.account" />
			</view>
			<view class="login-code">
				<input placeholder-class="hoderClass"  class="captchaCode-input" data-type="captchaCode"
				 @input="handleInput" type="number" placeholder="请输入验证码"
				 value="" v-model="uesrRegister.captchaCode" />
				 <view class="captchaCode-code">
				 	<text @click="sendCode" class="code-yes"
					  :class="[phoneTitle != '获取验证码' ? 'code-no' : '']"
					  v-if="uesrRegister.account">{{phoneTitle}}</text>
					<text v-else class="code-no">获取验证码</text>
				 </view>
			</view>
			<view class="login-input">
				<input placeholder-class="hoderClass"  data-type="password" @input="handleInput" 
				type="password" placeholder="请输入密码"
				 value="" v-model="uesrRegister.password" />
			</view>
			<view @click="submit" class="btn" v-if="isSubmit">
				立即注册
			</view>
			<view class="btn btn-no" v-else>
				立即注册
			</view>
			<view class="explanation">
				注册即表示您同意
                <text>《服务协议及隐私政策》 </text>      
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
				uesrRegister: {
					account: '15071307905',//手机号
					password: 'qaz123456',//密码
					invitationCode:'WXTL8M',//邀请码
					uname:'',//用户名
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
				this.uesrRegister[type] = value
				if(this.uesrRegister.invitationCode &&
				  this.uesrRegister.uname &&
				  this.uesrRegister.account &&
				  this.uesrRegister.captchaCode &&
				  this.uesrRegister.password 
				){
					this.isSubmit = true
					console.log(this.isSubmit)
				}
			},
			//点击登录
			submit() {
				if (!this.uesrRegister.invitationCode) {
					uni.showToast({
						title: '请输入邀请码',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				if (!this.uesrRegister.uname) {
					uni.showToast({
						title: '请输入用户昵称',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				if (!this.uesrRegister.account) {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				if (!this.uesrRegister.captchaCode) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				if (!this.uesrRegister.password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				this.sendData()
				
			},
			//发送请求
			sendData(){
				let data = {
					cmd:'reguser',
					clientid:this.$clientid.index,
					sign:this.$clientid.sign,
					phone:this.uesrRegister.account,
					invitation_code:this.uesrRegister.invitationCode,
					yzcode:this.uesrRegister.captchaCode,
					uname:this.uesrRegister.uname,
					pwds:this.uesrRegister.password
				}
				this.$post('',data)
				  .then((res)=>{
					  console.log(res)
					  if(res.status == 0){
						  uni.setStorageSync('token',res.token)
						  uni.setStorageSync('uid',res.uid)
						  uni.showToast({
						  	title:'注册成功',
							icon:'none',
							duration:1500,
							success: () => {
								setTimeout(()=>{
									uni.redirectTo({
										url:'./login'
									})
								},1500)
							}
						  })
					  }else{
						  uni.showToast({
						  	title:res.msg,
							icon:'none',
							duration:1500,
							success: () => {
							}
						  })
					  }
				  })
			},
			//发送验证码
			sendCode(){
				if(!this.disabled){
					let result = this.$isPhoneNum(this.uesrRegister.account)
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
					phone:this.uesrRegister.account,
					t:'reg',
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
					this.phoneTitle = this.countdown +'s'
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
					color:rgba(15,98,77,1);
					.code-no{
						font-size:34upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(206,206,206,1);
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
				background: rgba(15, 98, 77, 1);
				border-radius: 44upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				margin: 100upx 0 50upx 0;
			}

			.btn-no {
				opacity: 0.5;
			}
			.explanation{
				width: 100%;
				margin-top: 130upx;
				text-align: center;
				font-size:24upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(153,153,153,1);
				text{
					color: #0F624D;
				}
			}

		}
	}
</style>
