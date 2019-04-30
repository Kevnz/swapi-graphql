import React from 'react'
import useQuery from '../tools/use-graphql'
import Film from '../components/film'
import Vehicle from '../components/vehicle'
import Loading from '../components/loading'
const Films = () => {
  const { data, loading, error } = useQuery(
    `{
      film(id: null) {
        title
        episode
        openingCrawl
        vehicles {
          id
          name
          model
          manufacturer
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

  const films = data.film
    .sort((a, b) => {
      return a.episode > b.episode ? 1 : -1
    })
    .map(f => {
      const vehicles = f.vehicles.map(v => (
        <Vehicle key={`vh-${v.id}`} {...v} />
      ))

      return (
        <Film key={`ep-${f.episode}`} {...f}>
          {vehicles}
        </Film>
      )
    })
  return (
    <main>
      <h3>Films from the Star Wars API</h3>
      {films}
    </main>
  )
}

Films.displayName = 'Films'

export default Films
