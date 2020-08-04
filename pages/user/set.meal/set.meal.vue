<template>
	<view class="index">
		<view class="" v-if="dataList.length>0">
			<view class="item" v-for="(item,index) in 5" :key="index">
				<view class="item-top">
					<view class="item-top-img">
						<image src="/static/user/utab4.png" mode=""></image>
					</view>
					<view class="item-top-main">
						<view class="main-name">
							<view class="name">
								无忧茶圣套餐 × <text>1</text>
							</view>
							<!-- <view class="label">
								已送出
							</view> -->
							<view class="label2" @click="send">
								送出
							</view>
						</view>
						<view class="main-price">
							¥ 3000
						</view>
					</view>
				</view>
				<view class="item-bot">
					<view class="item-bot-img">
						<image src="/static/user/rw.png" mode=""></image>
					</view>
					<view class="item-bot-name">
						张三 18987985627
					</view>
					<view class="item-bot-date">
						07-02 09:26:48
					</view>
				</view>
				<view class="br20"></view>
			</view>
		</view>
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
				uid: ''
			}
		},
		onLoad() {
			this.uid = uni.getStorageSync('uid')
			this.getShopList()
		},
		onReachBottom() {
			console.log(this.isMore)
			if (this.isMore) {
				this.getShopList()
			}
		},
		methods: {
			//点击送出
			send(){
				uni.showToast({
					title:'套餐已送出',
					icon:'none',
					duration:1500
				})
			},
			getShopList() {
				let data = {
					cmd: 'getuserwithdraw',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					page: this.page,
					pagesize: this.pagesize,
					uid: this.uid
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
	}
</style>
