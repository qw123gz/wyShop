<template>
	<view class="index">
		<view class="main" v-if="dataList.length>0">
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<view class="item-label">
					<view class="label-name">
						{{item.label}}
					</view>
					<view class="label-count" v-if="item.income_and_expenditure == 0">
						+{{item.fee}}
					</view>
					<view class="label-count active"  v-if="item.income_and_expenditure == 1">
						-{{item.fee}}
					</view>
				</view>
				<view class="item-date">
					{{item.createtime}}
				</view>
			</view>
		</view>
		<NoRecord v-if="dataList.length == 0" description="暂无现金流水记录"></NoRecord>
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
			}
		},
		onReachBottom() {
			console.log(this.isMore)
			if (this.isMore) {
				this.getShopList()
			}
		},
		onLoad() {
			this.storeid = uni.getStorageSync('storeid')
			this.getShopList()
		},
		methods: {
			getShopList() {
				let data = {
					cmd: 'getstorecashs',
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
						console.log(this.isMore)
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

		.main {
			width: 100%;
			padding: 0 30upx;
			box-sizing: border-box;

			.item {
				width: 100%;
				padding: 30upx 0;
				box-sizing: border-box;
				border-bottom: 1px solid #E4E4E4;

				.item-label {
					width: 100%;
					height: 50upx;
					display: flex;

					.label-name {
						flex: 1;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(49, 48, 48, 1);
					}

					.active {
						color: rgba(49, 48, 48, 1) !important;
					}

					.label-count {
						flex: 1;
						text-align: right;
						font-size: 36upx;
						font-family: DIN 1451 Mittelschrift;
						font-weight: 400;
						color: rgba(228, 195, 125, 1);
					}
				}

				.item-date {
					width: 100%;
					height: 40upx;
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
