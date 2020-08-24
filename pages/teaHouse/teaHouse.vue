<template>
	<view class="tea-house">
		<view class="video">
			<!-- <image v-show="isImg" :src="posterUrl" @click="videoPlay" mode=""></image> -->
			<video id="myVideo" :src="video" v-if="show" :poster="posterUrl"
			       @error="videoErrorCallback" :controls="true" show-mute-btn=true auto-pause-if-navigate=true auto-pause-if-open-native=true></video>
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
		<view class="br20"></view>
		<view class="title">无忧资讯</view>
		<!-- 新闻加载 -->
		<view class="main-box">
			<view v-for="(item,index) in dataList" :key="index">
				<view class="items" @click="toItemDetail(JSON.stringify(item))">
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
		<noMore v-if="!isMore && dataList.length > 0"></noMore>
		<!-- 著作权 -->
		<!-- <Copyright></Copyright> -->
	</view>
</template>

<script>
	import Copyright from "@/components/Copyright.vue";
	import noMore from "@/components/noMore.vue"
	export default {
		components: {
			Copyright,
			noMore
		},
		data() {
			return {
				show:true,
				isImg:true,
				dataList: [],
				pagesize: 10,
				page: 1,
				isMore: false,
				code: 'mhome21',
				wk: '',
				posterUrl:'https://files.51chafang.vip/upload/system/images/banner/vlogo.jpg',
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
					},
					{
						name: "开店政策",
						url: "tea.house.four",
						img: '/static/teaHouse/kd.png'
					}
				],
				video:'https://files.51chafang.vip//upload/public/banner/20200814/wycfxyp.mp4'
			}
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		onLoad() {
			
		},
		onShow(){
			this.dataList = []
			this.pagesize = 10
			this.page = 1
			this.isMore = false
			this.getNewData()
			this.getNews()
			this.getVideo()//获取视频
			this.posterUrl = 'https://files.51chafang.vip/upload/system/images/banner/vlogo.jpg'
			this.show = true
			this.isImg = true
		},
		onHide() {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			this.show = false
			// #endif
		},
		onPullDownRefresh() {
			uni.startPullDownRefresh();
			this.dataList = []
			this.pagesize = 10
			this.page = 1
			this.isMore = false
			this.getNews()
		},
		onReachBottom() {
			console.log(this.isMore)
			if (this.isMore) {
				this.getNews() 
			}
		},
		methods: {
			//点击播放
			videoPlay(){
				this.isImg = false
				this.videoContext = uni.createVideoContext('myVideo')
				this.videoContext.play()
			},
			//获取新闻
			getVideo(){
				let data = {
					cmd: 'getv',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					status: '11'
				}
				this.$post('', data)
					.then((res) => {
						console.log(res)
						if (res.status == 0) {
							this.video = res.response[0].images
						} else {
							
						}
					})
			},
			//跳转详情页
			toItemDetail(e) {
				let item = JSON.parse(e)
				uni.navigateTo({
					url: '../shogakuin/shogakuin.details?item=' + JSON.stringify(item)
				})
			},
			//获取无忧咨询
			getNews() {
				let data = {
					cmd: 'getinfobycustomcode',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					pagesize: this.pagesize,
					page: this.page,
					wk: this.wk,
					code: this.code
				}
				this.$getNewsList(data).
				then((res) => {
						// console.log(res)
						uni.stopPullDownRefresh();
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
			//点击都tab
			toItem(e) {
				console.log(e)
				let item = JSON.parse(e)
				if (item.menuid == 1) {
					uni.navigateTo({
						url: './tea.house.one?type=' + JSON.stringify(item)
					})
				}
				if (item.menuid == 2) {
					uni.navigateTo({
						url: './tea.house.two?type=' + JSON.stringify(item)
					})
				}
				if (item.menuid == 3) {
					uni.navigateTo({
						url: './tea.house.three?type=' + JSON.stringify(item)
					})
				}
				if (item.menuid == 4) {
					uni.navigateTo({
						url: './tea.house.four?type=' + JSON.stringify(item)
					})
				}
			},
			//获取视频权限
			videoErrorCallback: function(e) {
				// uni.showModal({
				// 	content: e.target.errMsg,
				// 	showCancel: false
				// })
			},
			//获取分类导航栏
			getNewData() {
				let data = {
					cmd: 'getmenu',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					mcode: 'mhome1'
				}
				this.$post('', data)
					.then((res) => {
						if (res.status == 0) {
							this.navList = res.response
						} else {
							this.navList = this.navData

						}
					})
			}
		}
	}
</script>

<style lang="less">
	.tea-house {
		width: 100%;
		overflow: hidden;

		.video {
			width: 750upx;
			height: 450upx;
			position: relative;
		    image{
				width: 750upx;
				height: 450upx;
				position: absolute;
				top:0;
				left: 0;
				z-index: 99999;
			}
			video {
				width: 750upx;
				object-fit: fill;
			}
		}



		.nav-menu {
			margin: 0 32upx;
			padding: 40upx 20upx;
			border-bottom: 1px solid #EBEBEBFF;
			display: flex;
			justify-content: space-between;

			.menu-item {
				padding: 5px;

				.item-img {
					width: 100upx;
					height: 100upx;
					margin: 0 auto;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.item-name {
					width: 100upx;
					text-align: center;
					margin-top: 20upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(102, 102, 102, 1);
				}
			}
		}

		.title {
			padding: 32upx 0 39upx 32upx;
			color: #333333FF;
			font-size: 34upx;
			font-weight: bold;
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
	}
</style>
