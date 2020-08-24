<template>
	<view class="list">
		<view class="list-item" v-for="(item,index) in storeList" :key="index" @click="handleChangeShop(item)">
			<view class="item-title">
				<text>无忧茶坊</text>{{item.sname}}({{item.scode}})
			</view>
			
			<view class="item-date">
				<view class="date-img">
					<image src="/static/index/address.png" mode=""></image>
				</view>
				<view class="date-title">
					{{item.saddress}}
				</view>
			</view>
			<view class="item-date">
				<view class="date-img">
					<image src="/static/index/phone.png" mode=""></image>
				</view>
				<view class="date-title">
					{{item.stel}}
				</view>
			</view>
			<view class="item-date">
				<view class="date-img">
					<image src="/static/index/date.png" mode=""></image>
				</view>
				<view class="date-title">
					{{item.sbusinesshours}} {{item.sbusinesshours_end}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
   export default {
        name: "storeList",
        props: {
            storeList:{
				type:Array,
				value:5
			},
			isType:{
				value:'1'
			}
        },
        data () {
            return {
              
            }
        },
        methods: {
           handleChangeShop(e){
			   console.log(e)
			  let item = e
			  if(this.isType == '2'){
				   uni.$emit('back',item)
				   uni.navigateBack({
					
				   })
			  }
		   }
        }
    }
</script>

<style lang="less" scoped>
	.list{
		width: 100%;
		background: #F6F5F5;
		height: auto;
		padding-top: 2upx;
		.list-item{
			width: 94%;
			margin: 20upx auto;
			padding: 40upx 20upx;
			box-sizing: border-box;
			background: #fff;
			border-radius:12upx;
			.item-title{
				width: 100%;
				height: 40upx;
				line-height: 40upx;
				padding: 10upx 0;
				font-size:30upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				text{
					display: inline-block;
					width: auto;
					margin-right: 10upx;
					padding: 0 15upx;
					text-align: center;
					background:rgba(6,199,149,1);
					border-radius:6upx;
					font-size:22upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(255,255,255,1);
				}
			}
			.item-date{
				width: 100%;
				height: 40upx;
				display: flex;
				.date-img{
					flex-basis: 22upx;
					height: 40upx;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 22upx;
						height: 22upx;
					}
				}
				.date-title{
					flex: 1;
					height: 40upx;
					line-height: 40upx;
					margin-left: 20upx;
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(153,153,153,1);
				}
			}
		}
	}
</style>
