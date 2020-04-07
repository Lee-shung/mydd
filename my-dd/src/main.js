import Vue from 'vue'
import App from './App'
import store from "./store/store";
// require styles
Vue.config.productionTip = false
//将store注入到各个组件，方便使用vuex的辅助函数
Vue.prototype.$store = store
App.mpType = 'app'
import './../static/iconfont/iconfont.css'
const app = new Vue(App)
app.$mount()
