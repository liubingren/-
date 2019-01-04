import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Qs from 'qs'
import iView from 'iview'
import "@babel/polyfill"
import store from './store/index'
import 'iview/dist/styles/iview.css'
import './css/general.less'
import '../static/skins/lightgray/content.min.css'
import '../static/skins/lightgray/skin.min.css'

const isDebug_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

Vue.use(iView);

// vue全局变量
Vue.prototype.GLOBAL = {
  HEADER: 'http://varyagtech.com/varyagtech/', //  服务器IP
  // HEADER: 'http://172.16.31.217:8060/varyagtech/', //吕梁峰IP
  // HEADER: 'http://172.16.31.235:8070/varyagtech/', //詹幸喜IP
  axios: axios,
  backTohome: () => {
    vm.$router.push("/")
  },
  $http: (url, method, callback, data) => {
    if (method === "PUT" || method === "DELETE" || method === "POST") {
      data["_method"] = method
      axios.post(url, Qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        })
        .then((response) => {
          // return response
          if (response) {
            callback(response)
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    } else {
      axios.get(url, {
          params: data
        })
        .then((response) => {
          callback(response)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
}

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})