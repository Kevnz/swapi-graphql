import React, { useState, useEffect } from 'react'
import useQuery from '../tools/use-graphql'
import Film from '../components/film'
import Vehicle from '../components/vehicle'
const Films = () => {
  const { data } = useQuery(
    'http://localhost:4567/graphql',
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
      <h1>About the Star Wars API</h1>
      <p>The Star Wars API via GraphQL</p>
      {films}
    </main>
  )
}

Films.displayName = 'Films'

export default Films
