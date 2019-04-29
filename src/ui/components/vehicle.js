import React from 'react'

export default function Vehicle({ name, manufacturer, model }) {
  return (
    <div>
      <h3>
        {manufacturer} {name}
      </h3>
      <span>{model}</span>
    </div>
  )
}
