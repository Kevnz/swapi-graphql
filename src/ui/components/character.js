import React from 'react'

export default function Character({ name, birthYear }) {
  return (
    <div>
      <h3>{name}</h3>
      <span>{birthYear}</span>
    </div>
  )
}
