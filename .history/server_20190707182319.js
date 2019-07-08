// Dependencies
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = express()
const web = express()
const history = require('connect-history-api-fallback')
const config = require('./config.json')

api.use(bodyParser.urlencoded({extended: true}))
api.use(bodyParser.json())

api.use(function(request, response, next) {
  response.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, DELETE")
  response.header("Access-Control-Allow-Origin", "*")
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Methods")
  next()
})

// Connect mongo
mongoose.connect('mongodb://'+config.bddHost+':'+config.bddPort+'/'+config.bddName, { useNewUrlParser: true })
.then(() => console.log('connected to '+config.bddName))
.catch((err) => console.error(err))

// api Routes
let posts = require('./api/_tracks')

// api urls
api.use('/posts', posts)
api.use('/comments', comments)
api.use('/tags', tags)
api.use('/loadlink', loadlink)

// api
api.listen(config.apiPort, function(){
  console.log('API on port ' + config.apiPort)
})

// web
// web.use(history())
web.use(express.static('dist'))
web.use((req, res) => res.sendFile(__dirname + '/dist/index.html'))
web.listen(config.webPort, function(){
  console.log('Web on port ' + config.webPort)
})
