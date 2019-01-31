const r2 = require('r2')
const Redis = require('ioredis')
const base = 'https://swapi.co/api/'
const people = 'people/'
const planets = 'planets/'
const starships = 'starships/'
const films = 'films/'
const species = 'species/'
const vehicles = 'vehicles/'
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
  if (fromCache !== null) return JSON.parse(fromCache)

  const resp = await r2.get(url).json
  await redis.set(url, JSON.stringify(resp))
  return resp
}
module.exports = {
  get,
  people: async id => get(`${base}${people}${id}/`),
  planets: async id => get(`${base}${planets}${id}/`),
  starships: async id => get(`${base}${starships}${id}/`),
  films: async id => get(`${base}${films}${id}/`),
  species: async id => get(`${base}${species}${id}/`),
  vehicles: async id => get(`${base}${vehicles}${id}/`),
}
