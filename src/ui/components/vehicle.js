import React from 'react'

export default function Vehicle({ name, manufacturer, model }) {
  return (
    <div className="spaced">
      <div className="spaced">
        <h4>
          The {manufacturer} {name}
        </h4>
        <span>
          <em>Model:</em> {model}
        </span>
      </div>
    </div>
  )
}
