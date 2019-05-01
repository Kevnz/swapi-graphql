import React from 'react'
import Loading from '../components/loading'
import Species from '../components/species'
import useGet from '../tools/use-get'
const SpeciesFeature = () => {
  const { data, loading, error } = useGet(`/api/species/`)

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <div>Error</div>
  }

  const allSpecies = data
    .sort((a, b) => {
      return a.name > b.name ? 1 : -1
    })
    .map(p => {
      return <Species key={`s-${p.id}`} {...p} />
    })
  return (
    <main>
      <h3>Species from the Star Wars REST API</h3>

      {allSpecies}
    </main>
  )
}

SpeciesFeature.displayName = 'SpeciesRest'

export default SpeciesFeature
