<template>
	<view class="index mainBg">
		<view class=""  v-if="dataList.length>0">
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<view class="item-top">
					<view class="item-top-img">
						<image src="/static/user/rw.png" mode=""></image>
					</view>
					<view class="item-top-main">
						<view class="main-name">
							<view class="name">
								{{item.username}} {{item.uphone}}
							</view>
							<view class="count">
								{{item.score}}
							</view>
						</view>
						<view class="main-price">
							<view class="name">
								{{item.createtime}}
							</view>
							<view class="label"  v-if="item.returnstatus == 1">
								已退还
							</view>
							<view class="label2" @click="send(JSON.stringify(item),index)" v-if="item.returnstatus == 0">
								退积分
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹窗提示是否退出积分 -->
		<view class="dilog" v-if="dilog">
			<view class="dilog-name">
				提示
			</view>
			<view class="dilog-title">
				是否确认退还积分给{{uname}}？
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
		<NoRecord v-if="dataList.length == 0" description="暂无积分回收记录"></NoRecord>
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
				uname:''
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
					cmd: 'backreturnscore',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					storeid: this.storeid,
					sfid:this.item.sf_id
				}
				this.$post('',data).then((res) => {
					console.log(res)
					if(res.status == 0){
						uni.showToast({
							title:'积分退还成功',
							icon:'none',
							duration:1500,
							success() {
								setTimeout(()=>{
									console.log(that.dataList[that.index])
									that.dataList[that.index].returnstatus = '1'
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
				this.dilog = true
				let item = JSON.parse(e)
				this.item = item
				console.log(this.item)
				this.index = index
				this.uname = this.item.username
			},
			getShopList() {
				let data = {
					cmd: 'getreturnstorescores',
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
		min-height: 100vh;
		overflow: hidden;
       
		.item {
			width: 100%;
            background: #fff;
			.item-top {
				width: 92%;
				margin: 0 auto;
				padding: 30upx;
				box-sizing: border-box;
				display: flex;
				border-bottom: 1px solid #E4E4E4;

				.item-top-img {
					flex-basis: 34upx;
					height: 34upx;
					image {
						width: 100%;
						height: 100%;
						position: relative;
						top:-5upx;
					}
				}

				.item-top-main {
					flex: 1;
					height: 120upx;
					position: relative;
					margin-left: 20upx;

					.main-name {
						width: 100%;
						display: flex;

						.name {
							flex: 1;
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: rgba(49, 48, 48, 1);
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
                        .count{
							flex-basis: 150upx;
							text-align: right;
							font-size:36upx;
							font-family:DIN 1451 Mittelschrift;
							font-weight:400;
							color:rgba(49,48,48,1);
						} 
						
					}

					.main-price {
						width: 100%;
						margin-top: 20upx;
						display: flex;
						.name {
							flex: 1;
							font-size:24upx;
							font-family:PingFang SC;
							font-weight:500;
							color:rgba(145,146,151,1);
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
							color: #929298;
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
			height:auto;
			background:rgba(255,255,255,1);
			border-radius:20upx;
			position: fixed;
			z-index: 100;
			top:350upx;
			left: 10%;
			padding-bottom: 50upx;
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
				padding: 30upx 30upx;
				box-sizing: border-box;
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
				margin-top: 40upx;
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
