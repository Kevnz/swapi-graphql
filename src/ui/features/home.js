import React from 'react'
import { Link } from '@reach/router'

export default () => (
  <main>
    <h1>Star Wars GraphQL</h1>
    <nav>
      <Link to="/films">Films</Link>
      <Link to="/films-at-rest">Rest API Films</Link>
    </nav>
  </main>
)
