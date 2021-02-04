import axios from 'axios'
import utility from '../../utils/utility'
import app from '../../main'

let instance = axios.create({})

// 处理 HTTP 响应错误
const handleResponseError = (response) => {
  if (response) {
    switch (response.status) {
      // 发出的请求有错误
      case 400:
        app.$message.warning('发出的请求有错误，请修改后重试！')
        break

      // 未登录状态，跳转登录页
      case 401:
        app.$message.info('登录以进行进一步的操作！')
        setTimeout(() => {
          app.$store.dispatch('oidcStore/authenticateOidc').then()
        }, 1000)
        break

      // token 过期，清除 token 并跳转登录页
      case 403:
        app.$message.warning('登录已过期，请您重新登录！')
        setTimeout(() => {
          app.$store.dispatch('oidcStore/authenticateOidc').then()
        }, 1000)
        break

      // 请求的资源不存在
      case 404:
        app.$message.error('请求的资源不存在！')
        break

      // 不允许的 HTTP 请求方法
      case 405:
        app.$message.error('不允许的 HTTP 请求方法！')
        break

      // 请求的资源已被永久删除
      case 410:
        app.$message.warning('请求的资源已被永久删除！')
        break

      // 服务器发生错误
      case 500:
        app.$message.error('服务器发生错误，请稍后重试！')
        break

      // 网关错误
      case 502:
        app.$message.warning('网关错误，请稍后重试！')
        break

      // 服务不可用，服务器暂时过载或正在维护，请稍后再试
      case 503:
        app.$message.warning('服务不可用，服务器暂时过载或正在维护，请稍后再试！')
        break

      // 网关超时
      case 504:
        app.$message.warning('网关超时，请稍后重试！')
        break
    }
  } else {
    app.$message.error('未知错误，请稍后重试！')
  }
}

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 发起请求前做点什么
    // app.$Progress.start()
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = utility.getToken()
    token && (config.headers.Authorization = 'Bearer ' + token)
    return config
  },
  error => {
    // 请求错误
    app.$message.error('客户端请求错误，请稍后重试！')
    // app.$Progress.fail()
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 响应成功
    // app.$Progress.finish()
    return response.data
  },
  error => {
    // 响应错误
    // app.$Progress.fail()
    const {response} = error
    handleResponseError(response)
    return Promise.reject(error)
  },
)

// 统一请求调用参数
const http = {
  get: (url, params, isPathParams = false, config = {}) => {
    if (isPathParams) {
      const pathParams = `/${params}`
      return instance.get(url + pathParams, config)
    } else {
      config.params = params
      return instance.get(url, config)
    }
  },
  post: (url, data, isPathParams, config = {}) => {
    if (isPathParams) {
      const pathParams = `/${data}`
      return instance.post(url + pathParams, null, config)
    } else {
      return instance.post(url, data, config)
    }
  },
  put: (url, data, isPathParams, config = {}) => {
    if (isPathParams) {
      const pathParams = `/${data}`
      return instance.put(url + pathParams, null, config)
    } else {
      return instance.put(url, data, config)
    }
  },
  patch: (url, data, isPathParams, config = {}) => {
    if (isPathParams) {
      const pathParams = `/${data}`
      return instance.patch(url + pathParams, null, config)
    } else {
      return instance.patch(url, data, config)
    }
  },
  delete: (url, params, isPathParams, config = {}) => {
    if (isPathParams) {
      const pathParams = `/${params}`
      return instance.delete(url + pathParams, config)
    } else {
      config.params = params
      return instance.delete(url, config)
    }
  },
}

export default http
