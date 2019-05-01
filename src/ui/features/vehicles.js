import React from 'react'
import useQuery from '../tools/use-graphql'
import Loading from '../components/loading'
import Vehicle from '../components/vehicle'
const Vehicles = () => {
  const { data, loading, error } = useQuery(
    `{
      vehicle(id: null) {
        id,
        name,
        model,
        manufacturer,
        costInCredits,
        length,
        maxAtmospheringSpeed,
        crew,
        consumables,
        passengers,
        vehicleClass,
        cargoCapacity,
      }
    }`,
    {},
    { data: { film: [] } }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div>Error</div>
  }

  const people = data.vehicle
    .sort((a, b) => {
      if (a.manufacturer > b.manufacturer) {
        return a.model > b.model ? 1 : -1
      }
      return a.manufacturer > b.manufacturer ? 1 : -1
    })
    .map(p => {
      return <Vehicle key={`p-${p.id}`} {...p} />
    })
  return (
    <main>
      <h3>Vehicles from the Star Wars GraphQL API</h3>
      {people}
    </main>
  )
}

Vehicles.displayName = 'Vehicles'

export default Vehicles
