import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store"
import echarts from 'echarts'
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

const my_tag_list = [];
const my_editableTabsValue = { "active-tab": '' };

Vue.prototype.$my_tag_list = my_tag_list;
Vue.prototype.$my_editableTabsValue = my_editableTabsValue;
// 配置请求的跟路径
//axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios.defaults.baseURL = '/api'  //关键代码
// axios.defaults.baseURL ='/192.168.50.90:8000'
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.$echarts = echarts;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')