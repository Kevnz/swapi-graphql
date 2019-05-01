import { request } from 'graphql-request'
import { useEffect, useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'get':
      return { ...state, loading: true }
    case 'success':
      return {
        ...state,
        data: action.payload.data,
        error: null,
        loading: false,
      }
    case 'error':
      return {
        ...state,
        data: action.payload.data,
        error: action.payload.error,
        loading: false,
      }
    default:
      return state
  }
}

const useGraphQL = function(query, variables) {
  const [state, dispatch] = useReducer(reducer, {
    data: [],
    error: null,
    loading: true,
  })
  const fetchQuery = async variables => {
    dispatch({ type: 'get' })
    try {
      const resp = await request('/graphql', query, variables)
      const data = resp
      dispatch({ type: 'success', payload: { data } })
    } catch (err) {
      const { data, errors } = err.response
      dispatch({ type: 'error', payload: { data, errors } })
    }
  }
  const holder = Object.keys(variables).map(key => variables[key])

  useEffect(() => {
    fetchQuery(variables)
  }, holder)
  return { ...state }
}

export default useGraphQL
