import React from 'react'
import useGet from '../tools/use-get'
import Starship from '../components/starship'
import Loading from '../components/loading'

const Starships = () => {
  const { data, loading, error } = useGet(`/api/starships/`)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div>Error</div>
  }

  const starships = data
    .sort((a, b) => {
      return a.manufacturer > b.manufacturer ? 1 : -1
    })
    .map(p => {
      return <Starship key={`v-${p.id}`} {...p} />
    })
  return (
    <main>
      <h3>Starships from the Star Wars REST API</h3>
      {starships}
    </main>
  )
}

Starships.displayName = 'Starships'

export default Starships
