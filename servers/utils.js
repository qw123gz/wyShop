import Vue from 'vue'
//验证手机号
function isPhoneNum(phone){
	let phonenum = phone;
	let reg =  /^1[3456789]\d{9}$/;
	if(!reg.test(phonenum)){
		uni.showToast({
		   title:'请输入正确的手机号',
		   icon:"none"
		})
		return false;
	}else{
		return true;
	}	
}
//获取门店
function getShop(data){
	let parmes = {
		cmd:data.cmd,
		clientid:data.clientid,
		sign:data.sign,
		storeids:data.storeids,
		page:data.page,
		pagesize:data.pagesize,
		lat:data.lat,
		lon:data.lon,
		wk:data.wk
	}
	return new Promise((resolve,reject)=>{
		this.$post('',parmes)
		   .then((res)=>{
			   if(res.status == 0){
				   resolve(res)
			   }else{
				   let res = []
				   resolve(res)
			   }
		   })
		   .catch(()=>{
			   let res = []
			   reject(res)
		   })
	})
}

//获取茶坊和商学院的列表数据
function getNewsList(data){
	console.log(data)
	let parmes = {
		cmd:data.cmd,
		clientid:data.clientid,
		sign:data.sign,
		page:data.page,
		pagesize:data.pagesize,
		wk:data.wk,
		code:data.code
	}
	return new Promise((resolve,reject)=>{
		this.$post('',parmes)
		   .then((res)=>{
			   if(res.status == 0){
				   resolve(res)
			   }else{
				   let res = []
				   resolve(res)
			   }
		   })
		   .catch(()=>{
			   let res = []
			   reject(res)
		   })
	})
}

Vue.prototype.$isPhoneNum=isPhoneNum;
Vue.prototype.$getShop=getShop;
Vue.prototype.$getNewsList=getNewsList;