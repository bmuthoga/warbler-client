import axios from 'axios'

const isTestMode = process.env.NODE_ENV === 'test'

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

/*
 * A wrapper around axios API call that formats errors, etc
 * @param {string} method the HTTP verb you want to use
 * @param {string} path the route path / endpoint
 * @param {object} data (optional) data in JSON form for POST requests
*/
export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => (
    axios[method](path, data)
      .then(res => resolve(res.data))
      .catch(err => reject(!isTestMode ? 
        err.response.data.error :
        err))
  ))
}
