<template>
	<view class="login">
		<view class="main">
			<view class="top">
				<view class="top-img">
					<image src="/static/index/login.png" mode=""></image>
				</view>
			</view>
			<view class="content">
				<view class="name">
					登录成功
				</view>
				<view class="integral">
					+{{logscore}}积分
				</view>
				<view class="title">
					茶好喝，钱好赚！人人都是茶老板！您获得每日登录积分奖励。
				</view>
				<view class="yes" @click="close">
					我知道了
				</view>
			</view>
		</view>
		<view class="mask"  catchtouchmove="true"></view>
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
			logscore:{
				
				value:''
			}
        },
        data () {
            return {
              
            }
        },
        methods: {
           close(e){
			   console.log(e)
			   let item = false
			   this.$emit('closeLogin',item)
		   }
        }
    }
</script>

<style scoped>
	.login{
		width: 100%;
	}
	.main{
		width: 80%;
	    position: fixed;
	    z-index: 9999;
	    margin: 0 10%;
	    top:34%;
		height:454upx;
		background:rgba(255,255,255,1);
		border-radius:20upx;
		
	}
	.top{
		width: 100%;
		/* height: 136upx; */
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.top-img{
		width: 208upx;
		height: 136upx;
		position: absolute;
		top: -68upx;
	}
	.top-img image{
		width: 100%;
		height: 100%;
	}
	.content{
		width: 100%;
		text-align: center;
		padding-top: 100upx;
	}
	.name{
		
		font-size:36upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.integral{
		margin-top:20upx;
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(244,83,46,1);
	}
	.title{
		font-size:30upx;
		padding: 0 66upx;
		box-sizing: border-box;
		font-family:PingFang SC;
		font-weight:500;
		line-height: 45upx;
		color:rgba(102,102,102,1);
		margin-top:40upx;
	}
	.yes{
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(15,98,77,1);
		margin: 40upx;
	}
	/* 弹出层 */
	.mask{
	  width: 100%;
	  height: 100%;
	  position: fixed;
	  top: 0;
	  left: 0;
	  bottom: 0;
	  right: 0;
	  background: #777777;
	  z-index: 9000;
	  opacity: 0.5;
	  overflow: hidden;
	}

</style>
