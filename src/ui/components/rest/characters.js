import React, { useState } from 'react'
import useGet from '../../tools/use-get'
import Character from '../character'
import Loading from '../loading'

const Characters = ({ filmId }) => {
  const [id, setId] = useState(filmId)
  const { data, loading, error } = useGet(`/api/films/${id}/characters`)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div>Error</div>
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div>Error</div>
  }

  const people = data
    .sort((a, b) => {
      return a.name > b.name ? 1 : -1
    })
    .map(p => {
      return <Character key={`p-${p.id}`} {...p} />
    })
  return <div>{people}</div>
}

Characters.displayName = 'Characters(REST)'

export default Characters
