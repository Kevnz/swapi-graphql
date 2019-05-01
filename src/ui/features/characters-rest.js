import React from 'react'
import useGet from '../tools/use-get'
import Character from '../components/character'
import Loading from '../components/loading'

const Characters = () => {
  const { data, loading, error } = useGet(`/api/characters/`)

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
  return (
    <main>
      <h3>Characters from the Star Wars REST API</h3>
      {people}
    </main>
  )
}

Characters.displayName = 'Characters(REST)'

export default Characters
