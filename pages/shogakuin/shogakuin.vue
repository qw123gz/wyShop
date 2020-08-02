<template>
	<view class="index">
		<view class="top-ban">
			<view class="ban-bg">
				商学院
			</view>
			<view class="banner">
				<swiper class="swiper" indicator-dots=true autoplay=true interval=3000>
					<swiper-item v-for="(item,index) in bannerList" :key="index">
						<image class="sip" :src="item.images"  mode=""></image>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view class="title">茶友学院</view>
		<view class="main-box">
			<view v-for="(item,index) in dataList" :key="index">
				<view  @click="toItemDetail(JSON.stringify(item))"   class="items">
					
					<view class="texts">
						<view class="text-title">
							{{item.describe}}
						</view>
						<view class="action">
							<view class="text-type">
								{{item.subcatelabel}}
							</view>
							<view class="text-look">
								{{item.viewnum}} 阅读
							</view>
						</view>
					</view>
					<image :src="item.images" mode="" class="img"></image>
				</view>
			</view>
		</view>
		<noMore></noMore>
	</view>
</template>

<script>
	import noMore from "@/components/noMore.vue"
	export default {
		components:{
			noMore
		},
		data() {
			return {
				itemData: [{
						name: "卖家1",
						num: "202",
						minpic: "100",
						maxpic: "7000",
						dpic: "2000.00"
					},
					{
						name: "卖家2",
						num: "121",
						minpic: "200",
						maxpic: "4000",
						dpic: "1000.00"
					},
					{
						name: "卖家3",
						num: "54",
						minpic: "300",
						maxpic: "1000",
						dpic: "3000.00"
					}
				],
				dataList:[],
				pagesize:10,
				page:1,
				isMore:false,
				code:'mcollege11',
				wk:'',
				bannerList:[]
			}
		},
		onLoad() {
			this.getNews()
			this.getBanner()
		},
		onReachBottom() {
			console.log(this.isMore)
			if(this.isMore){
				this.getNews()
			}
		},
		methods:{
			//获取banner
			getBanner() {
				let data = {
					cmd: 'getbanners',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					status: 2
				}
				this.$post('', data).
				then((res) => {
					// console.log(res)
					if (res.status == 0) {
						this.bannerList = res.response
					} else {
			
					}
				})
			},
			//跳转详情页
			toItemDetail(e){
				let item = JSON.parse(e)
				uni.navigateTo({
					url:'../shogakuin/shogakuin.details?item=' + JSON.stringify(item)
				})
			},
			//获取无忧咨询
			getNews(){
				let data = {
					cmd: 'getinfobycustomcode',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					pagesize:this.pagesize,
					page:this.page,
					wk:this.wk,
					code:this.code
				}
				this.$getNewsList(data).
				then((res) => {
					// console.log(res)
					if (res.status == 0) {
						let data = res.response
						this.dataList = this.dataList.concat(data)
						let isMore = data.length < this.pagesize
						if(isMore){
							this.isMore = false
						}else{
							this.isMore = true
							this.page = this.page + 1
						}
					} else {
				        this.isMore = false
					}
				}),
				((err)=>{
					console.log(err)
					this.isMore = false
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.index{
		width: 100%;
		.top-ban{
			width: 100%;
			height: 414upx;
			background: #fff;
			position: relative;
			.ban-bg{
				width: 100%;
				height: 304upx;
				background: #0F624D;
				font-size:34upx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(255,255,255,1);
				padding:60upx 0 0 30upx;
				box-sizing: border-box;
			}
			.banner{
				width: 94%;
				height:280upx;
				margin: auto;
				
				position: absolute;
				top:144upx;
				left: 3%;
				.sip{
					border-radius:20upx;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	.uni-bg-red {
		background-color: red;
		text-align: center;
		height: 100%;
	}

	.title {
		padding: 32upx 0 39upx 32upx;
		color: #333333FF;
		font-size: 34upx;
		font-weight: bold;
		margin-top: 50upx;
	}

	.main-box {
		padding: 0 20upx;

		.items {
			width: 710upx;
			height: 136upx;
			border-bottom: 1px solid #EBEBEBFF;
			padding: 30upx 0 20upx 0;
			display: flex;
			justify-content: space-between;

			.img {
				width: 180upx;
				height: 136upx;
			}
			
			//item内容
			.texts {
				margin-left: 24upx;
				position: relative;
				flex-basis: 500upx;
			
				.text-title {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					padding-right: 52upx;
					box-sizing: border-box;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			
				.action {
					position: absolute;
					bottom: 0;
					font-size: 24upx;
			
					view {
						display: inline-block;
					}
			
					.text-type {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(153, 153, 153, 1);
					}
			
					.text-look {
						margin-left: 50upx;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(153, 153, 153, 1);
					}
				}
			
			}
		}
	}
</style>
