<template>
	<view class="store">
		<storeList  :isType='1' :storeList="store"></storeList>
		<NoRecord v-if="store.length == 0" description="暂无可选择门店"></NoRecord>
		<noMore v-if="!isMore && store.length > 0"></noMore>
	</view>
</template>

<script>
	import storeList from "@/components/index/store.list.vue"
	import NoRecord from "@/components/NoRecord.vue"
	import noMore from "@/components/noMore.vue"
	export default {
		components: {
            storeList,
			NoRecord,
			noMore
		},
		data() {
			return {
				store:[],
				page:1,
				pagesize:10,
				isMore:false,//是否有更多
				wk:'',//搜索内容
			}
		},
		onLoad() {
            this.getShopList()
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			this.page = 1
			this.store = []
			this.isMore = false
			this.getShopList()
		},
		onNavigationBarSearchInputChanged(e) {
			console.log(e)
			this.wk = e.text
		},
		onReachBottom() {
			console.log(this.isMore)
			if(this.isMore){
				this.getShopList()
			}
		},
		methods: {
			//选择门店
			back(e){
				console.log(e)
				
			},
	        getShopList(){
				let data = {
					cmd:'getnearstores',
					clientid: this.$clientid.index,
					sign: this.$clientid.sign,
					storeids:'',
					page:this.page,
					pagesize:this.pagesize,
					lat:'',
					lon:'',
					wk:this.wk
				}
				this.$getShop(data).then((res)=>{
					console.log(res)
					if(res.status == 0){
						let data = res.response
						this.store = this.store.concat(data)
						let isMore = data.length < this.pagesize
						if(isMore){
							this.isMore = false
						}else{
							this.isMore = true
							this.page = this.page + 1
						}
					}else{
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

<style lang="less" scoped>
	.uni-page-head-search-input{
		padding-left: 0 !important;
	}
	.store{
	   width: 100%;
	   min-height: 100vh;
	   background: #F6F5F5;
	}
</style>
