<template>
	<view class="index">
		<view class="main">
			<view class="item">
				<view class="item-name">
					联系人
				</view>
				<view class="item-title">
					{{info.scontacts}}
				</view>
			</view>
			<view class="item">
				<view class="item-name">
					电话
				</view>
				<view class="item-title">
					{{info.sphone}}
				</view>
			</view>
			<view class="item">
				<view class="item-name">
					地址
				</view>
				<view class="item-title">
					{{info.saddress}}
				</view>
			</view>
			<view class="item-date">
				<view class="item-name">
					营业时间
				</view>
				<view class="item-title">
					<view class="">
						{{info.sbusinesshours}}          
					</view>
					<view class="">
						{{info.sbusinesshours_end}}         
					</view>
				</view>
			</view>
			<!-- 门店照片 -->
			<view class="shop">
				<view class="shop-name">
					门店照片
				</view>
				<view class="shop-banner">
					<image src="/static/index/cfbj.png" mode=""></image>
					<image src="/static/index/cfbj.png" mode=""></image>
					<image src="/static/index/cfbj.png" mode=""></image>
				</view>
			</view>
			<!-- 说明 -->
			<view class="message">
				<view class="message-icon">
					<image src="/static/index/gt.png" mode=""></image>
				</view>
				<view class="message-title">
					以下信息不可修改，如需修改请联系总部
				</view>
			</view>
			<view class="item">
				<view class="item-name">
					店主
				</view>
				<view class="item-title">
					{{info.scontacts}}
				</view>
			</view>
			<view class="item">
				<view class="item-name">
					账号
				</view>
				<view class="item-title">
					{{info.stel}}
				</view>
			</view>
			<view class="item">
				<view class="item-name">
					店铺名称
				</view>
				<view class="item-title">
					{{info.sname}}
				</view>
			</view>
			<view class="item">
				<view class="item-name">
					店铺编号
				</view>
				<view class="item-title">
					{{info.scode}}
				</view>
			</view>
			<view class="item">
				<view class="item-name">
					店铺类型
				</view>
				<view class="item-title">
					商业店
				</view>
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
				info:''
			}
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			uni.navigateTo({
				url:'../user/edit/edit.information'
			})
		},
		onLoad(options) {
			console.log(options)
             let info = JSON.parse(options.info)
			 this.info = info 
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.index {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		overflow: hidden;
		.main{
			width: 100%;
			height: auto;
			.item{
				width: 100%;
				height: auto;
				padding: 30upx 0;
				border-bottom: 1px solid #E4E4E4;
				display: flex;
				.item-name{
					flex-basis: 150upx;
					height: 50upx;
					line-height: 50upx;
					font-size:32upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(49,48,48,1);
				}
				.item-title{
					flex: 1;
					text-align: right;
					height: 50upx;
					line-height: 50upx;
					font-size:32upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(145,146,151,1);
				}
			}
			.item-date{
				width: 100%;
				height: auto;
				padding: 30upx 0;
				border-bottom: 1px solid #E4E4E4;
				display: flex;
				.item-name{
					flex-basis: 150upx;
					height: 80upx;
					line-height: 80upx;
					font-size:32upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(49,48,48,1);
				}
				.item-title{
					flex: 1;
					view{
						width: 100%;
						text-align: right;
						height: 40upx;
						line-height: 40upx;
						font-size:32upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(145,146,151,1);
					}
				}
			}
			.shop{
				width: 100%;
				height: auto;
				padding-bottom: 30upx;
				.shop-name{
					width: 100%;
					height: 120upx;
					line-height: 120upx;
					font-size:32upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(49,48,48,1);
				}
				.shop-banner{
					width: 100%;
					display: flex;
					image{
						flex-basis: 190upx;
						height: 190upx;
						border-radius:20upx;
						margin-right: 10upx;
					}
				}
			}
			.message{
				width: 100%;
				height: 92upx;
				height: auto;
				margin-bottom: 30upx;
				padding-left: 30upx;
				box-sizing: border-box;
				display: flex;
				background:rgba(251,250,250,1);
				border-radius:20upx;
				.message-icon{
					flex-basis: 32upx;
					height: 92upx;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 32upx;
						height: 32upx;
					}
				}
				.message-title{
					flex: 1;
					height: 92upx;
					margin-left: 20upx;
					line-height: 92upx;
					font-size:28upx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(228,195,125,1);
				}
			}
		}
	}

</style>
