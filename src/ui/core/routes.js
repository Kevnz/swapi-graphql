import React from 'react'
import { Router } from '@reach/router'

const Home = React.lazy(() => import('../features/home'))
const Contact = React.lazy(() => import('../features/contact'))
const Films = React.lazy(() => import('../features/films'))
const Characters = React.lazy(() => import('../features/characters'))
const RestFilms = React.lazy(() => import('../features/films-rest'))
export default () => {
  return (
    <Router>
      <Home path="/" />
      <Films path="/films" />
      <RestFilms path="/films-at-rest" />
      <Characters path="/characters" />
      <Contact path="/contact" />
    </Router>
  )
}
