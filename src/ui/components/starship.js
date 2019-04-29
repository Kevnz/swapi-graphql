import React from 'react'

export default function Starship({ name, model, manufacturer }) {
  return (
    <div>
      <h3>
        {manufacturer} {name}
      </h3>
      <span>{model}</span>
    </div>
  )
}
