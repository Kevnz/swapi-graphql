import React from 'react'
import { useGraphQL } from '@brightleaf/react-hooks'
import Character from '../components/character'
import Loading from '../components/loading'
const Characters = () => {
  const { data, loading, error } = useGraphQL(
    `{
      person(id: null) {
        id,
        name,
        height,
        hairColor,
        mass,
        eyeColor,
        skinColor,
        birthYear,
        gender,
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

  const people = data.person
    .sort((a, b) => {
      return a.name > b.name ? 1 : -1
    })
    .map(p => {
      return <Character key={`p-${p.id}`} {...p} />
    })
  return (
    <main>
      <h3>Characters from the Star Wars GraphQL API</h3>
      {people}
    </main>
  )
}

Characters.displayName = 'Characters'

export default Characters
