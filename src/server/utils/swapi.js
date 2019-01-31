const r2 = require('r2')
const Redis = require('ioredis')
const base = 'https://swapi.co/api/'
const people = 'people/'
const planets = 'planets/'
const starships = 'starships/'
const films = 'films/'
const species = 'species/'
const vehicles = 'vehicles/'

const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
})

const get = async url => {
  const fromCache = await redis.get(url)
  console.log('from cache', fromCache)
  if (fromCache !== null) return JSON.parse(fromCache)

  const resp = await r2.get(url).json
  console.info('get response', resp)
  await redis.set(url, JSON.stringify(resp))
  return resp
}
module.exports = {
  get,
  people: async id => {
    console.log('get a person')
    const resp = await get(`${base}${people}${id}/`)
    console.info('people response', resp)
    return resp
  },
  planets: async id => {
    const resp = await get(`${base}${planets}${id}/`)
    console.info('planets response', resp)
    return resp
  },
  starships: async id => {
    const resp = await get(`${base}${starships}${id}/`)
    console.info('starships response', resp)
    return resp
  },
  films: async id => {
    const resp = await get(`${base}${films}${id}/`)
    console.info('films response', resp)
    return resp
  },
  species: async id => {
    const resp = await get(`${base}${species}${id}/`)
    console.info('species response', resp)
    return resp
  },
  vehicles: async id => {
    const resp = await get(`${base}${vehicles}${id}/`)
    console.info('vehicles response', resp)
    return resp
  },
}
