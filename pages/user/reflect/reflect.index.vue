<template>
	<view class="index mainBg">
		<view class="income">
			<view class="income-type">
				<view class="type-name">
					总收益(元)
				</view>
				<view class="type-price">
					{{reflect.total_revenue || 0}}
				</view>
			</view>
			<view class="income-type">
				<view class="type-name">
					可提现(元)
				</view>
				<view class="type-price">
					{{reflect.withdrawable || 0}}
				</view>
			</view>
		</view>
		<view class="bank-say">
			提现方式
		</view>
		<view class="bank">
			<view class="bank-main">
				<view class="bank-no" v-if="!reflect.isexistbankcard" @click="toBank">
					去绑定银行卡
				</view>
				<view class="bank-no" v-else-if="reflect.isexistbankcard && !isBank" @click="toBank">
					选择银行卡
				</view>
				<view class="back-name" v-if="isBank" @click="toBank">
					<view class="back-name-title">
						{{bank.issuing_bank}}({{bank.cardno.substr(-4)}})
					</view>
					<!-- <view class="back-name-img">
						<image src="/static/index/cf.png" mode=""></image>
					</view> -->

				</view>

			</view>
			<view class="bank-right">
				<image src="/static/user/yjt.png" mode=""></image>
			</view>
		</view>
		<view class="bank-money">
			<view class="money-title">
				提现金额
			</view>
			<view class="money-input">
				<view class="input-icon">
					¥
				</view>
				<input type="number" placeholder="请输入提现金额" placeholder-class="hoderClass" v-model="money" @input="changeValue" />
				<view class="input-title" @click="allPay">
					全部
				</view>
			</view>
			<view class="money-all" v-if="money<=reflect.withdrawable">
				实到金额{{reflect.withdrawable || 0}}
			</view>
			<view class="money-ti" v-if="money>reflect.withdrawable">
				超出可提现余额
			</view>
		</view>
		<view class="btn" v-if="money&&bank" @click="submit">
			提现
		</view>
		<view class="btn btn-no" v-else>
			提现
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				isBank: false, //是否选择银行卡
				money: '', //提现金额
				reflect: {}, //资金信息
				uid: '',
				bank: '' //获取的选定的银行卡
			}
		},
		onLoad() {

		},
		onShow() {
			this.uid = uni.getStorageSync('uid')
			this.getReflect()
			//获取选定的银行卡
			this.getBank()
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			uni.navigateTo({
				url: './reflect.recording'
			})
		},
		methods: {
			//点击全部提现
			allPay(){
				this.money = this.reflect.withdrawable
			},
			submit() {
				uni.showLoading({
					title: '提现中'
				})
				let data = {
					cmd: 'userwithdrawal',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					uid: this.uid,
					fee: this.money,
					bankid: this.bank.bankid,
					yzcode: '123456'

				}
				this.$post('', data)
					.then((res) => {
						uni.hideLoading()
						if (res.status == 0) {
							this.money = ''
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							})
						}
					})
			},
			//获取返回的银行卡数据
			getBank() {
				uni.$on('changeBack', (res) => {

					this.bank = JSON.parse(res)
					this.isBank = true
					console.log(this.bank)
					console.log(this.bank.issuing_bank)
				})
			},
			//获取金额
			changeValue(e) {
				let value = e.detail.value
				this.money = value
			},
			//点击去绑定银行卡	
			toBank() {
				uni.navigateTo({
					url: './bank.one'
				})
			},
			//获取资金信息
			getReflect() {
				let data = {
					cmd: 'getuseraccountcash',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					uid: this.uid
				}
				this.$post('', data)
					.then((res) => {
						if (res.status == 0) {
							this.reflect = res.detail
						} else {
							uni.showToast({
								title: '网络链接失败...',
								icon: 'none',
								duration: 1000
							})
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
		background: #fff;

		.income {
			width: 100%;
			display: flex;
			padding: 30upx 0;
			box-sizing: border-box;
			background: #fff;
			border-bottom: 1px solid #EBEBEB;

			.income-type {
				flex: 1;
				height: 100upx;
				border-right: 1px solid #EBEBEB;
				padding-left: 30upx;

				.type-name {
					width: 100%;
					height: 40upx;
					line-height: 40upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(153, 153, 153, 1);
				}

				.type-price {
					width: 100%;
					height: 60upx;
					line-height: 60upx;
					font-size: 36upx;
					font-family: Sanomat Grab Web;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			}
		}

		.bank-say {
			width: 100%;
			padding: 0 30upx;
			box-sizing: border-box;
			font-size: 30upx;
			font-family: PingFang SC;
			background: #fff;
			font-weight: bold;
			color: rgba(63, 58, 53, 1);
			height: 100upx;
			line-height: 100upx;
		}

		.bank {
			width: 100%;
			height: 114upx;
			display: flex;
			background: #fff;
			padding: 0 30upx;
			box-sizing: border-box;

			.bank-main {
				flex: 1;
				height: 114upx;
				display: flex;

				.bank-no {
					width: 100%;
					text-align: left;
					margin-right: 20upx;
					height: 114upx;
					line-height: 114upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}

				.back-name {
					width: 100%;
					text-align: left;
					margin-right: 20upx;
					height: 114upx;

					display: flex;
					flex-direction: row-reverse;

					.back-name-img {
						flex-basis: 70upx;
						height: 114upx;
						display: flex;
						justify-content: center;
						align-items: center;

						image {
							width: 38upx;
							height: 38upx;
						}
					}

					.back-name-title {
						flex-basis: auto;
						height: 114upx;
						line-height: 114upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}
				}
			}

			.bank-right {
				flex-basis: 20upx;
				height: 114upx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 14upx;
					height: 24upx;
				}
			}
		}

		.bank-money {
			width: 100%;
			background: #fff;
			padding: 0 30upx;
			box-sizing: border-box;

			.money-title {
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}

			.money-input {
				width: 100%;
				height: 100upx;
				padding: 15upx 0;

				border-bottom: 1px solid #EBEBEB;
				display: flex;

				.input-icon {
					flex-basis: 50upx;
					font-size: 56upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					position: relative;
					top: 10upx;
				}

				input {
					flex: 1;
					padding: 0 !important;
					height: 100upx;
					line-height: 100upx;
					font-size: 70upx;
					font-family: Sanomat Grab Web;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.input-title {
					flex-basis: 100upx;
					font-size: 32upx;
					height: 100upx;
					line-height: 100upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(6, 199, 149, 1);
					// position: relative;
					// top: 10upx;
				}
			}

			.money-all {
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;

				.all {
					color: #0F624D !important;
				}
			}

			.money-ti {
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(244, 83, 46, 1);
			}
		}

		.btn {
			width: 630upx;
			text-align: center;
			margin: 100upx auto;
			height: 88upx;
			line-height: 88upx;
			background: rgba(6, 199, 149, 1);
			border-radius: 44upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}

		.btn-no {
			// opacity: 0.5;
			background: rgba(246, 246, 246, 1);
			color: rgba(206, 206, 206, 1);
		}
	}
</style>
