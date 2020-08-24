<template>
	<view class="tea-house-one">
		<view class="text-data">
			<rich-text :nodes="info.details"></rich-text>
		</view>
		<!-- 著作权 -->
		<!-- <Copyright></Copyright> -->
	</view>
</template>

<script>
	import Copyright from "@/components/Copyright.vue";
	export default {
		data() {
			return {
				info:[]
			}
		},
		components: {
			Copyright
		},
		onLoad(options) {
			let  item = JSON.parse(options.type)
			console.log(item)
			uni.setNavigationBarTitle({
				title:item.mtitle
			})
			this.getDetails()
		},
		methods:{
			getDetails(){
				let data = {
					cmd: 'getstoreabout',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign
				}
				this.$post('',data).
				  then((res)=>{
					  // console.log(res)
					  if(res.status == 0){
						  this.info = res.response[0]
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
	.tea-house-one {

	}

	.title-name {
		font-size: 34upx;
		font-weight: 700;
		padding: 0 30upx 16upx 30upx;
		box-sizing: border-box;
		margin-top: 20upx;
		
		.xbg{
			display: inline-block;
			width:8upx;
			height:26upx;
			background:rgba(244,83,46,1);
			border-radius:4upx;
			margin-right: 20upx;
		}
	}

	.text-data {
		padding: 0 30upx 16upx 30upx;
		box-sizing: border-box;
		margin-top: 20upx;
		font-size: 28upx;
	}
</style>
