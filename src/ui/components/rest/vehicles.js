import React, { useState } from 'react'
import useGet from '../../tools/use-get'
import Vehicle from '../vehicle'
import Loading from '../loading'
const Vehicles = ({ filmId }) => {
  const [id, setId] = useState(filmId)
  const { data, loading, error } = useGet(`/api/films/${id}/vehicles`)

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
      return <Vehicle key={`p-${p.id}`} {...p} />
    })
  return (
    <main>
      <h3>Vehicles from the Star Wars API</h3>
      {people}
    </main>
  )
}

Vehicles.displayName = 'Vehicles'

export default Vehicles
