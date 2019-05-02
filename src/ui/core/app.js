import React, { Fragment, useState, useRef } from 'react'
import { Link } from '@reach/router'
import useClickOutside from '../tools/use-click-outside'
import Routes from './routes'

const App = () => <Routes />

export default () => {
  const [ddG, setDDG] = useState(false)
  const [ddR, setDDR] = useState(false)
  const navGQL = useRef()
  const navREST = useRef()
  const hideDropDowns = () => {
    setDDG(false)
    setDDR(false)
  }
  useClickOutside(navGQL, hideDropDowns, ddG)
  useClickOutside(navREST, hideDropDowns, ddR)

  const NavLink = props => (
    <Link
      onClick={e => {
        if (ddG) {
          setDDG(false)
        }
        if (ddR) {
          setDDR(false)
        }
      }}
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          className: isCurrent ? ' active' : ' ',
        }
      }}
    />
  )
  return (
    <Fragment>
      <h1>
        <Link to="/">SWAPI</Link>
      </h1>
      <nav ref={navGQL}>
        <div className={`dropdown ${ddG ? 'active' : ' '}`}>
          <button
            type="button"
            className="dropdown-trigger"
            onClick={e => {
              setDDG(!ddG)
            }}
          >
            GraphQL
          </button>
          <div className="dropdown-menu">
            <NavLink to="/films">Films</NavLink>
            <NavLink to="/characters">Characters</NavLink>
            <NavLink to="/vehicles">Vehicles</NavLink>
            <NavLink to="/starships">Starships</NavLink>
            <NavLink to="/species">Species</NavLink>
          </div>
        </div>
      </nav>
      <nav ref={navREST}>
        <div className={`dropdown ${ddR ? 'active' : ' '}`}>
          <button
            type="button"
            className="dropdown-trigger"
            onClick={e => {
              setDDR(!ddR)
            }}
          >
            REST
          </button>
          <div className="dropdown-menu">
            <NavLink to="/films-at-rest" className="button">
              Rest Films
            </NavLink>
            <NavLink to="/characters-at-rest" className="button">
              Rest Characters
            </NavLink>
            <NavLink to="/vehicles-at-rest" className="button">
              Rest Vehicles
            </NavLink>
            <NavLink to="/starships-at-rest" className="button">
              Rest Starships
            </NavLink>
            <NavLink to="/species-at-rest" className="button">
              Rest Species
            </NavLink>
          </div>
        </div>
      </nav>
      <React.Suspense fallback={<div>Loading</div>}>
        <App />
      </React.Suspense>
    </Fragment>
  )
}
