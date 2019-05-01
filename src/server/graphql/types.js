const fs = require('fs')
const path = require('path')
const { gql } = require('apollo-server-hapi')

const schemaFiles = fs.readdirSync(path.join(__dirname, 'schemas'))

const schemas = schemaFiles.reduce((previous, current) => {
  if (current.indexOf('.graphql') === -1) return previous
  const schema = fs.readFileSync(
    path.join(__dirname, 'schemas', current),
    'utf8'
  )
  return `${previous}
  ${schema}
  `
}, '')

const typeDefs = gql`
  ${schemas}
`

module.exports = typeDefs
