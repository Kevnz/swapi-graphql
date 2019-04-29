module.exports = [
  {
    method: 'GET',
    path: '/scrap',
    config: {
      handler: (request, h) => {
        return h.redirect('/graphql')
      },
    },
  },
]
