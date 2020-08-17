
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/index/index","pages/index/swiper","pages/index/edit.index","pages/index/code","pages/login/register","pages/login/reset","pages/user/user","pages/user/acount/reset","pages/user/edit/edit.information","pages/user/cash/cash","pages/user/integral/integral","pages/user/my.app/my.app","pages/user/my.app/infition","pages/user/reflect/reflect.index","pages/user/reflect/reflect.recording","pages/user/reflect/bank.one","pages/user/reflect/bank.two","pages/user/reflect/bank.three","pages/user/reflect/bank.four","pages/user/set.meal/set.meal","pages/user/reflect/bank.five","pages/teaHouse/teaHouse","pages/teaHouse/tea.house.one","pages/teaHouse/tea.house.two","pages/teaHouse/tea.house.three","pages/teaHouse/tea.house.four","pages/shogakuin/shogakuin","pages/shogakuin/shogakuin.one","pages/shogakuin/shogakuin.two","pages/shogakuin/shogakuin.three","pages/shogakuin/shogakuin.details","components/index/indexList","components/index/login","components/user/reflect.say"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#999999","selectedColor":"#0F624D","borderStyle":"black","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/index/index","iconPath":"static/tabBar/tab1.png","selectedIconPath":"static/tabBar/tab1active.png","text":"首页"},{"pagePath":"pages/teaHouse/teaHouse","iconPath":"static/tabBar/tab2.png","selectedIconPath":"static/tabBar/tab2active.png","text":"茶坊"},{"pagePath":"pages/shogakuin/shogakuin","iconPath":"static/tabBar/tab3.png","selectedIconPath":"static/tabBar/tab3active.png","text":"学院"},{"pagePath":"pages/user/user","iconPath":"static/tabBar/tab4.png","selectedIconPath":"static/tabBar/tab4active.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"无忧茶坊店主端","compilerVersion":"2.7.14","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"无忧茶坊","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/swiper","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom"}},{"path":"/pages/index/edit.index","meta":{},"window":{"navigationBarTitleText":"店铺信息","titleNView":{"buttons":[{"text":"编辑","fontSize":"16px","color":"#06C795","float":"right","width":"60px"}]}}},{"path":"/pages/index/code","meta":{},"window":{"navigationBarTitleText":"积分收款码","navigationBarBackgroundColor":"#E4C37D","navigationBarTextStyle":"white"}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/login/reset","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/user/acount/reset","meta":{},"window":{"navigationBarTitleText":"账号设置","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/user/edit/edit.information","meta":{},"window":{"navigationBarTitleText":"编辑店铺信息","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/user/cash/cash","meta":{},"window":{"navigationBarTitleText":"现金流水记录","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/user/integral/integral","meta":{},"window":{"navigationBarTitleText":"积分回收记录","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/user/my.app/my.app","meta":{},"window":{"navigationBarTitleText":"关于无忧茶坊店主","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/user/my.app/infition","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/user/reflect/reflect.index","meta":{},"window":{"navigationBarTitleText":"提现","titleNView":{"buttons":[{"text":"提现记录","fontSize":"16px","color":"#06C795","float":"right","right":"40upx","width":"100px"}]}}},{"path":"/pages/user/reflect/reflect.recording","meta":{},"window":{"navigationBarTitleText":"提现记录"}},{"path":"/pages/user/reflect/bank.one","meta":{},"window":{"navigationBarTitleText":"银行卡"}},{"path":"/pages/user/reflect/bank.two","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/reflect/bank.three","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/reflect/bank.four","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/set.meal/set.meal","meta":{},"window":{"navigationBarTitleText":"套餐销售记录"}},{"path":"/pages/user/reflect/bank.five","meta":{},"window":{"navigationBarTitleText":"提现详情","titleNView":{"buttons":[{"text":"提现记录","fontSize":"16px","color":"#06C795","float":"right","right":"40upx","width":"100px"}]}}},{"path":"/pages/teaHouse/teaHouse","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/teaHouse/tea.house.one","meta":{},"window":{"navigationBarTitleText":"无忧茶坊"}},{"path":"/pages/teaHouse/tea.house.two","meta":{},"window":{"navigationBarTitleText":"媒体报道"}},{"path":"/pages/teaHouse/tea.house.three","meta":{},"window":{"navigationBarTitleText":"分店地图","navigationBarBackgroundColor":"#FFFFFF","titleNView":{"buttons":[{"text":"搜索","fontSize":"14","float":"right","color":"#06C795","width":"50px"}],"searchInput":{"align":"left","placeholder":"请输入门店名称搜索","borderRadius":"35upx","width":"450upx","backgroundColor":"#F6F5F5","right":"40upx"}}}},{"path":"/pages/teaHouse/tea.house.four","meta":{},"window":{"navigationBarTitleText":"开店政策","titleNView":{"buttons":[{"type":"share","text":"","fontSize":"24px","fontSrc":"/static/newIcon/iconfont.ttf","float":"right","width":"50px"}]}}},{"path":"/pages/shogakuin/shogakuin","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#0F624D","navigationStyle":"custom"}},{"path":"/pages/shogakuin/shogakuin.one","meta":{},"window":{"navigationBarTitleText":"运营指南"}},{"path":"/pages/shogakuin/shogakuin.two","meta":{},"window":{"navigationBarTitleText":"生意经"}},{"path":"/pages/shogakuin/shogakuin.three","meta":{},"window":{"navigationBarTitleText":"商学院"}},{"path":"/pages/shogakuin/shogakuin.details","meta":{},"window":{"navigationBarTitleText":"查看文章","titleNView":{"buttons":[{"type":"share","text":"","fontSize":"24px","fontSrc":"/static/newIcon/iconfont.ttf","float":"right","right":"28px","width":"60px"}]}}},{"path":"/components/index/indexList","meta":{},"window":{}},{"path":"/components/index/login","meta":{},"window":{}},{"path":"/components/user/reflect.say","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
