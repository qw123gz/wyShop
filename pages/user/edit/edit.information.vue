<template>
	<view class="index">
		<view class="main">
			<view class="item">
				<view class="item-name">
					联系人
				</view>
				<input class="item-title" placeholder="请输入联系姓名" data-type="name" placeholder-class="hoderClassadd" @input="handleInput"
				 type="text" v-model="info.name">

				</input>
			</view>
			<view class="item">
				<view class="item-name">
					电话
				</view>
				<input class="item-title" placeholder="请输入联系人电话" data-type="stel" placeholder-class="hoderClassadd" @input="handleInput"
				 type="text" v-model="info.stel">

				</input>
			</view>
			<view class="item" @click="handleTap('pickerCity')">
				<view class="item-name">
					地址
				</view>
				<input class="item-title" placeholder="请选择地区" disabled data-type="city" placeholder-class="hoderClassadd" @input="handleInput"
				 type="text" v-model="info.city">

				</input>
				<view class="input-yjt">
					<image src="/static/user/yjt.png" mode=""></image>
				</view>
			</view>
			<view class="item">
				<view class="item-name">
					详细地址
				</view>
				<input class="item-title" placeholder="请输入详细地址" data-type="address" placeholder-class="hoderClassadd" @input="handleInput"
				 type="text" v-model="info.address">

				</input>
			</view>
			<view class="item-date">
				<view class="item-name">
					营业时间
				</view>
				<view class="item-title" v-if="!isDate">
					<view class="item-title-no">
						请设置营业时间
					</view>
				</view>
				<view class="item-title" v-else>
					<view class="item-title-date">
						
						<text @click="editDate('1')">{{info.startTime}} </text>
						<text @click="deleteDate(0)" v-if="info.startTime">删除</text>
					</view>
					<view class="item-title-date">
						
						<text @click="editDate('2')">{{info.endTime}}  </text>
						<text @click="deleteDate(1)" v-if="info.endTime">删除</text>
					</view>
				</view>
				<view class="input-add" @click="handleTap('pickerDate')">
					<image src="/static/user/addre.png" mode=""></image>
				</view>
			</view>
			<!-- 门店照片 -->
			<view class="shop">
				<view class="shop-name">
					门店照片
				</view>
				<view class="shop-banner" v-if="info.imgList.length>0">
					<view class="banner-img" v-for="(item,index) in info.imgList" :key="index">
						<image :src="item" mode=""></image>
						<view class="delete" @click="deleteImg(index)">
							<view class="delete-box">
								<image src="/static/user/delete.png" mode=""></image>
								<view class="">
									
								</view>
							</view>
						</view>
					</view>
					<view class="banner-img" v-if="info.imgList.length < 3" @click="chooseAndUp">
						<image src="/static/user/addimg.png" mode=""></image>
					</view>
				</view>
				<view class="shop-banner" v-else @click="chooseAndUp">
					<view class="banner-img">
						<image src="/static/user/addimg.png" mode=""></image>
					</view>
				</view>
			</view>
			<!-- btn -->
			<view class="btn" v-if="isSubimt" @click="send">
				保存
			</view>
			<view class="btn btn-no" v-else>
				保存
			</view>
		</view>
		<!-- 省市区三级 -->
		<lb-picker ref="pickerCity" v-model="cityList" mode="multiSelector" :list="list" :level="3" @change="handleChange"
		 @confirm="handleConfirm" @cancel="handleCancel" cancel-color="#06C795" confirm-color="#06C795">
		</lb-picker>
		<lb-picker ref="pickerDate" mode="unlinkedSelector" :list="datelist" confirm-text="下一步" @confirm="confirmDate"
		 @cancel="cancelDate" v-model="dateValue" cancel-color="#06C795" confirm-color="#06C795">
			<view slot="action-center" class="picker">
				选择星期
			</view>
		</lb-picker>
		<lb-picker ref="pickerHour" mode="unlinkedSelector" :list="hourList" @confirm="confirmHour" @cancel="cancelHour"
		 v-model="hourValue" cancel-color="#06C795" confirm-color="#06C795">
			<view slot="action-center" class="picker">
				选择时间
			</view>
		</lb-picker>
	</view>
</template>

<script>
	import LbPicker from '@/components/lb-picker'
	import areaData from '@/servers/base/area-data-min'
	import hourList from '@/servers/base/date'
	export default {
		components: {
			LbPicker
		},
		data() {
			return {
				dateShow: false, //星期是否选择
				dateValue: [], //星期的值
				hourValue: [], //时间区间的值
				info: {
					name: '',
					address: '',
					city: '',
					stel: '',
					startTime: '',
					endTime: '',
					imgList: [
						
					], //线上照片路径
					province: '',
					provincecode: '',
					cityy: '',
					citycode: '',
					area: '',
					areacode: ''
				},
				localImgList: [], //选择的本地照片路径
				list: areaData,
				cityList: [],
				addressList: [

				],
				isSubimt: false, //是否提交
				datelist: [
					[{
							value: '01',
							label: '周一'
						},
						{
							value: '02',
							label: '周二'
						},
						{
							value: '03',
							label: '周三'
						},
						{
							value: '04',
							label: '周四'
						},
						{
							value: '05',
							label: '周五'
						},
						{
							value: '06',
							label: '周六'
						},
						{
							value: '07',
							label: '周日'
						},
					],
					[{
						value: '00',
						label: '至'
					}],
					[{
							value: '11',
							label: '周一'
						},
						{
							value: '12',
							label: '周二'
						},
						{
							value: '13',
							label: '周三'
						},
						{
							value: '14',
							label: '周四'
						},
						{
							value: '15',
							label: '周五'
						},
						{
							value: '16',
							label: '周六'
						},
						{
							value: '17',
							label: '周日'
						},
					]
				],
				hourList: hourList,
				isDate: false, //是否设置营业时间
				storeid: '',
				temporaryStartTime: '', //临时起始营业时间
				temporaryEndTime: '', //临时结束营业时间
				typeDate:'',//点击时间
			}
		},
		onLoad() {
			this.storeid = uni.getStorageSync('storeid')
			this.getInformation()
		},
		methods: {
			//点击时间修改时间
			editDate(e){
				// this.typeDate = e
				// this.$refs['pickerDate'].show()
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
					  // console.log(res)
					  if(res.status == 0){
						  // this.information = res.detail
						  this.info.name = res.detail.scontacts
						  this.info.address = res.detail.saddress
						  this.info.city = res.detail.sprovince + '' + res.detail.scity + '' +res.detail.sarea
						  this.info.stel = res.detail.stel
						  console.log(this.info.stel)
						  if(res.detail.sbusinesshours){
							  this.isDate = true
							  this.info.startTime = res.detail.sbusinesshours
							  this.info.endTime = res.detail.sbusinesshours_end
						  }
						  
						  this.info.imgList = res.detail.imglist
					  }
				  })
			},
			//删除时间
			deleteDate(e) {
				let type = e
				if (type == 0) {
					this.temporaryStartTime = ''
					this.info.startTime = ''

				} else {
					this.temporaryEndTime = ''
					this.info.endTime = ''
				}
				if(this.info.startTime == ''  && this.info.endTime == ''){
					this.isDate = false
					this.isSubimt = false
				}
				if (this.info.address && this.info.city && this.info.stel &&
					this.info.name && this.info.imgList.length > 0 && (this.info.startTime || this.info.endTime)) {
					this.isSubimt = true
				} else {
					this.isSubimt = false
				}
			},
			//获取选择的时间
			confirmHour(e) {
				let value = e.item[0].label + ':' + e.item[1].label + '~' + e.item[3].label + ':' + e.item[4].label
				if (this.info.startTime == '') {
					this.temporaryStartTime = this.temporaryStartTime + ' ' + value
					this.info.startTime = this.temporaryStartTime
				}
				if (this.info.endTime == '' && this.info.startTime != '') {
					if (this.temporaryEndTime != '') {
						this.temporaryEndTime = this.temporaryEndTime + ' ' + value
						this.info.endTime = this.temporaryEndTime
					}
				}
				if(this.typeDate != ''){
					if(this.typeDate == '1'){
						this.temporaryStartTime = this.temporaryStartTime + ' ' + value
						this.info.startTime = this.temporaryStartTime
					}
					if(this.typeDate == '2'){
						this.temporaryEndTime = this.temporaryEndTime + ' ' + value
						this.info.endTime = this.temporaryEndTime
					}
				}
				if (this.info.address && this.info.city && this.info.stel &&
					this.info.name && this.info.imgList.length > 0 && (this.info.startTime || this.info.endTime)) {
					this.isSubimt = true
				} else {
					this.isSubimt = false
				}
				this.isDate = true
				// console.log(this.info.startTime)
				// console.log(this.info.endTime)
			},
			//点击取消时间
			cancelHour(e) {

			},
			//获取选择的星期
			confirmDate(e) {
				// console.log(e)
				let value = e.item[0].label + '~' + e.item[2].label
				if (this.info.startTime == '') {
					this.temporaryStartTime = value
				}
				if (this.info.endTime == '' && this.info.startTime != '') {
					this.temporaryEndTime = value
				}
				if(this.typeDate != ''){
					if(this.typeDate == '1'){
						this.temporaryStartTime = value
					}
					if(this.typeDate == '2'){
						this.temporaryEndTime = value
					}
				}
				this.$refs['pickerHour'].show()
			},
			//点击取消星期
			cancelDate(e) {

			},
			// 输入框的获取
			handleInput(e) {
				let type = e.currentTarget.dataset.type
				let value = e.detail.value
				this.info[type] = value
				
				if (this.info.address && this.info.city && this.info.stel &&
					this.info.name && this.info.imgList.length > 0 &&  (this.info.startTime || this.info.endTime)) {
					this.isSubimt = true
				} else {
					this.isSubimt = false
				}
			},
			//点击保存信息
			send() {
				console.log(11)
				let data = {
					cmd: 'updatestoreinfo',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					storeid: this.storeid,
					contacts: this.info.name,
					tel: this.info.stel,
					address: this.info.address,
					businesshours: this.info.startTime,
					businesshours_end: this.info.endTime,
					imglist: this.info.imgList,
					province: this.info.province,
					provincecode: this.info.provincecode,
					city: this.info.cityy,
					citycode: this.info.citycode,
					area: this.info.area,
					areacode: this.info.areacode
				}
				this.$post('', data).
				then((res) => {
					console.log(res)
					if (res.status == 0) {
						uni.showToast({
							title: '信息保存成功',
							icon: 'none',
							duration: 1500,
							success() {
								setTimeout(()=>{
									uni.switchTab({
										url:'../../index/index'
									})
								},1500)
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
				.catch((err)=>{
					console.log(err)
				})
			},
			//显示picker
			handleTap(picker) {
				this.$refs[picker].show()
			},
			handleChange(res) {
				console.log('change::', res)
			},
			handleConfirm(res) {
				let item = res.item

				this.info.city = item[0].label + '' + item[1].label + '' + item[2].label
				this.info.province = item[0].label
				this.info.provincecode = item[0].value
				this.info.cityy = item[1].label
				this.info.citycode = item[1].value
				this.info.area = item[2].label
				this.info.areacode = item[2].value
				// console.log(this.info.city)

			},
			handleCancel(res) {
				console.log('cancel::', res)
			},
			//删除照片
			deleteImg(index) {
				let imglist = this.info.imgList
				imglist.splice(index, 1);
				this.info.imgList = imglist
				console.log('cancel::', this.info.imgList.length)
				if(this.info.imgList.length==0){
					this.isSubimt = false
				}else{
					this.isSubimt = true
				}
			},
			// 选择图片和上传到服务器函数
			chooseAndUp: function() {
				// let token = wx.getStorageSync('token')

				var that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'], //压缩还是原图
					sourceType: ['album', 'camera'], //相机和相册
					success: function(res) {
						console.log(res)
						// this.localImgList = this.localImgList.concat(res.tempFilePaths)

						// 将图片上传到服务器
						const tempFilePaths = res.tempFilePaths;
						var timestamp = Date.parse(new Date()) / 1000
						console.log(tempFilePaths)
						for (var i = 0; i < tempFilePaths.length; i++) {
							// let url = 'https://api.51chafang.vip/wyapis/?cmd=uploadfiles&clientid' + that.$clientid.index + '&sign=' +
							// 	that.$clientid.sign + '&storeid=' + that.storeid + '&timestamp=' + timestamp + '&ftype=storeimg'

							uni.uploadFile({
								url: 'https://api.51chafang.vip/wyapis/',
								filePath: tempFilePaths[i],
								name: 'image',
								formData: {
									cmd: 'uploadfiles',
									clientid: that.$clientid.index,
									token:uni.getStorageSync('token'),
									sign: that.$clientid.sign,
									storeid: that.storeid,
									timestamp: timestamp,
									ftype: 'storeimg'
								},
								header: {
									'content-type': 'multipart/form-data'
								},
								success(res) {
									console.log(res)
									var obj = JSON.parse(res.data);
									console.log(obj)
									var picture = obj.detail.uploadfilenmae;
									that.info.imgList.push(picture)
									// console.log(that.info.imgList.length)
									if (that.info.address && that.info.city && that.info.stel &&
										that.info.name && that.info.imgList.length > 0 &&  (this.info.startTime || this.info.endTime)) {
										that.isSubimt = true
									} else {
										that.isSubimt = false
									}
								}

							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.index {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		overflow: hidden;

		.main {
			width: 100%;
			height: auto;

			.item {
				width: 100%;
				height: auto;
				padding: 30upx 0;
				border-bottom: 1px solid #E4E4E4;
				display: flex;

				.item-name {
					flex-basis: 150upx;
					height: 50upx;
					line-height: 50upx;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(49, 48, 48, 1);
				}

				.item-title {
					flex: 1;
					text-align: right;
					height: 50upx;
					line-height: 50upx;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(49, 48, 48, 1);

				}

				.input-yjt {
					flex-basis: 30upx;
					height: 50upx;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 14upx;
						height: 24upx;
					}
				}

			}

			.item-date {
				width: 100%;
				height: auto;
				padding: 30upx 0;
				border-bottom: 1px solid #E4E4E4;
				display: flex;

				.item-name {
					flex-basis: 150upx;
					height: 80upx;
					line-height: 80upx;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(49, 48, 48, 1);
				}

				.item-title {
					flex: 1;

					view {
						width: 100%;
						text-align: right;
						height: 40upx;
						line-height: 40upx;
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(49, 48, 48, 1);

						text:nth-child(2){
							font-size: 32upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: rgba(255, 61, 62, 1);
							margin-left: 20upx;
						}
					}

					.item-title-no {
						width: 100%;
						height: 80upx;
						line-height: 80upx;
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(206, 206, 206, 1);
					}
				}

				.input-add {
					flex-basis: 50upx;
					height: 80upx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 20upx;

					image {
						width: 40upx;
						height: 40upx;
					}
				}
			}

			.shop {
				width: 100%;
				height: auto;
				padding-bottom: 30upx;

				.shop-name {
					width: 100%;
					height: 120upx;
					line-height: 120upx;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(49, 48, 48, 1);
				}

				.shop-banner {
					width: 100%;
					display: flex;

					.banner-img {
						flex-basis: 190upx;
						height: 190upx;
						border-radius: 20upx;
						margin-right: 20upx;
						position: relative;

						image {
							width: 100%;
							height: 100%;
						}

						.delete {
							position: absolute;
							right: -20upx;
							top: -28upx;
							width: 60upx;
							height: 60upx;

							.delete-box {
								display: flex;
								justify-content: center;
								align-items: center;
								width: 60upx;
								height: 60upx;

								image {
									width: 38upx;
									height: 38upx;

								}

								view {
									width: 20upx;
									height: 4upx;
									background: rgba(255, 255, 255, 1);
									border-radius: 2upx;
									position: absolute;
									z-index: 10;
								}
							}
						}
					}


				}
			}

			.btn {
				width: 690upx;
				height: 88upx;
				text-align: center;
				line-height: 88upx;
				margin: 50upx auto;
				background: rgba(6, 199, 149, 1);
				border-radius: 44upx;
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}

			.btn-no {
				background: rgba(246, 246, 246, 1) !important;
				color: rgba(206, 206, 206, 1) !important;
			}

			.message {
				width: 100%;
				height: 92upx;
				height: auto;
				margin-bottom: 30upx;
				padding-left: 30upx;
				box-sizing: border-box;
				display: flex;
				background: rgba(251, 250, 250, 1);
				border-radius: 20upx;

				.message-icon {
					flex-basis: 32upx;
					height: 92upx;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 32upx;
						height: 32upx;
					}
				}

				.message-title {
					flex: 1;
					height: 92upx;
					margin-left: 20upx;
					line-height: 92upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(228, 195, 125, 1);
				}
			}
		}

		.picker {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(49, 48, 48, 1);
		}
	}
</style>
