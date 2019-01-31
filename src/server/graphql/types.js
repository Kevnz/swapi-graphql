
const fs = require('fs')
const path = require('path')
const { gql } = require('apollo-server-hapi')

const schemaFiles = fs.readdirSync(path.join(__dirname, 'schemas'))

const schemas = schemaFiles.reduce((previous, current) => {
  console.log('current', current)
  if (current.indexOf('.graphql') === -1) return previous
  const schema = fs.readFileSync(
    path.join(__dirname, 'schemas', current),
    'utf8'
  )
  return`${previous}
  ${schema}
  `
}, '')

console.log('schemas', schemas)
const typeDefs = gql`
  ${schemas}
`

module.exports = typeDefs
