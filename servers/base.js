 
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
 //分享
 function share(e, item) {

 	if (e.item.name == 'wx') {
 		// if (item.type == 'canvas') {
 		// 	uni.share({
 		// 		provider: "weixin",
 		// 		scene: "WXSceneSession",
 		// 		type: 2,
 		// 		imageUrl: item.img,
 		// 		success: function(res) {
 		// 			console.log("success:" + JSON.stringify(res));
 		// 		},
 		// 		fail: function(err) {
 		// 			console.log("fail:" + JSON.stringify(err));
 		// 		}
 		// 	})
 		// } else if (item.type == "login") {
 		// 	console.log(item)
 		// 	uni.share({
 		// 		provider: "weixin",
 		// 		scene: "WXSceneSession",
 		// 		type: 0,
 		// 		href: item.url,
 		// 		title: item.name + '邀请您加入无忧茶坊',
 		// 		summary: '无忧茶坊,人人都是茶老板。一个喝茶就能赚钱的平台',
 		// 		imageUrl: '/static/wylogo.png',
 		// 		success: function(res) {
 		// 			console.log("success:" + JSON.stringify(res));
 		// 		},
 		// 		fail: function(err) {
 		// 			console.log("fail:" + JSON.stringify(err));
 		// 		}
 		// 	})
 		// } else if (item.type == "buy") {
 		// 	console.log(item)
 		// 	uni.share({
 		// 		provider: "weixin",
 		// 		scene: "WXSceneSession",
 		// 		type: 0,
 		// 		href: item.url,
 		// 		title: item.name + '邀请您加入无忧茶坊',
 		// 		summary: '无忧茶坊,人人都是茶老板。一个喝茶就能赚钱的平台',
 		// 		imageUrl: '/static/wylogo.png',
 		// 		success: function(res) {
 		// 			console.log("success:" + JSON.stringify(res));
 		// 		},
 		// 		fail: function(err) {
 		// 			console.log("fail:" + JSON.stringify(err));
 		// 		}
 		// 	})
 		// } else {
 		// 	console.log(item)
 			
 		// }
            uni.share({
 				provider: "weixin",
 				scene: "WXSceneSession",
 				type: 0,
 				href: 'https://api.51chafang.vip/h5Shop',
 				title: item.title.substring(0, 15),
 				summary: item.describe.substring(0, 15),
 				imageUrl: '/static/wysj.png',
 				success: function(res) {
 					console.log("success:" + JSON.stringify(res));
 				},
 				fail: function(err) {
 					console.log("fail:" + JSON.stringify(err));
 				}
 			})
 	}
 	if (e.item.name == 'pyq') {
 		// if (item.type == 'canvas') {
 		// 	uni.share({
 		// 		provider: "weixin",
 		// 		scene: "WXSenceTimeline",
 		// 		type: 2,
 		// 		imageUrl: item.img,
 		// 		success: function(res) {
 		// 			console.log("success:" + JSON.stringify(res));
 		// 		},
 		// 		fail: function(err) {
 		// 			console.log("fail:" + JSON.stringify(err));
 		// 		}
 		// 	})
 		// } else if (item.type == "login") {
 		// 	console.log(item)
 		// 	uni.share({
 		// 		provider: "weixin",
 		// 		scene: "WXSenceTimeline",
 		// 		type: 0,
 		// 		href: item.url,
 		// 		title: item.name + '邀请您加入无忧茶坊',
 		// 		summary: '无忧茶坊,人人都是茶老板。一个喝茶就能赚钱的平台',
 		// 		imageUrl: '/static/wylogo.png',
 		// 		success: function(res) {
 		// 			console.log("success:" + JSON.stringify(res));
 		// 		},
 		// 		fail: function(err) {
 		// 			console.log("fail:" + JSON.stringify(err));
 		// 		}
 		// 	})
 		// } else if (item.type == "buy") {
 		// 	console.log(item)
 		// 	uni.share({
 		// 		provider: "weixin",
 		// 		scene: "WXSenceTimeline",
 		// 		type: 0,
 		// 		href: item.url,
 		// 		title: item.name + '邀请您加入无忧茶坊',
 		// 		summary: '无忧茶坊,人人都是茶老板。一个喝茶就能赚钱的平台',
 		// 		imageUrl: '/static/wylogo.png',
 		// 		success: function(res) {
 		// 			console.log("success:" + JSON.stringify(res));
 		// 		},
 		// 		fail: function(err) {
 		// 			console.log("fail:" + JSON.stringify(err));
 		// 		}
 		// 	})
 		// } else {
 		// 	console.log(item)
 			
 		// }
		uni.share({
			provider: "weixin",
			scene: "WXSenceTimeline",
			type: 0,
			href: 'https://api.51chafang.vip/h5Shop',
			title: item.title.substring(0, 15),
			summary: item.describe.substring(0, 15),
			imageUrl: '/static/wysj.png',
			success: function(res) {
				console.log("success:" + JSON.stringify(res));
			},
			fail: function(err) {
				console.log("fail:" + JSON.stringify(err));
			}
		})

 	}
 	if (e.item.name == 'qq') {
 		uni.showToast({
 			title: '正在开发中,请期待...',
 			icon: 'none',
 			duration: 1000
 		})
 	}
 	if (e.item.name == 'sina') {
 		uni.showToast({
 			title: '正在开发中,请期待...',
 			icon: 'none',
 			duration: 1000
 		})
 	}

 }
export default {
	passReg,
	setType,
	copyText,
	pasteText,
	getBase64,
	debounce,
	share
}