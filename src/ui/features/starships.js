import React from 'react'
import useQuery from '../tools/use-graphql'
import Starship from '../components/starship'
import Loading from '../components/loading'
const Starships = () => {
  const { data, loading, error } = useQuery(
    `{
      starship(id: null) {
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
        starshipClass,
        cargoCapacity,
        hyperdriveRating,
        MGLT,
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

  const starships = data.starship
    .sort((a, b) => {
      if (a.manufacturer > b.manufacturer) {
        return a.model > b.model ? 1 : -1
      }
      return a.manufacturer > b.manufacturer ? 1 : -1
    })
    .map(p => {
      return <Starship key={`s-${p.id}`} {...p} />
    })
  return (
    <main>
      <h3>Starships from the Star Wars GraphQL API</h3>
      {starships}
    </main>
  )
}

Starships.displayName = 'Starships'

export default Starships
