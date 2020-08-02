<template>
	<view class="main-box">
		<view v-for="(item,index) in worryFreeList" :key="index">
			<navigator :url="'/pages/index/index.details?item='+ JSON.stringify(item)"  class="items">
				<view class="img">
					<image :src="item.iimage" mode="" ></image>
				</view>
				<view class="texts">
					<view class="text-title">
						{{item.stitle}}
					</view>
					<view class="text-name">{{item.sdescribe}}</view>
					<view class="action">
						<view class="text-type">
							{{item.spricedescribe}}
						</view>
						<view class="text-look">
							
						</view>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			worryFreeList:{
				type:Array,
				value:[]
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="less">
	.main-box {
		padding: 0 20upx;
	    
		.items {
			width: 710upx;
			height: 240upx;
			border-bottom: 1px solid #EBEBEBFF;
			padding: 20upx 0;
			display: flex;
			.img {
				flex-basis: 240upx;
				height: 240upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			
			//item内容
			.texts {
				position: relative;
			    width: 427upx;
				padding-left: 24upx;
				.text-title {
					width: 100%;
					font-size: 32upx;
					color: #333333;
					font-family:PingFang SC;
					font-weight:500;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.text-name{
					width: 100%;
					 margin-top: 15upx;
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(153,153,153,1);
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
				}
				.action {
					width: 100%;
					position: absolute;
					bottom: 0;
					font-size:28upx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(244,83,46,1);
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					view {
						display: inline-block;
					}
			
					.text-look {
						margin-left: 50upx;
					}
				}
			
			}
		}
	}
</style>
