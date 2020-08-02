import Vue from 'vue'
import App from './App'
import './servers/utils.js'
import Base from './servers/base.js'
Vue.config.productionTip = false

import { domain , clientid} from './servers/config.js'
import http from './servers/http.js'

//注册全局请求
http.config.baseUrl = `${domain}`;
Vue.prototype.$Base = Base;
Vue.prototype.$get = http.get;
Vue.prototype.$post = http.post;
Vue.prototype.$clientid = clientid;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
