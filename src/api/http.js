import axios from 'axios'
import QS from 'qs' //用来序列化post类型的数据，后面会提到
import router from '../router/router';

//根据环境切换url
// if (ProcessingInstruction.env.NODE_ENV == 'development') {
//   axios.defaults.baseURL = 'https://elm.cangdu.org'
// } else {
//   axios.defaults.baseURL = ''
// }

axios.defaults.baseURL = 'https://elm.cangdu.org'
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';



/**
 * 一般登陆完成后，将用户的token通过localStorage或者cookie存在本地;
 * 每次用户进入页面时，会先从本地存储读取token,若是token存在，则更新vuex中的token,然后每次发送请求之前判断vuex中是否存在token；
 * 如果存在，则统一在http请求的header都加上token,这样后台根据token判断你的登陆情况；
 * 即使本地存在token,也可能token是过期的，所以应在响应拦截器中要对返回状态进行判断；
 * 然后用户每次进入页面时
 */

//请求拦截 request 
//import store from '@/store/index'
axios.interceptors.request.use(
  config => {
    //const token = store.state.token;
    //token && (config.headers.Authorization = token)

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截 response
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        //401 --> 未登陆，则跳转至登陆页面，并携带当前页面的路径，登陆成功后，返回当前页面，该步骤需要在登陆页面设置；
        case 401:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
          //403 --> token过期，对用户进行提示，并清空本地存储个vuex中的token,
        default:
          Toast({
            message: '请求错误',
            iconClass: 'icon icon-success'
          });
      }
      return Promise.reject(error.response)
    }
  }
)

//封装get方法和post方法

/**
 * get()方法对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的数据]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**
 * post()方法对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的数据]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params)).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}