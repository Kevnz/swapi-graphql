import React from 'react'

export default function Species({
  name,
  skinColors,
  averageLifespan,
  averageHeight,
  designation,
  eyeColors,
  classification,
  hairColors,
  language,
  homeworld,
}) {
  return (
    <div className="spaced">
      <h4>
        The {name} from {homeworld.name}
      </h4>
      <span>
        The {name} are {designation} and speak {language}
      </span>
    </div>
  )
}
