import Cookies from 'js-cookie'

const getCookie = (key) => {
  if (key instanceof Object) {
    return JSON.parse(Cookies.get('key'))
  } else {
    return Cookies.get(key)
  }
}

const setCookie = (key, value) => {
  if (key instanceof Object) {
    return Cookies.set(key, JSON.stringify(value))
  } else {
    return Cookies.set(key, value)
  }
}

const removeCookie = (key) => {
  return Cookies.remove(key)
}

const clearCookie = () => {
  // eslint-disable-next-line no-useless-escape
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }
}

export {
  getCookie,
  clearCookie,
  setCookie,
  removeCookie
}
