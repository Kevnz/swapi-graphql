const r2 = require('r2')
const Redis = require('ioredis')
const mapper = require('./async/map')
const base = 'https://swapi.co/api/'
/*
const people = 'people/'
const planets = 'planets/'
const starships = 'starships/'
const films = 'films/'
const species = 'species/'
const vehicles = 'vehicles/'
*/
const redisConfig = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
}
if (process.env.REDIS_PASSWORD) {
  redisConfig.password = process.env.REDIS_PASSWORD
}

const redis = new Redis(redisConfig)

const get = async url => {
  const fromCache = await redis.get(url)
  if (fromCache) return JSON.parse(fromCache)

  const resp = await r2.get(url).json

  await redis.set(url, JSON.stringify(resp))
  return resp
}
const bulkGet = async url => {
  const fromCache = await redis.get(url)
  if (fromCache) return JSON.parse(fromCache)

  const resp = await r2.get(url).json
  const results = resp.results
  mapper(results, async item => {
    const itemUrl = item.url
    await redis.set(itemUrl, JSON.stringify(item))
    return item
  })
  await redis.set(url, JSON.stringify(resp))
  return resp
}
module.exports = {
  get,
  people: async id => {
    if (id == null) {
      const pages = Array(9)
        .fill(0)
        .map((_, i) => i + 1)

      const peeps = await mapper(pages, page =>
        bulkGet(`${base}people/?format=json&page=${page}`)
      )
      return [].concat(...peeps.map(p => p.results))
    }
    return get(`${base}people/${id}/`)
  },
  planets: async id => {
    if (id == null) {
      const pages = Array(7)
        .fill(0)
        .map((_, i) => i + 1)

      const planets = await mapper(pages, page =>
        bulkGet(`${base}planets/?format=json&page=${page}`)
      )

      return [].concat(...planets.map(p => p.results))
    }
    return get(`${base}planets/${id}?format=json`)
  },
  starships: async id => {
    if (id == null) {
      const pages = Array(4)
        .fill(0)
        .map((_, i) => i + 1)

      const starships = await mapper(pages, page =>
        bulkGet(`${base}starships/?format=json&page=${page}`)
      )
      return [].concat(...starships.map(p => p.results))
    }
    return get(`${base}starships/${id}/`)
  },
  films: async id => {
    if (id == null) {
      const films = await bulkGet(`${base}films/?format=json`)
      return films.results
    }
    return get(`${base}films/${id}/`)
  },
  species: async id => {
    if (id == null) {
      const pages = Array(4)
        .fill(0)
        .map((_, i) => i + 1)

      const species = await mapper(pages, page =>
        bulkGet(`${base}species/?format=json&page=${page}`)
      )
      return [].concat(...species.map(p => p.results))
    }
    return get(`${base}species/${id}/`)
  },
  vehicles: async id => {
    if (id == null) {
      const pages = Array(4)
        .fill(0)
        .map((_, i) => i + 1)

      const vehicles = await mapper(pages, page =>
        bulkGet(`${base}vehicles/?format=json&page=${page}`)
      )
      return [].concat(...vehicles.map(p => p.results))
    }
    return get(`${base}vehicles/${id}/`)
  },
}
