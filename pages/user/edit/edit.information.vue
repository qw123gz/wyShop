<template>
	<view class="index">
		<view class="main">
			<view class="item">
				<view class="item-name">
					联系人
				</view>
				<input class="item-title" placeholder="请输入联系姓名" data-type="name" 
				@input="handleInput" type="text" v-model="info.name">

				</input>
			</view>
			<view class="item">
				<view class="item-name">
					电话
				</view>
				<input class="item-title" placeholder="请输入联系人电话" data-type="phone"
				 @input="handleInput" type="number" v-model="info.phone">

				</input>
			</view>
			<view class="item" @click="handleTap('pickerCity')">
				<view class="item-name">
					地址
				</view>
				<input class="item-title" placeholder="请选择地区" disabled data-type="city"
				 @input="handleInput" type="text" v-model="info.city">

				</input>
				<view class="input-yjt">
					<image src="/static/user/yjt.png" mode=""></image>
				</view>
			</view>
			<view class="item">
				<view class="item-name">
					详细地址
				</view>
				<input class="item-title" placeholder="请输入详细地址" data-type="address"
				 @input="handleInput" type="text" v-model="info.address">

				</input>
			</view>
			<view class="item-date">
				<view class="item-name">
					营业时间
				</view>
				<view class="item-title">
					<view class="item-title-date">
						周一~周五 8:00~18:00 <text>删除</text>
					</view>
					<view class="item-title-date">
						周六~周日 8:30~17:30 <text>删除</text>
					</view>
				</view>
				<view class="input-add">
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
						<image src="/static/index/cfbj.png" mode=""></image>
						<view class="delete" @click="deleteImg(index)">
							<view class="delete-box">
								<image src="/static/user/delete.png" mode=""></image>
								<view class="">
									-
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
			<view class="btn btn-no" v-else >
				保存
			</view>
		</view>
		<!-- 省市区三级 -->
		<lb-picker ref="pickerCity" v-model="cityList" mode="multiSelector" :list="list" :level="3" @change="handleChange"
		 @confirm="handleConfirm" @cancel="handleCancel">
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
				info: {
					name: '',
					address: '',
					city: '',
					phone: '',
					startTime: '',
					endTime: '',
					imgList: []//线上照片路径
				},
				localImgList:[],//选择的本地照片路径
				list: areaData,
				cityList: [],
				addressList: [

				],
				isSubimt: false, //是否提交
			}
		},
		onLoad() {

		},
		methods: {
			// 输入框的获取
			handleInput(e) {
				let type = e.currentTarget.dataset.type
				let value = e.detail.value
				this.info[type] = value
				if(this.info.address && this.info.city && this.info.phone 
				&& this.info.name && this.info.imgList.length>0 && this.info.startTime && this.info.endTime){
					this.isSubimt = true
				}else{
					this.isSubimt = false
				}
			},
			//点击保存信息
			send(){
				
			},
			handleTap(picker) {
				this.$refs[picker].show()
			},
			handleChange(res) {
				console.log('change::', res)
			},
			handleConfirm(res) {
				console.log('confirm::', res)
				let item = res.item
				this.info.city = item[0].label + '' + item[1].label + '' + item[2].label
				console.log(item[0].label)
				console.log(this.info.city)

			},
			handleCancel(res) {
				console.log('cancel::', res)
			},
			//删除照片
			deleteImg(index){
				let imglist = this.info.imgList
				imglist.splice(index, 1);
				this.info.imgList = imglist
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
						console.log(tempFilePaths)
						for (var i = 0; i < tempFilePaths.length; i++) {

							uni.uploadFile({
								url: '',
								filePath: tempFilePaths[i],
								name: 'image',
								formData: {

								},
								success(res) {
									console.log(res)
									var obj = JSON.parse(res.data);
									console.log(obj)
									var picture = obj.uploadfileurl;
									this.info.imgList.push(picture)
									console.log(this.info.imgList)
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

						text {
							font-size: 32upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: rgba(255, 61, 62, 1);
							margin-left: 20upx;
						}
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
            .btn{
				width:690upx;
				height:88upx;
				text-align: center;
				line-height: 88upx;
				margin: 50upx auto;
				background:rgba(6,199,149,1);
				border-radius:44upx;
				font-size:32upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(255,255,255,1);
			}
			.btn-no{
				background:rgba(246,246,246,1) !important;
				color:rgba(206,206,206,1) !important;
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
	}
</style>
