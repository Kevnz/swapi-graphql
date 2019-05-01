import { useState, useEffect } from 'react'
function useQuery(url, query, variables = {}, initialState = {}, options = {}) {
  let defaultOptions = {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
    timeout: 3000,
    headers: {
      'content-type': 'application/json',
    },
    runWhenSpecificPropsChanges: [],
    calculateTimeTaken: true,
    returnRawFetchResponse: false,
  }

  let [fetchData, fetchState] = useState(initialState)
  options = { ...defaultOptions, ...options }

  let fetchObj = {
    headers: options.headers,
  }
  fetchObj = options

  useEffect(function() {
    fetch(url, fetchObj)
      .then(function(resp) {
        if (resp.ok) {
          return resp
        }
        throw new Error(resp)
      })
      .then(function(resp) {
        return resp.json()
      })
      .then(function(res) {
        let obj
        obj = {
          response: res.data,
          success: true,
        }
        fetchState(obj)
      })
      .catch(function(err) {
        fetchState({ success: false, error: err })
      })
  }, options.runWhenSpecificPropsChanges)

  let { success, error, response } = { ...fetchData }
  return {
    data: response || initialState,
    success,
    error,
  }
}

export default useQuery
