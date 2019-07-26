let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let api = express()

const trackSchema = new mongoose.Schema({
  id_yt: String,
  title: {type: String, index: true},
  artist: {type: String, index: true},
  style: {type: String, index: true},
  user: Number,
  timestamp: Number,
  invalide: Number,
  duration: Number,
  play_count: Number,
})
trackSchema.index({'$**': 'text'})
let Track = mongoose.model('Track', trackSchema)

// Get All
router.get('/', function(req, res) {
  if(req.query.currentStyle != '') {
    Track
      .find({ style: req.query.currentStyle })
      .sort({timestamp: -1})
      .limit(200)
      .exec(function (err, result) {
        if (err) res.send(err)
        res.json(result)
      })
  }
  else {
    Track.find()
      .sort({timestamp: -1})
      .limit(200)
      .exec(function (err, result) {
        if (err) res.send(err)
        res.json(result)
      })
  }
})

// Search
router.get('/s/:query', function(req, res) {
  if(req.query.currentStyle != '') {
    Track
      .find({ $text: { $search: req.params.query }, style: req.query.currentStyle })
      .exec(function(err, result) {
        if (err) res.send(err)
        res.json(result)
      })
  }
  else {
    Track
    .find({ $text: { $search: req.params.query } })
    .exec(function(err, result) {
      if (err) res.send(err)
      res.json(result)
    })
  }
})

module.exports = router
