//本版本号
let version = '1.0.0'
//不同模块的id
let clientid = {
	index:'88001',
	sign:'systemceshi'
}

//域名配置
// let domain = 'http://wyapi.zybaiyou.com/wyapiu/'
let domain = 'https://api.51chafang.vip/wyapis/'
// if(process.env.NODE_ENV == 'development'){
// 	domain = 'http://ttc.test/'
// }
//https://v3.aurumox.party/
//app上强制使用线上地址，再也不用担心打包忘记改地址了
//#ifdef APP-PLUS
// domain = 'http://wyapi.zybaiyou.com/wyapiu/'
domain = 'https://api.51chafang.vip/wyapis/'
//#endif

//下载地址
let download = {
	android: 'https://dl.rrdrdl.com/gzkv',
	ios: 'https://dl.rrdrdl.com/subm'
}
//用户协议
const agreUser = 'https://www.baidu.com'

export {domain, download, version, agreUser, clientid}