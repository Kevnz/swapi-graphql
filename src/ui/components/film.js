import React from 'react'

export default function Film({ title, episode, openingCrawl, children }) {
  return (
    <div>
      <h3>{title}</h3>
      <h4>Episode {episode}</h4>
      <span>{openingCrawl}</span>
      <div>{children}</div>
    </div>
  )
}
