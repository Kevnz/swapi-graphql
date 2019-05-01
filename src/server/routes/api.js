const DataLoader = require('dataloader')
const { mapper } = require('@kev_nz/async-tools')
const swapi = require('../utils/swapi')
const ga = require('../utils/ga')
const parser = url => {
  const p = url.split('/')
  p.pop()
  return p.pop()
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
const doesNotHaveParams = params =>
  params.id === null || params.id === '' || params.id === undefined
const personMapper = person => {
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

const planetMapper = planet => {
  if (!planet.url) return
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
  if (!film.url) return
  return {
    id: parser(film.url),
    episode: film.episode_id,
    title: film.title,
    openingCrawl: film.opening_crawl,
    producer: film.producer,
    director: film.director,
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

const loadAndMap = async (urls, mapperFn) => {
  const items = await swapiLoader.loadMany(urls)
  if (Array.isArray(items)) return items.map(mapperFn)
  return mapperFn(items)
}

const loadAndMapOne = async (url, mapperFn) => {
  const items = await swapi.get(url)
  return mapperFn(items)
}

const planetsResolver = async (root, args, context, info) => {
  return loadAndMap(root.urls.planets, planetMapper)
}
const homeworldResolver = async url => {
  return loadAndMap(url, planetMapper)
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

module.exports = [
  {
    method: 'GET',
    path: '/api/characters/{id?}',
    config: {
      handler: async (request, h) => {
        ga('REST Call', 'Characters REST Call')
        if (doesNotHaveParams(request.params)) {
          const person = await swapi.people()
          const people = person.map(personMapper)
          return mapper(people, async c => {
            const planet = await loadAndMapOne(c.urls.homeworld, planetMapper)
            return {
              ...c,
              homeworld: planet,
            }
          })
        }
        const person = await swapi.people(request.params.id)

        const p = personMapper(person)
        p.homeworld = await loadAndMapOne(p.urls.homeworld, planetMapper)
        return [p]
      },
    },
  },
  {
    method: 'GET',
    path: '/api/films/{id?}',
    config: {
      handler: async (request, h) => {
        ga('REST Call', 'Films REST Call')
        if (doesNotHaveParams(request.params)) {
          const film = await swapi.films()
          return film.map(filmMapper)
        }
        const film = await swapi.films(request.params.id)
        return [filmMapper(film)]
      },
    },
  },
  {
    method: 'GET',
    path: '/api/films/{id}/characters',
    config: {
      handler: async (request, h) => {
        ga('REST Call', 'Characters REST Sub Call')
        const film = await swapi.films(request.params.id)
        const mappedFilm = filmMapper(film)
        const full = await charactersResolver(mappedFilm)
        return mapper(full, async c => {
          const planet = await loadAndMapOne(c.urls.homeworld, planetMapper)
          return {
            ...c,
            homeworld: planet,
          }
        })
      },
    },
  },
  {
    method: 'GET',
    path: '/api/films/{id}/vehicles',
    config: {
      handler: async (request, h) => {
        ga('REST Call', 'Vehicles REST Sub Call')
        const film = await swapi.films(request.params.id)
        const mappedFilm = filmMapper(film)
        return vehiclesResolver(mappedFilm)
      },
    },
  },
  {
    method: 'GET',
    path: '/api/films/{id}/starships',
    config: {
      handler: async (request, h) => {
        ga('REST Call', 'Starships REST Sub Call')
        const film = await swapi.films(request.params.id)
        const mappedFilm = filmMapper(film)
        return starshipsResolver(mappedFilm)
      },
    },
  },
  {
    method: 'GET',
    path: '/api/films/{id}/planets',
    config: {
      handler: async (request, h) => {
        const film = await swapi.films(request.params.id)
        const mappedFilm = filmMapper(film)
        return planetsResolver(mappedFilm)
      },
    },
  },
  {
    method: 'GET',
    path: '/api/planets/{id?}',
    config: {
      handler: async (request, h) => {
        ga('REST Call', 'Planets REST Call')

        const planet = await swapi.planets(request.params.id)
        if (doesNotHaveParams(request.params)) {
          return planet.map(planetMapper)
        }
        return [planetMapper(planet)]
      },
    },
  },
  {
    method: 'GET',
    path: '/api/vehicles/{id?}',
    config: {
      handler: async (request, h) => {
        ga('REST Call', 'Vehicles REST Call')
        if (doesNotHaveParams(request.params)) {
          const vehicle = await swapi.vehicles()
          return vehicle.map(vehicleMapper)
        }
        const vehicle = await swapi.vehicles(request.params.id)
        return [vehicleMapper(vehicle)]
      },
    },
  },
  {
    method: 'GET',
    path: '/api/starships/{id?}',
    config: {
      handler: async (request, h) => {
        ga('REST Call', 'Starships REST Call')
        if (doesNotHaveParams(request.params)) {
          const starship = await swapi.starships()
          return starship.map(starshipMapper)
        }
        const starship = await swapi.starships(request.params.id)
        return [starshipMapper(starship)]
      },
    },
  },
  {
    method: 'GET',
    path: '/api/species/{id?}',
    config: {
      handler: async (request, h) => {
        ga('REST Call', 'Species REST Call')
        if (doesNotHaveParams(request.params)) {
          const species = await swapi.species()
          const all = species.map(speciesMapper)

          return mapper(all, async c => {
            if (!c.urls.homeworld) {
              return {
                ...c,
                homeworld: fauxPlanet,
              }
            }
            const planet = await loadAndMapOne(c.urls.homeworld, planetMapper)
            return {
              ...c,
              homeworld: planet,
            }
          })
        }
        const species = await swapi.species(request.params.id)

        return [speciesMapper(species)]
      },
    },
  },
]
