const swapi = require('../swapi')

describe('The SWAPI API', async () => {
  it('should get Luke Skywalker', async () => {
    console.warn('swap', swapi)
    const person = await swapi.people(1)
    console.warn('person', person)
    expect(person.name).toBe('Luke Skywalker')

  })
})
