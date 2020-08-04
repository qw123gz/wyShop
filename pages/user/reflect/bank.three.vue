<template>
	<view class="login">
		<view class="login-name">
			填写银行卡信息
		</view>
		<view class="login-main">
			<view class="login-input">
				<view class="input-name">
					发卡行
				</view>
				<view class="input-con">
					{{bankInfo.bankName}}
				</view>
			</view>
			<view class="login-input" @click="handleTap('pickerCity')">
				<view class="input-name">
					开户地
				</view>
				<input class="input-con" placeholder-class="bankHoderClass"  data-type="bankCity"
				 @input="handleInput" type="text" placeholder="请选择开户地" value="" 
				 v-model="bankInfo.bankCity" disabled />
				 <view class="input-yjt">
				 	<image src="/static/user/yjt.png" mode=""></image>
				 </view>
			</view>
			<view class="login-input" >
				<view class="input-name">
					开户支行
				</view>
				<input class="input-con" placeholder-class="bankHoderClass"  data-type="bankAddress"
				 @input="handleInput" type="text" placeholder="请输入开户支行" value="" 
				 v-model="bankInfo.bankAddress"  />
				 <!-- <view class="input-yjt">
				 	<image src="/static/user/yjt.png" mode=""></image>
				 </view> -->
			</view>
			<view class="login-input">
				<view class="input-name">
					预留手机号
				</view>
				<input class="input-con" placeholder-class="bankHoderClass"  data-type="bankPhone"
				 @input="handleInput" type="number" placeholder="请输入银行预留手机号" value="" 
				 v-model="bankInfo.bankPhone" />
			</view>
			<view @click="submit" class="btn" v-if="isSubimt">
				下一步
			</view>
			<view class="btn btn-no" v-else>
				下一步
			</view>
		</view>
		<!-- 省市区三级 -->
		    <lb-picker ref="pickerCity"
		      v-model="cityList"
		      mode="multiSelector"
		      :list="list"
		      :level="3"
		      @change="handleChange"
		      @confirm="handleConfirm"
		      @cancel="handleCancel">
		    </lb-picker>
			<!-- 开户行数据 -->
			<lb-picker ref="pickerAddress"
				v-model="addressList"
				mode="multiSelector"
				:list="list"
				:level="1"
				@change="handleChangeAdd"
				@confirm="handleConfirmAdd"
				@cancel="handleCancelAdd">
			>
				
				
			</lb-picker>
	</view>

</template>

<script>
	import LbPicker from '@/components/lb-picker'
	import areaData from '@/servers/base/area-data-min'
	export default {
		components: {
            LbPicker
		},
		data() {
			return {
				bankInfo: {
					bankName: '',
					bankAddress:'',
					bankCity: '',
					bankPhone:''
				},
				list:areaData,
				cityList:[],
				addressList:[
					
				],
				isSubimt:false,//是否提交
			}
		},
		onLoad(options) {
		   let bank = JSON.parse(options.bank)
		   this.getBankName(bank.bankCode)
		},
		onShow() {
			
		},
		methods: {
			//获取银行卡所属信息
			getBankName(cardno){
				let data = {
					cmd:'getbankinfo',
					clientid:this.$clientid.index,
					sign:this.$clientid.sign,
					cardno:cardno
				}
				this.$post('',data)
				   .then((res)=>{
					   if(res.status == 0){
						   this.bankInfo.bankName = res.detail.ofbank
					   }else{
						   uni.showToast({
						   	  title:res.msg,
						   	  icon:'none',
						   	  duration:1000
						   })
					   }
				   })
			},
			handleTap (picker) {
				this.$refs[picker].show()
			},
			handleChange (res) {
				console.log('change::', res)
			},
			handleConfirm (res) {
				console.log('confirm::', res)
				let item = res.item
				this.bankInfo.bankCity = item[0].label +'' + item[1].label +'' + item[2].label
				console.log(item[0].label)
				console.log(this.bankInfo.bankCity)
				
			},
			handleCancel (res) {
				console.log('cancel::', res)
			},
			// 输入框的获取
			handleInput(e) {
				let type = e.currentTarget.dataset.type
				let value = e.detail.value
				this.bankInfo[type] = value
				if(this.bankInfo.bankAddress && this.bankInfo.bankCity && this.bankInfo.bankPhone){
					this.isSubimt = true
				}else{
					this.isSubimt = false
				}
			},
			//点击下一步
			submit() {
				if (!this.bankInfo.bankCity) {
					uni.showToast({
						title: '请选择开户地',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				if (!this.bankInfo.bankAddress) {
					uni.showToast({
						title: '请输入开户支行',
						icon: 'none',
						duration: 1000
					})
					return false
				}
				if (!this.bankInfo.bankPhone) {
					uni.showToast({
						title: '请输入持卡人手机号',
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
				for(let key in bankInfo){
					this.bankInfo[key] = bankInfo[key]
				}
				console.log(this.bankInfo)
				uni.setStorageSync('bankInfo',this.bankInfo)
				uni.redirectTo({
					url:'./bank.four'
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
			.input-yjt{
				flex-basis: 30upx;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 14upx;
					height: 24upx;
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
