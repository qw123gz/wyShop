<template>
	<view class="login">
		<view class="login-name">
			店主登录
		</view>
		<view class="login-main">
			<view class="login-input">
				<input placeholder-class="hoderClass"  data-type="account" @input="handleInput" type="number" placeholder="请输入店主手机号" value="" v-model="uesrInfo.account" />
			</view>
			<view class="login-input">
				<input placeholder-class="hoderClass"  data-type="password" @input="handleInput" type="password" placeholder="请输入密码" value="" v-model="uesrInfo.password" />
			</view>
			<view @click="submit" class="btn" v-if="uesrInfo.account && uesrInfo.password">
				登录
			</view>
			<view class="btn btn-no" v-else>
				登录
			</view>
			<view class="login-reset">
				<!-- <text @click="toReset" class="password">忘记密码?</text> -->
				<text @click="toReset" class="register">忘记密码?</text>
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
				uesrInfo: {
					account: '',
					password: '' 
				}
			}
		},
		onLoad() {
           uni.removeStorage({
           	key:'jump'
           })
		},
		onShow() {
			let token =uni.getStorageSync('token')
			console.log(token)
			if(token != ''){
				uni.switchTab({
					url:'../index/index'
				})
			}
		},
		methods: {
			//点击忘记密码
			toReset() {
				uni.navigateTo({
					url: './reset'
				})
			},
			//点击去注册
			toRegister() {
				uni.navigateTo({
					url: './register'
				})
			},
			// 输入框的获取
			handleInput(e) {
				let type = e.currentTarget.dataset.type
				let value = e.detail.value
				this.uesrInfo[type] = value
			},
			//点击登录
			submit() {
				if (!this.uesrInfo.account) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				if (!this.uesrInfo.password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				this.sendInfo()
			},
			//发送请求
			sendInfo(){
				let data = {
					cmd:'loginuser',
					clientid:this.$clientid.index,
					sign:this.$clientid.sign,
					phone:this.uesrInfo.account,
					pwds:this.uesrInfo.password
				}
				this.$post('',data)
				   .then((res)=>{
					   console.log(res)
					   if(res.status == 0){
						   uni.setStorageSync('token',res.token)
						   uni.setStorageSync('isLogin',true)
						   uni.setStorageSync('storeid',res.storeid)
						   uni.setStorageSync('encry_storeid',res.encry_storeid)
						   uni.setStorageSync('account',this.uesrInfo.account)
						   this.$emit('login')
						   uni.showToast({
						   	title:'登录成功',
							icon:'none',
							duration:1500,
							success: () => {
								setTimeout(()=>{
									uni.switchTab({
										url:'../index/index'
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

			.login-input {
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				border-bottom: 1px solid #EBEBEB;
                margin-top: 20upx;
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
				background: #06C795;
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
				background:#F6F6F6;
			}

			.login-reset {
				width: 100%;
				height: 50upx;
				padding: 0 40upx;
				box-sizing: border-box;
				line-height: 50upx;

				.password {
					float: left;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}

				.register {
					float: right;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color:rgba(6,199,149,1)
				}
			}
		}
	}
</style>
