const DataLoader = require('dataloader')
const swapi = require('../utils/swapi')
const parser = url => {
  const p = url.split('/')
  p.pop()
  return p.pop()
}
const nullCheck = (entity, mapper) => {
  if (entity.url) return
  return mapper(entity)
}
const personMapper = person => {
  if (!person) return
  if (!person.url) return
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

const fauxPlanet = {
  id: 0,
  name: 'N/A',
  diameter: 'N/A',
  population: 'N/A',
  terrain: 'N/A',
  orbitalPeriod: 'N/A',
  climate: 'N/A',
  rotationPeriod: 'N/A',
  surfaceWater: 'N/A',
  gravity: 'N/A',
  urls: {
    residents: null,
    films: null,
  },
}
const planetMapper = planet => {
  if (!planet || !planet.url) return
  return {
    id: parser(planet.url),
    name: planet.name,
    diameter: planet.diameter,
    population: planet.population,
    terrain: planet.terrain,
    orbitalPeriod: planet.orbital_period,
    climate: planet.climate,
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
  if (!film.url) return
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
  if (!vehicle.url) return
  return {
    id: parser(vehicle.url),
    name: vehicle.name,
    model: vehicle.model,
    manufacturer: vehicle.manufacturer,
    costInCredits: vehicle.cost_in_credits,
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
  if (!starship.url) return
  return {
    id: parser(starship.url),
    name: starship.name,
    model: starship.model,
    manufacturer: starship.manufacturer,
    costInCredits: starship.cost_in_credits,
    length: starship.length,
    maxAtmospheringSpeed: starship.max_atmosphering_speed,
    crew: starship.crew,
    consumables: starship.consumables,
    passengers: starship.passengers,
    starshipClass: starship.starship_class,
    cargoCapacity: starship.cargo_capacity,
    hyperdriveRating: starship.hyperdrive_rating,
    MGLT: starship.MGLT,
    urls: {
      pilots: starship.pilots,
      films: starship.films,
    },
  }
}
const speciesMapper = species => {
  if (!species.url) return
  return {
    id: parser(species.url),
    name: species.name,
    skinColors: species.skin_colors,
    averageLifespan: species.average_lifespan,
    averageHeight: species.average_height,
    designation: species.designation,
    eyeColors: species.eye_colors,
    classification: species.classification,
    hairColors: species.hair_colors,
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
const homeworldResolver = async url => {
  const id = parser(url)
  const p = await swapi.planets(id)
  return planetMapper(p)
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
  Species: {
    homeworld: async (root, args, context, info) => {
      if (!root.urls) {
        return null
      }
      if (!root.urls.homeworld) {
        return fauxPlanet
      }
      return homeworldResolver(root.urls.homeworld)
    },

    films: filmsResolver,
  },
  Query: {
    person: async (root, args, context, info) => {
      const person = await swapi.people(args.id)
      if (args.id === null) {
        return person.map(personMapper)
      }
      return [personMapper(person)]
    },
    planet: async (root, args, context, info) => {
      const planet = await swapi.planets(args.id)
      if (args.id === null) {
        return planet.map(planetMapper)
      }
      return [planetMapper(planet)]
    },
    vehicle: async (root, args, context, info) => {
      const vehicle = await swapi.vehicles(args.id)
      if (args.id === null) {
        return vehicle.map(vehicleMapper)
      }
      return [vehicleMapper(vehicle)]
    },
    starship: async (root, args, context, info) => {
      const starship = await swapi.starships(args.id)
      if (args.id === null) {
        return starship.map(starshipMapper)
      }
      return [starshipMapper(starship)]
    },
    species: async (root, args, context, info) => {
      const species = await swapi.species(args.id)
      if (args.id === null) {
        return species.map(speciesMapper)
      }
      return [speciesMapper(species)]
    },
    film: async (root, args, context, info) => {
      const film = await swapi.films(args.id)
      if (args.id === null) {
        return film.map(filmMapper)
      }
      return [filmMapper(film)]
    },
  },
}

module.exports = resolvers
