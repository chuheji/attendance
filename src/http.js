import axios from 'axios'
import qs from 'qs'
const baseURL = '/api'

const instance = axios.create({
  baseURL: baseURL,
  transformResponse: [function (r) {
    let res = r
    try {
      res = JSON.parse(r)
    } catch (e) {
      throw e
    }
    if (res && res.code === 302) {
      window.location.href = res.data.msg
    } else if (res.code >= 200 && res.code < 400) {
      return res
    } else {
      throw res
    }
  }]
})
function errorCallback (e) {
  try {
    const d = e && e.response && e.response.data
    if (!d) {
      return Promise.reject(e)
    }
    alert(d.msg || d.title || '出现了奇怪的问题')
  } catch (e) {
    alert('出现了不可描述的奇怪问题')
  }
  return Promise.reject(e)
}

const requests = {
  get (api, query) {
    return instance.get(api, {
      params: query
    }).then(res => {
      return res.data
    }).catch(errorCallback)
  },

  delete (api, query) {
    return instance.delete(api, {
      params: query
    }).then(res => {
      return res.data
    }).catch(errorCallback)
  },

  post (url, {data = {}, type = 'formData', params = {}} = {}) {
    data = data instanceof FormData || typeof (data) === 'string' || type !== 'formData' ? data : qs.stringify(data, { arrayFormat: 'brackets' })
    let config = {params: params}
    return instance
      .post(url, data, config).then(res => {
        return res.data
      }).catch(errorCallback)
  }
}

export default requests
