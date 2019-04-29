import React, { useState } from 'react'
import useGet from '../tools/use-get'
import Film from '../components/film'

const Films = () => {
  const [id, setId] = useState(1)
  const { data, loading, error } = useGet(`/api/films`)

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  const films = data
    .sort((a, b) => {
      return a.episode > b.episode ? 1 : -1
    })
    .map(f => {
      return <Film key={`ep-${f.episode}`} {...f} />
    })
  return (
    <main>
      <h1>About the Star Wars API</h1>
      <p>The Star Wars API via GraphQL</p>
      {films}
    </main>
  )
}

Films.displayName = 'FilmsAtRest'

export default Films
