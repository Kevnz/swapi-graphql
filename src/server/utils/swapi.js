const r2 = require('r2')

const base = 'https://swapi.co/api/'
const people = 'people/'
const planets = 'planets/'
const starships = 'starships/'
const films = 'films/'
const species = 'species/'
const vehicles = 'vehicles/'

module.exports = {
  get: async url => {
    console.log('get a person')
    let obj = { ok: true }
    const resp = await r2.get(url).json
    console.info('get response', resp)
    return resp
  },
  people: async id => {
    console.log('get a person')
    let obj = { ok: true }
    const resp = await r2.get(`${base}${people}${id}/`).json
    console.info('people response', resp)
    return resp
  },
  planets: async id => {
    let obj = { ok: true }
    const resp = await r2.get(`${base}${planets}${id}/`).json
    console.info('planets response', resp)
    return resp
  },
  starships: async id => {
    let obj = { ok: true }
    const resp = await r2.get(`${base}${starships}${id}/`).json
    console.info('starships response', resp)
    return resp
  },
  films: async id => {
    let obj = { ok: true }
    const resp = await r2.get(`${base}${films}${id}/`).json
    console.info('films response', resp)
    return resp
  },
  species: async id => {
    let obj = { ok: true }
    const resp = await r2.get(`${base}${species}${id}/`).json
    console.info('species response', resp)
    return resp
  },
  vehicles: async id => {
    let obj = { ok: true }
    const resp = await r2.get(`${base}${vehicles}${id}/`).json
    console.info('vehicles response', resp)
    return resp
  },
}
