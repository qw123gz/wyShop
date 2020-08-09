<template>
	<view class="index">
		<view class="main">
			<view class="type bb">
				<view class="type-name">
					原密码
				</view>
				<input class="type-input" type="password" data-type="oldPassword" @input="resetWord" v-model="userPassword.oldPassword"
				 value="" placeholder="请输入原密码" placeholder-class="hoderClass" />
			</view>
			<view class="type bb">
				<view class="type-name">
					新密码
				</view>
				<input class="type-input" type="password" data-type="newPassword" @input="resetWord" v-model="userPassword.newPassword"
				 value="" placeholder="请输入新密码" placeholder-class="hoderClass" />
			</view>
			<view class="type">
				<view class="type-name">
					确认密码
				</view>
				<input class="type-input" type="password" data-type="newPasswordTwo" @input="resetWord" v-model="userPassword.newPasswordTwo"
				 value="" placeholder="请再次输入新密码" placeholder-class="hoderClass" />
			</view>
		</view>
		<view class="btn" @click="submit" v-if="isSubmit">
			保存
		</view>
		<view class="btn btn-no" v-else>
			保存
		</view>
		<Copyright></Copyright>
	</view>
</template>

<script>
	import Copyright from '@/components/Copyright.vue'
	export default {
		components: {
			Copyright
		},
		data() {
			return {
				//密码
				userPassword: {
					oldPassword: '',
					newPassword: '',
					newPasswordTwo: ''
				},
				isSubmit: false, //是否提交
			}
		},
		onLoad() {

		},
		methods: {
			//input框的值变化
			resetWord(e) {
				let type = e.currentTarget.dataset.type
				let value = e.detail.value
				this.userPassword[type] = value
				if (this.userPassword.oldPassword && this.userPassword.newPassword && this.userPassword.newPasswordTwo) {
					this.isSubmit = true
				}
			},
			//验证输入框
			submit(){
				if(this.userPassword.newPassword != this.userPassword.newPasswordTwo){
					uni.showToast({
						title:'新密码不一致',
						icon:'none',
						duration:1500
					})
					return false
				}
				this.sendCode()
			},
			//点击去提交
			sendCode() {
				let data = {
					cmd: 'setmyaccount',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					oldpwd: this.userPassword.oldPassword,
					uid: uni.getStorageSync('uid') || '',
					newpwd: this.userPassword.newPassword,
					repwd: this.userPassword.newPasswordTwo
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

			}
		},
	}
</script>

<style lang="less" scoped>
	.index {
		width: 100%;
		height: 100vh;
		background: #fff;

		.ntop {
			padding-top: 0 !important;
		}

		.main {
			width: 100%;
			height: auto;
			padding: 0 30upx;
			box-sizing: border-box;
			padding-top: 30upx;
			background: #fff;

			.bb {
				border-bottom: 1px solid #EBEBEB;
			}

			.type {
				width: 100%;
				height: 100upx;
				display: flex;

				.type-name {
					flex-basis: 170upx;
					height: 100upx;
					line-height: 100upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}

				.type-input {
					flex: 1;
					padding: 0 !important;
					height: 100upx;
					line-height: 100upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}
			}
		}

		.btn {
			width: 630upx;
			text-align: center;
			line-height: 88upx;
			margin: auto;
			margin-top: 100upx;
			height: 88upx;
			background: rgba(6,199,149,1);;
			border-radius: 44upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}

		.btn-no {
			// opacity: 0.5;
			color:rgba(206,206,206,1);
			background:rgba(246,246,246,1);
		}
	}
</style>
