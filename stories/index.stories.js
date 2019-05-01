import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Welcome } from '@storybook/react/demo'
import Film from '../src/ui/components/film'
import Character from '../src/ui/components/character'
import Vehicle from '../src/ui/components/vehicle'
import Starship from '../src/ui/components/starship'
import Species from '../src/ui/components/species'
storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
))
const film = require('./data/films.json')[0]
const character = require('./data/characters.json')[0]
const vehicle = require('./data/vehicles.json')[0]
const starship = require('./data/starships.json')[0]
const species = require('./data/species.json')[0]
storiesOf('Film', module).add('Episode 4', () => <Film {...film} />)

storiesOf('Character', module).add('Luke', () => <Character {...character} />)

storiesOf('Vehicle', module).add('Vehicle', () => <Vehicle {...vehicle} />)

storiesOf('Starship', module).add('Starship', () => <Starship {...starship} />)

storiesOf('Species', module).add('Species', () => <Species {...species} />)

/*
storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))

*/
