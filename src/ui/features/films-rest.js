import React, { useState } from 'react'
import { mapper, each } from '@kev_nz/async-tools'
import useGet from '../tools/use-get'
import Film from '../components/film'
import Characters from '../components/rest/characters'
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
      return (
        <Film key={`ep-${f.episode}`} {...f}>
          <Characters filmId={f.id} />
        </Film>
      )
    })
  return (
    <main>
      <h3>Films from the Star Wars REST API</h3>
      {films}
    </main>
  )
}

Films.displayName = 'FilmsAtRest'

export default Films
