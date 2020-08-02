 
 function passReg(pwd){
	var reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
	var re = new RegExp(reg)
		if (re.test(pwd)) { 
			return true;
		}else{ 
			return false; 
		}
	
}
function setType(val){
	if(val){
		uni.setStorage({
		    key: 'versionNum',
		    data: val,
		    success: function (res) {
		     
		    }
		});
	}
}
//copy
function copyText(txt) {
	 // #ifdef APP-PLUS
	 uni.setClipboardData({
	  data: txt.toString(),
	  success: function() {
	   uni.showToast({
		icon: 'none',
		title: '复制成功!'
	   });
	  }
	 });
	 // #endif
	 // #ifdef H5
	 uni.showToast({
	  icon: 'none',
	  title: '当前环境暂不支持'
	 });
	 // #endif
}
function pasteText(){
	uni.getClipboardData({
	    success: function (res) {
	        console.log(res.data);
			 return res.data;
	    }
	});
}


//上传图片转base64
function getBase64(file) {
		return new Promise((resolve, reject) => {
			let reader = new FileReader();
			let fil = event.target.files[0];
			reader.readAsDataURL(fil);
			reader.onload = function () {
				resolve(reader.result)
			};
		   reader.onerror = function (error) {
			  reject(error)
		   };
		})
}

//函数防抖	
  function debounce(fn, interval) {
	console.log(1)
    let timer;
    let gapTime = interval || 1000;//间隔时间，如果interval不传，则默认1000ms
    return function() {
      clearTimeout(timer);
      let context = this;
      let args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
      timer = setTimeout(function() {
        fn.call(context,args);
      }, gapTime);
    };
  }

export default {
	passReg,
	setType,
	copyText,
	pasteText,
	getBase64,
	debounce
}