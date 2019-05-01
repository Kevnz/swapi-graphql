const swapi = require('../swapi')

describe('The SWAPI API', async () => {
  it('should get Luke Skywalker', async () => {
    const person = await swapi.people(1)

    expect(person.name).toBe('Luke Skywalker')
  })
})
