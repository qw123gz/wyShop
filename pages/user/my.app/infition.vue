<template>
	<view class="index">
		<!-- <web-view :src="url"></web-view> -->
		<rich-text :nodes="fundsDetails.txt"></rich-text>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				url:'https://api.51chafang.vip/pub/file.aspx?cmd=viewfile&filename=yhxy',
				t:'',
				fundsDetails:''
			}
		},
		onLoad(options) {
			console.log(options)
			this.t = options.t
			let title = this.t == 'yhxy' ? '用户协议' : '隐私政策'
			uni.setNavigationBarTitle({
			  title:title
			})
			this.getContent()
			// console.log(this.url)
		},
		methods:{
			//获取文案
			getContent(){
				let data = {
					cmd:'getexplain',
					clientid:this.$clientid.index,
					sign:this.$clientid.sign,
					t:this.t
				}
				this.$post('',data)
				   .then((res)=>{
					   if(res.status == 0){
						   this.fundsDetails = res.detail
						   console.log(this.fundsDetails)
						   // uni.setStorageSync('userDetails',this.userDetails)
					   }else{
						   
					   }
				   })
			}
		}
	}
</script>

<style lang="less" scoped>
	.index{
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}
</style>
