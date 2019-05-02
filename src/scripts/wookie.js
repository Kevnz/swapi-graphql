const url = 'https://starwars.fandom.com/ja/api/v1/'
const WikiaAPI = require('nodewikiaapi')

const mywiki = new WikiaAPI('starwars')

mywiki
  .getSearchList({
    query: 'Death Star',
  })
  .then(data => {
    console.log(data)
    return data.items[0]
  })
  .then(
    article =>
      console.log(article) ||
      mywiki.getArticlesDetails({
        ids: article.id,
        titles: article.title,
      })
  )
  .then(art => console.log(art))
  .catch(error => {
    console.error(error)
  })
