import { useState, useEffect } from 'react'

function useGraphQL(url, query, variables, defaultData = { data: {} }) {
  const [data, updateData] = useState(defaultData)
  const options = {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
    timeout: 3000,
    headers: {
      'content-type': 'application/json',
    },
  }
  const fetchQuery = async (url, options) => {
    const resp = await fetch(url, options)
    const json = await resp.json()
    updateData(json)
  }
  useEffect(() => {
    fetchQuery(url, options)
  }, [])

  return data
}

export default useGraphQL
