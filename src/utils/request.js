import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 跨域请求时发送cookies
  timeout: 5000000
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 发出请求前 do something

    if (store.getters.token) {
      // 让每个请求携带令牌
      // ['X-Token'] 是一个自定义headers key
      // 请根据实际情况修改
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error) => {
    // 处理请求错误
    console.log(error) // 用于调试
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果您想要获取诸如头或状态之类的http信息
   * 请 return  response => response
   */

  /**
   * desc
   * 通过自定义代码确定请求状态
   * 这里只是一个例子
   * 您还可以通过HTTP状态代码判断状态
   */
  (response) => {
    const res = response.data
    // 如果自定义代码不是200，则判断为错误。
    if (res.code !== 200) {
      if (res.code === 500) {
        Toast({
          type: 'fail',
          message: '服务端错误'
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    Toast({
      type: 'fail',
      message: error.message
    })
    return Promise.reject(error)
  }
)

export default service
