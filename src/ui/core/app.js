import React, { Fragment } from 'react'
import Routes from './routes'

const App = () => <Routes />
export default () => {
  return (
    <Fragment>
      <h1>SWAPI</h1>
      <React.Suspense fallback={<div>Loading</div>}>
        <App />
      </React.Suspense>
    </Fragment>
  )
}
