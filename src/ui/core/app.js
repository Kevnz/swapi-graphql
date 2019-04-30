import React, { Fragment } from 'react'
import { Link } from '@reach/router'
import Routes from './routes'

const App = () => <Routes />
const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'button active' : 'button',
      }
    }}
  />
)
export default () => {
  return (
    <Fragment>
      <h1>
        <Link to="/">SWAPI</Link>
      </h1>
      <nav>
        <NavLink to="/films" className="button">
          Films
        </NavLink>
        <NavLink to="/films-at-rest" className="button">
          Rest API Films
        </NavLink>
      </nav>
      <React.Suspense fallback={<div>Loading</div>}>
        <App />
      </React.Suspense>
    </Fragment>
  )
}
