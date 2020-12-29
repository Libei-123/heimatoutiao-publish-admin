import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 加载 element 组件库
import ElementUI from 'element-ui'

// 加载 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'
// 全局的样式
import './style/index.less'
Vue.config.productionTip = false
// 全局注册 element 组件库
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
