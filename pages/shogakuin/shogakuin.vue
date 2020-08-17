<template>
	<view class="index">
		<view class="top-ban">
			<view class="ban-bg">
				店主学院
			</view>

			<view class="banner">
				<swiper class="swiper" indicator-dots=true autoplay=true interval=3000>
					<swiper-item v-for="(item,index) in bannerList" :key="index">
						<image class="sip" :src="item.images"  mode=""></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 导航栏，跳转不同页面路由 -->
			<view class="nav-menu">
				<view v-for="(item,index) in navList" :key="index">
					<view @click="toItem(JSON.stringify(item))" class="menu-item">
						<view class="item-img">
							<image :src="item.icon" mode=""></image>
						</view>
						<view class="item-name">
							{{item.mtitle}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="title">最新发布</view>
		<view class="main-box">
			<view v-for="(item,index) in dataList" :key="index">
				<view  @click="toItemDetail(JSON.stringify(item))"   class="items">
					
					<view class="texts">
						<view class="text-title">
							{{item.title}}
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
				bannerList:[],
				navList: [],
				navData: [{
						name: "无忧茶坊",
						url: "tea.house.one",
						img: '/static/teaHouse/wy.png'
					},
					{
						name: "媒体报道",
						url: "tea.house.two",
						img: '/static/teaHouse/mt.png'
					},
					{
						name: "分店地图",
						url: "tea.house.three",
						img: '/static/teaHouse/dt.png'
					}
				],
			}
		},
		onLoad() {
			this.getNews()
			this.getBanner()
			this.getNewData()
		},
		onReachBottom() {
			console.log(this.isMore)
			if(this.isMore){
				this.getNews()
			}
		},
		methods:{
			//获取分类导航栏
			getNewData() {
				let data = {
					cmd: 'getmenu',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					mcode: 'scollege1'
				}
				this.$post('', data)
					.then((res) => {
						if (res.status == 0) {
							this.navList = res.response
						} else {
							this.navList = this.navData
							
						}
					})
			},
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
			//点击都tab
			toItem(e) {
				console.log(e)
				let item = JSON.parse(e)
				if(item.menuid == 5){
					uni.navigateTo({
						url:'./shogakuin.one?item=' + JSON.stringify(item)
					})
				}
				if(item.menuid == 6){
					uni.navigateTo({
						url:'./shogakuin.two?item=' + JSON.stringify(item)
					})
				}
				if(item.menuid == 7){
					uni.navigateTo({
						url:'./shogakuin.three?item=' + JSON.stringify(item)
					})
				}
				
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
					cmd: 'getinfobestnew',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					pagesize:this.pagesize,
					page:this.page,
					wk:this.wk
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
		padding-top: 100upx;
		.top-ban{
			width: 100%;
			background: #fff;
			position: relative;
			.ban-bg{
				width: 100%;
				height: 60upx;
				text-align: center;
				line-height: 60upx;
				font-size:34upx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(49,48,48,1);
			}
			.nav-menu {
				margin: 0 32upx;
				padding: 40upx 20upx;
				display: flex;
				justify-content: space-between;
			
				.menu-item {
					padding: 5px;
					.item-img {
						width: 130upx;
						height: 130upx;
						margin: 0 auto;
			
						image {
							width: 100%;
							height: 100%;
						}
					}
			
					.item-name {
						width: 130upx;
						text-align: center;
						font-size:30upx;
						font-family:PingFang SC;
						font-weight:bold;
						color:rgba(49,48,48,1);
					}
				}
			}
			.banner{
				width: 94%;
				height:280upx;
				margin:50upx auto;
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
		// margin-top: 50upx;
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
