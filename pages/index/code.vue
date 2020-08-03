<template>
	<view class="index">
		<view class="name">
			<view class="main">
				<view class="name-img">
					<image :src="info.slogo" mode=""></image>
				</view>
				<view class="name-main">
					<view class="name-title">
						{{info.sname}}
					</view>
					<view class="name-card">
						({{info.scode}})
					</view>
				</view>
			</view>
			<view class="code">
				<image :src="infoCode" mode=""></image>
			</view>
			<view class="msg">
				店铺收取积分时出示此二维码
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components:{
			
		},
		data() {
			return {
				storeid:'',
				info:{},
				infoCode:""
			}
		},
		onLoad(options) {
			this.info = JSON.parse(options.info)
			console.log(this.info)
			this.storeid = this.info.storeid
            this.getCode()
		},
		methods: {
            getCode(){
				let data = {
					cmd:'getstoreqrcode',
					clientid:this.$clientid.index,
					sign:this.$clientid.sign,
					storeid:this.storeid
				}
				this.$post('',data).
				  then((res)=>{
					  console.log(res)
					  if(res.status == 0){
						  this.infoCode = res.describe
					  }
				  })
			}
		}
	}
</script>

<style lang="less" scoped>
	.index {
		width: 100%;
		height: 100vh;
		background:rgba(228,195,125,1);
		padding-top: 30upx;
		.name{
			width:690upx;
			height:730upx;
			margin: 20upx auto;
			background:rgba(255,255,255,1);
			border-radius:10upx;
			
			.main{
				width:690upx;
				height: 140upx;
				display: flex;
				padding: 30upx;
				box-sizing: border-box;
				border-bottom: 1px solid #FFE4E4E4;
				.name-img{
					flex-basis: 90upx;
					height: 90upx;
					image{
						width: 100%;
						height: 100%;
					}
					
				}
				.name-main{
					flex: 1;
					height: 130upx;
					padding-left: 30upx ;
					
					.name-title{
						font-size:34upx;
						font-family:PingFang SC;
						font-weight:bold;
						color:rgba(228,195,125,1);
						line-height:50upx;
					}
					.name-card{
						font-size:26upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(228,195,125,1);
						line-height:40upx;
					}
				}
			}
			.code{
				width: 100%;
				height: 468upx;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 348upx;
					height: 348upx;
				}
			}
			.msg{
				width: 100%;
				text-align: center;
				font-size:30upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(101,101,103,1);
				line-height:52upx;
			}

		}
	}

</style>
