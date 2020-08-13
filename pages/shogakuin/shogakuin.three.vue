<template>
	<view class="tea-house-two mainBg">
		<view class="main-box">
			<view v-for="(item,index) in dataList" :key="index">
				<view @click="toItemDetail(JSON.stringify(item))" class="items">
					<image :src="item.images" mode="" class="img"></image>
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
		data(){
			return {
				dataList:[],
				pagesize:10,
				page:1,
				isMore:false,
				code:'scollege16',
				wk:'',
			}
		},
		onLoad() {
			this.getNews()
		},
		onReachBottom() {
			console.log(this.isMore)
			if(this.isMore){
				this.getNews()
			}
		},
		methods:{
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

<style lang="less">
	.tea-house-two{
		width: 100%;
		min-height: 100vh;
		
	}
	.main-box {
		padding: 0 20upx;
        background: #fff;
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
