import React from 'react'
import { Router } from '@reach/router'

const Home = React.lazy(() => import('../features/home'))
const Contact = React.lazy(() => import('../features/contact'))
const Films = React.lazy(() => import('../features/films'))
const Characters = React.lazy(() => import('../features/characters'))
const Vehicles = React.lazy(() => import('../features/vehicles'))
const Starships = React.lazy(() => import('../features/starships'))
const Species = React.lazy(() => import('../features/species'))
const RestCharacters = React.lazy(() => import('../features/characters-rest'))
const RestFilms = React.lazy(() => import('../features/films-rest'))
const RestVehicles = React.lazy(() => import('../features/vehicles-rest'))
const RestStarships = React.lazy(() => import('../features/starships-rest'))
const RestSpecies = React.lazy(() => import('../features/species-rest'))
export default () => {
  return (
    <Router>
      <Home path="/" />
      <Films path="/films" />
      <RestFilms path="/films-at-rest" />
      <Characters path="/characters" />
      <Vehicles path="/vehicles" />
      <Starships path="/starships" />
      <Species path="/species" />
      <RestCharacters path="/characters-at-rest" />
      <RestVehicles path="/vehicles-at-rest" />
      <RestStarships path="/starships-at-rest" />
      <RestSpecies path="/species-at-rest" />
      <Contact path="/contact" />
    </Router>
  )
}
