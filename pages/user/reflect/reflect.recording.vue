<template>
	<view class="team mainBg">
		<view class="content" v-if="dataList.length>0">
			<view class="team-item" v-for="(item,index) in dataList" :key="index">
				<view class="item-img">
					<image v-if="item.type==0" src="/static/user/r1.png" mode=""></image>
					<image v-if="item.type==1" src="/static/user/r2.png" mode=""></image>
					<image v-if="item.type==2" src="/static/user/r3.png" mode=""></image>
				</view>
				<view class="item-main">
					<view class="name">{{item.label}}
						<text>-¥{{item.fee}}</text>
					</view>
					<view class="title">{{item.label}} </text>
					</view>
					<view class="phone">{{item.createtime}}
					   <text>{{item.label}}</text>
					</view>
				</view>
			</view>
		</view>
		<NoRecord v-if="dataList.length == 0" description="暂无提现记录"></NoRecord>
		<noMore v-if="!isMore && dataList.length > 0"></noMore>
	</view>
</template>

<script>
	import Copyright from '@/components/Copyright.vue'
	import NoRecord from '@/components/NoRecord.vue'
	import noMore from "@/components/noMore.vue"
	export default {
		components: {
			Copyright,
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
			if(this.isMore){
				this.getShopList()
			}
		},
		methods: {
			getShopList() {
				let data = {
					cmd: 'getuserwithdraw',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					page: this.page,
					pagesize: this.pagesize,
					uid:this.uid
				}
				this.$post('',data).then((res) => {
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
	.team {
		width: 100%;
		min-height: 100vh;


		.content {
			width: 100%;
			background: #fff;
			padding-top: 20upx;

			.team-item {
				width: 690upx;
				margin: 20upx auto;
				padding: 10upx 0 20upx 0;
				height: auto;

				display: flex;
				border-bottom: 1px solid #EBEBEB;

				.item-img {
					flex-basis: 130upx;
					height: 60upx;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 60upx;
						height: 60upx;
					}
				}

				.item-main {
					flex-basis: 560upx;
					height: auto;

					.name {
						width: 100%;
						height: 70upx;
						line-height: 70upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);

						text {
							text-align: right;
							float: right;
							font-size: 36upx;
							font-family: Sanomat Grab Web;
							font-weight: 400;
							color: rgba(51, 51, 51, 1);
						}
					}

					.title {
						width: 100%;
						line-height: 53upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(102, 102, 102, 1);
						word-break: break-all;

						text {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #0F624D;
							margin-left: 10upx;
						}
					}

					.phone {
						width: 100%;
						height: 53upx;
						line-height: 53upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(102, 102, 102, 1);
                        text {
							text-align: right;
							float: right;
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 500;
							color:rgba(145,146,151,1);
							margin-left: 10upx;
						}
					}
				}
			}
		}

	}
</style>
