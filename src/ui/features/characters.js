import React from 'react'
import useQuery from '../tools/use-graphql'
import Character from '../components/character'
import Loading from '../components/loading'
const Characters = () => {
  const { data, loading, error } = useQuery(
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

  console.log('render data', data)

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
      <h3>Films from the Star Wars API</h3>
      {people}
    </main>
  )
}

Characters.displayName = 'Characters'

export default Characters
