const setDefaults = (...args) => Object.assign({}, ...args)

export default graphqlUrl => {
  /**
   * graphql fetch - fetch w/ smart defaults for graphql requests
   * @param  {Query} query graphql query
   * @param  {Object} vars  graphql query args
   * @param  {Object} opts  fetch options
   * @return {FetchPromise} fetch promise
   */
  return (query, variables = {}, options = {}) => {
    options.body = JSON.stringify({
      query,
      variables,
    })
    const defaults = {
      method: 'POST',
      headers: new Headers(),
    }
    const fullOptions = setDefaults(defaults, options)
    // default headers
    const headers = fullOptions.headers
    if (!headers.get('content-type')) {
      fullOptions.headers.append('content-type', 'application/json')
    }
    return fetch(graphqlUrl, fullOptions).then(function(res) {
      return res.json()
    })
  }
}
