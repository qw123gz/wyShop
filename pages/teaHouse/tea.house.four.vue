<template>
	<view class="details">
		<view class="details-title">
			{{info.describe}}
		</view>
		<view class="news clear">
			<view class="text-type font24">
				{{info.subcatelabel}}
			</view>
			<view class="look font24">
				<span>{{info.viewnum}}人阅读</span>
				<span>{{info.createtime}}</span>
			</view>
		</view>
		<view class="contents">
			<rich-text :nodes="info.details"></rich-text>
		</view>
		<!-- 著作权 -->
		<Copyright></Copyright>
	</view>
</template>

<script>
	import Copyright from "@/components/Copyright.vue";
	export default {
		data() {
			return {
				infoid:'',
				info:{}
			}
		},
		components:{
			Copyright
		},
		onLoad(options) {
			console.log(options)
			let item = JSON.parse(options.type)
			console.log(item)
			this.infoid = item.infoid
			this.getDetails()
		},
		methods:{
			getDetails(){
				let data = {
					cmd: 'getinfobyid',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					infoid:'7'
				}
				this.$post('',data).
				  then((res)=>{
					  if(res.status == 0){
						  this.info = res.detail
					  }else{
						  uni.showToast({
						  	title:res.msg,
							icon:'none',
							duration:1500
						  })
					  }
				  })
			}
		}
	}
</script>

<style lang="less">
	.clear:after{
		content: "";
		clear:both;
		display: block;
	}
	.details {
		padding: 30upx 30upx 0 30upx;
	}

	.details-title {
		font-size:40upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		// line-height:66px;
	}

	.news {
		font-size: 28upx;
		margin: 20upx 0;
		

		.text-type {
			display: inline-block;
			color: #333333FF;
			float: left;
		}
        .font24{
			font-size:24upx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(153,153,153,1);
		}
		.look {
			display: inline-block;
			float: right;
			color: #999999FF;
			span {
				&:last-child {
					margin-left: 20upx;
				}
			}
		}
	}

	.contents {
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		margin-top: 50upx;
	}
</style>
