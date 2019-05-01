import React from 'react'

export default function Starship({ name, model, manufacturer }) {
  return (
    <div className="spaced">
      <h4>
        The {manufacturer} {model}
      </h4>
      <span>{name}</span>
    </div>
  )
}
