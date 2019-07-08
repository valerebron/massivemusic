let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let api = express()

const trackSchema = new mongoose.Schema({
  id_yt: String,
  title: String,
  artist: String,
  style: Number,
  user: Number,
  timestamp: Number,
  invalide: Number,
  duration: Number,
  play_count: Number,
})
let Track = mongoose.model('Track', trackSchema)

// Get All
router.get('/', function(req, res) {
  Track.find()
      .sort({timestamp: -1})
      .exec(function (err, result) {
    if (err) res.send(err)
    res.json(result)
  })
})

// Search
router.get('/s/:query', function(req, res) {
  Track.find({$text: {$search: req.params.query}})
       .exec(function(err, result) {
         if (err) res.send(err)
         res.json(result)
       })
})

module.exports = router
