import React from 'react'
import { Router } from '@reach/router'

const Home = React.lazy(() => import('../features/home'))
const Contact = React.lazy(() => import('../features/contact'))
const Films = React.lazy(() => import('../features/films'))
const About = React.lazy(() => import('../features/films'))
export default () => {
  return (
    <Router>
      <Home path="/" />
      <About path="/about" />
      <Films path="/films" />
      <Contact path="/contact" />
    </Router>
  )
}
