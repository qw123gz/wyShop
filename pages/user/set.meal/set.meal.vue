<template>
	<view class="index">
		<view class="" v-if="dataList.length>0">
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<view class="item-top">
					<view class="item-top-img">
						<image :src="item.pimage_ithumbnail" mode=""></image>
					</view>
					<view class="item-top-main">
						<view class="main-name">
							<view class="name">
								{{item.package_name}} × <text>{{item.ordernum}}</text>
							</view>
							<view class="label" v-if="item.is_send == 1">
								已送出
							</view>
							<view class="label2" @click="send(JSON.stringify(item),index)"  v-if="item.is_send == 0">
								送出
							</view>
						</view>
						<view class="main-price">
							¥ {{item.fee}}
						</view>
					</view>
				</view>
				<view class="item-bot">
					<view class="item-bot-img">
						<image src="/static/user/rw.png" mode=""></image>
					</view>
					<view class="item-bot-name">
						{{item.username}} {{item.uphone}} 
					</view>
					<view class="item-bot-date">
						{{item.createtime1}}
					</view>
				</view>
				<view class="br20"></view>
			</view>
		</view>
		<!-- 弹窗提示是否退出积分 -->
		<view class="dilog" v-if="dilog">
			<view class="dilog-name">
				提示
			</view>
			<view class="dilog-title">
				是否确认已送出套餐？
			</view>
			<view class="dilog-btn">
				<view class="btn-no" @click="cancel">
					取消
				</view>
				<view class="btn-yes" @click="confrim">
					确认
				</view>
			</view>
		</view>
		<!-- 遮罩层 -->
		<view class="mask" v-if="dilog"  :catchtouchmove="true"></view>
		<NoRecord v-if="dataList.length == 0" description="暂无套餐销售记录"></NoRecord>
		<noMore v-if="!isMore && dataList.length > 0"></noMore>
	</view>
</template>

<script>
	import NoRecord from '@/components/NoRecord.vue'
	import noMore from "@/components/noMore.vue"
	export default {
		components: {
			NoRecord,
			noMore
		},
		data() {
			return {
				dataList: [],
				pagesize: 10,
				page: 1,
				isMore: false,
				storeid: '',
				dilog:false,
				item:'',//点中选择的item
				index:0,//点击item
			}
		},
		onLoad() {
			this.storeid = uni.getStorageSync('storeid')
			this.getShopList()
		},
		onReachBottom() {
			console.log(this.isMore)
			if (this.isMore) {
				this.getShopList()
			}
		},
		methods: {
			//点击取消
			cancel(){
				this.dilog = false
			},
			//点击确认
			confrim(){
				this.dilog = false
				let that = this
				let data = {
					cmd: 'sendpackage',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					storeid: this.storeid,
					orderid:this.item.orderid
				}
				this.$post('',data).then((res) => {
					console.log(res)
					if(res.status == 0){
						uni.showToast({
							title:'套餐已送出',
							icon:'none',
							duration:1500,
							success() {
								setTimeout(()=>{
									console.log(that.dataList[that.index])
									that.dataList[that.index].is_send = '1'
								},1500)
							}
						})
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			//点击送出
			send(e,index){
				let item = JSON.parse(e)
				this.item = item
				this.index = index
				this.dilog = true
			},
			getShopList() {
				let data = {
					cmd: 'getstoresales',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					page: this.page,
					pagesize: this.pagesize,
					storeid: this.storeid
				}
				this.$post('', data).then((res) => {
						console.log(res)
						if (res.status == 0) {
							let data = res.response
							this.dataList = this.dataList.concat(data)
							let isMore = data.length < this.pagesize
							if (isMore) {
								this.isMore = false
							} else {
								this.isMore = true
								this.page = this.page + 1
							}
						} else {
							this.isMore = false
						}
					}),
					((err) => {
						console.log(err)
						this.isMore = false
					})
			},
		}
	}
</script>

<style lang="less" scoped>
	.index {
		width: 100%;
		overflow: hidden;

		.item {
			width: 100%;

			.item-top {
				width: 100%;
				padding: 30upx;
				box-sizing: border-box;
				display: flex;
				border-bottom: 1px solid #E4E4E4;

				.item-top-img {
					flex-basis: 120upx;
					height: 120upx;
					border-radius: 10upx;

					image {
						width: 120upx;
						height: 120upx;
					}
				}

				.item-top-main {
					flex-basis: 550upx;
					height: 120upx;
					position: relative;
					margin-left: 20upx;

					.main-name {
						width: 550upx;
						display: flex;

						.name {
							flex-basis: 430upx;
							font-size: 32upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba(49, 48, 48, 1);
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.label {
							flex-basis: 120upx;
							text-align: right;
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: rgba(49, 48, 48, 1);
						}

						.label2 {
							flex-basis: 120upx;
							height: 54upx;
							text-align: center;
							line-height: 54upx;
							background: rgba(6, 199, 149, 1);
							border-radius: 27upx;
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: rgba(255, 255, 255, 1);
						}
					}

					.main-price {
						position: absolute;
						bottom: 0;
						font-size: 36upx;
						font-family: DIN 1451 Mittelschrift;
						font-weight: 400;
						color: rgba(6, 199, 149, 1);
					}
				}
			}

			.item-bot {
				width: 100%;
				padding: 30upx;
				box-sizing: border-box;
				display: flex;

				.item-bot-img {
					flex-basis: 30upx;
					height: 40upx;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 34upx;
						height: 34upx;
					}
				}

				.item-bot-name {
					flex: 1;
					height: 40upx;
					line-height: 40upx;
					margin-left: 20upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(49, 48, 48, 1);
				}

				.item-bot-date {
					flex: 1;
					height: 40upx;
					text-align: right;
					line-height: 40upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(145, 146, 151, 1);
				}
			}
		}
		/* 弹出层 */
		.mask{
		  width: 100%;
		  height: 100%;
		  position: fixed;
		  top: 0;
		  left: 0;
		  bottom: 0;
		  right: 0;
		  background: #666666;
		  z-index: 10;
		  opacity: 0.6;
		  overflow: hidden;
		}
		.dilog{
			width:80%;
			height:379upx;
			background:rgba(255,255,255,1);
			border-radius:20upx;
			position: fixed;
			z-index: 100;
			top:450upx;
			left: 10%;
			.dilog-name{
				width: 100%;
				text-align: center;
				padding: 30upx 0;
				font-size:38upx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(49,48,48,1);
			}
			.dilog-title{
				width: 100%;
				text-align: center;
				padding: 30upx 0;
				font-size:32upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(49,48,48,1);
			}
			.dilog-btn{
				width: 100%;
				padding: 0 30upx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				margin-top: 50upx;
				.btn-no{
					width:235upx;
					text-align: center;
					height:74upx;
					line-height: 74upx;
					border:1px solid rgba(6,199,149,1);
					border-radius:37upx;
					font-size:32upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(6,199,149,1);
				}
				.btn-yes{
					width:235upx;
					text-align: center;
					height:74upx;
					border-radius:37upx;
					line-height: 74upx;
					background:rgba(6,199,149,1);
					font-size:32upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(255,255,255,1);
				}
			}
		}
	}
</style>
