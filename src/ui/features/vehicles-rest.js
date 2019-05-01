import React from 'react'
import useGet from '../tools/use-get'
import Vehicle from '../components/vehicle'
import Loading from '../components/loading'

const Vehicles = () => {
  const { data, loading, error } = useGet(`/api/vehicles/`)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div>Error</div>
  }

  const vehicles = data
    .sort((a, b) => {
      if (a.manufacturer > b.manufacturer) {
        return a.model > b.model ? 1 : -1
      }
      return a.manufacturer > b.manufacturer ? 1 : -1
    })
    .map(p => {
      return <Vehicle key={`v-${p.id}`} {...p} />
    })
  return (
    <main>
      <h3>Vehicles from the Star Wars REST API</h3>
      {vehicles}
    </main>
  )
}

Vehicles.displayName = 'Vehicles'

export default Vehicles
