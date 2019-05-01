const ua = require('universal-analytics')
const CODE = 'UA-64038939-4'
const visitor = ua(CODE)
module.exports = (cat, action) => {
  visitor.event(cat, action).send()
}
