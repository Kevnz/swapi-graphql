import React, { useState } from 'react'
import useGet from '../tools/use-get'
import Film from '../components/film'
import Loading from '../components/loading'
const Films = () => {
  const [id, setId] = useState(1)
  const { data, loading, error } = useGet(`/api/films`)

  if (loading) {
    return <Loading />
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
      <h3>Films from the Star Wars API</h3>
      {films}
    </main>
  )
}

Films.displayName = 'FilmsAtRest'

export default Films
