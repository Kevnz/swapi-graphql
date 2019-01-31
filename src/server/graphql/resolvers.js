const DataLoader = require('dataloader')
const swapi = require('../utils/swapi')
const parser = url => {
  const p = url.split('/')
  p.pop()
  return p.pop()
}
const personMapper = person => {
  return {
    id: parser(person.url),
    name: person.name,
    height: person.height,
    hairColor: person.hair_color,
    mass: person.mass,
    eyeColor: person.eyeColor,
    skinColor: person.skin_color,
    birthYear: person.birth_year,
    gender: person.gender,
    urls: {
      homeworld: person.homeworld,
      films: person.films,
      species: person.species,
      vehicles: person.vehicles,
      starships: person.starships,
    },
  }
}

const planetMapper = planet => {
  return {
    id: parser(planet.url),
    name: planet.name,
    diameter: planet.diameter,
    population: planet.hair_color,
    terrain: planet.mass,
    orbitalPeriod: planet.orbital_period,
    climate: planet.skin_color,
    rotationPeriod: planet.rotation_period,
    surfaceWater: planet.surface_water,
    gravity: planet.gravity,
    urls: {
      residents: planet.residents,
      films: planet.films,
    },
  }
}
const filmMapper = film => {
  return {
    id: parser(film.url),
    episode: film.episode_id,
    title: film.title,
    openingCrawl: film.opening_crawl,
    producer: film.producer,
    urls: {
      planets: film.planets,
      starships: film.starships,
      vehicles: film.vehicles,
      characters: film.characters,
      species: film.species,
    },
  }
}
const vehicleMapper = vehicle => {
  return {
    id: parser(vehicle.url),
    name: vehicle.name,
    model: vehicle.model,
    manufacturer: vehicle.manufacturer,
    cost_in_credits: vehicle.cost_in_credits,
    length: vehicle.length,
    max_atmosphering_speed: vehicle.max_atmosphering_speed,
    crew: vehicle.crew,
    consumables: vehicle.consumables,
    passengers: vehicle.passengers,
    vehicle_class: vehicle.vehicle_class,
    cargo_capacity: vehicle.cargo_capacity,
    urls: {
      pilots: vehicle.pilots,
    },
  }
}
const starshipMapper = starship => {
  return {
    id: parser(starship.url),
    name: starship.name,
    model: starship.model,
    manufacturer: starship.manufacturer,
    cost_in_credits: starship.cost_in_credits,
    length: starship.length,
    max_atmosphering_speed: starship.max_atmosphering_speed,
    crew: starship.crew,
    consumables: starship.consumables,
    passengers: starship.passengers,
    starship_class: starship.starship_class,
    cargo_capacity: starship.cargo_capacity,
    hyperdrive_rating: starship.hyperdrive_rating,
    MGLT: starship.MGLT,
    urls: {
      pilots: starship.pilots,
      films: starship.films,
    },
  }
}
const speciesMapper = species => {
  return {
    id: parser(species.url),
    name: species.name,
    skin_colors: species.skin_colors,
    average_lifespan: species.average_lifespan,
    average_height: species.average_height,
    designation: species.designation,
    eye_colors: species.eye_colors,
    classification: species.classification,
    hair_colors: species.hair_colors,
    language: species.language,
    urls: {
      people: species.people,
      homeworld: species.homeworld,
      films: species.films,
    },
  }
}

const swapiLoader = new DataLoader(urls => Promise.all(urls.map(swapi.get)))

const loadAndMap = async (urls, mapper) => {
  const items = await swapiLoader.loadMany(urls)
  return items.map(mapper)
}

const planetsResolver = async (root, args, context, info) => {
  return loadAndMap(root.urls.planets, planetMapper)
}
const vehiclesResolver = async (root, args, context, info) => {
  return loadAndMap(root.urls.vehicles, vehicleMapper)
}
const starshipsResolver = async (root, args, context, info) =>
  loadAndMap(root.urls.starships, starshipMapper)

const speciesResolver = async (root, args, context, info) =>
  loadAndMap(root.urls.species, speciesMapper)
const charactersResolver = async (root, args, context, info) =>
  loadAndMap(root.urls.characters, personMapper)
const residentsResolver = async (root, args, context, info) =>
  loadAndMap(root.urls.residents, personMapper)
const pilotsResolver = async (root, args, context, info) =>
  loadAndMap(root.urls.pilots, personMapper)
const filmsResolver = async (root, args, context, info) =>
  loadAndMap(root.urls.films, filmMapper)

const resolvers = {
  Film: {
    planets: planetsResolver,
    vehicles: vehiclesResolver,
    starships: starshipsResolver,
    species: speciesResolver,
    characters: charactersResolver,
  },
  Person: {
    homeworld: async (root, args, context, info) => {
      const planet = await swapiLoader.load(root.urls.homeworld)
      return planetMapper(planet)
    },
    vehicles: vehiclesResolver,
    starships: starshipsResolver,
    species: speciesResolver,
    films: filmsResolver,
  },
  Planet: {
    films: filmsResolver,
    residents: residentsResolver,
  },
  Vehicle: {
    pilots: pilotsResolver,
    films: filmsResolver,
  },
  Starship: {
    pilots: pilotsResolver,
    films: filmsResolver,
  },
  Query: {
    person: async (root, args, context, info) => {
      const person = await swapi.people(args.id)
      return personMapper(person)
    },
    planet: async (root, args, context, info) => {
      const person = await swapi.planets(args.id)
      return planetMapper(person)
    },
    vehicle: async (root, args, context, info) => {
      const vehicle = await swapi.vehicle(args.id)
      return vehicleMapper(vehicle)
    },
    starship: async (root, args, context, info) => {
      const starship = await swapi.starship(args.id)
      return starshipMapper(starship)
    },
    film: async (root, args, context, info) => {
      const film = await swapi.films(args.id)
      return filmMapper(film)
    },
  },
}

module.exports = resolvers
