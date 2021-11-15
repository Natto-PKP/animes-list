const express = require('express')
const { join } = require('path')
const app = express()

// Engine
app.engine('html', require('ejs').__express)

// Configuration
app.set('views', join(__dirname, './views'))
app.set('view engine', 'html')

app.use(express.static(join(__dirname, './public')))

app.get('/', (_, res) => {
  delete require.cache[require.resolve(join(__dirname, './animes.json'))]
  res.render('index', { animes: require(join(__dirname, './animes.json')) })
})

app.listen(8081)
