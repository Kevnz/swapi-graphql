import React from 'react'
import { useGraphQL } from '@brightleaf/react-hooks'
import Loading from '../components/loading'
import Species from '../components/species'
const SpeciesFeature = () => {
  const { data, loading, error } = useGraphQL(
    `{
      species(id: null) {
        id,
        name,
        skinColors,
        averageLifespan,
        averageHeight,
        designation,
        eyeColors,
        classification,
        hairColors,
        language,
        homeworld {
          name
        }
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
  const allSpecies = data.species
    .sort((a, b) => {
      return a.name > b.name ? 1 : -1
    })
    .map(p => {
      return <Species key={`s-${p.id}`} {...p} />
    })
  return (
    <main>
      <h3>Species from the Star Wars GraphQL API</h3>

      {allSpecies}
    </main>
  )
}

SpeciesFeature.displayName = 'SpeciesFeature'

export default SpeciesFeature
