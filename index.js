const express = require('express')
const app = express()

// Engine
app.engine('html', require('ejs').__express)

// Configuration
app.set('views', './views')
app.set('view engine', 'html')

app.use(express.static('./public'))

module.exports = app

app.get('/', (_, res) => {
  delete require.cache[require.resolve('./animes.json')]

  res.render('index', { animes: require('./animes.json') })
})

app.listen(8080)
