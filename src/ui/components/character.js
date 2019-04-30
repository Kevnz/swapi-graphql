import React from 'react'

export default function Character({ name, birthYear, homeworld, ...o }) {
  return (
    <div className="spaced">
      <h3>{name}</h3>
      <p>
        Born {birthYear} on {homeworld.name}{' '}
      </p>
    </div>
  )
}
