<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.bgmask{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: #777777;
		z-index: 1000;
		opacity: 0.5;
		overflow: hidden;
	}
	/*每个页面公共css */
	.hoderClass{
		font-size:34upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(206,206,206,1);
	}
	.bankHoderClass{
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(206,206,206,1);
	}
	.mainBg{
		background: #F6F5F5;
	}
	.br10{
		width: 100%;
		height: 10upx;
		background: #F5F5F5;
	}
	.br20{
		width: 100%;
		height: 20upx;
		background: #F5F5F5;
	}
	.bot{
		border-bottom: 1px solid #EBEBEB;
	}
</style>
