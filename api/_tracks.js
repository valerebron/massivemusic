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
  invalid: {type: String, index: true},
  duration: Number,
  play_count: Number,
})
trackSchema.index({'$**': 'text'})
let Track = mongoose.model('Track', trackSchema)

router.get('/', function(req, res) {
  // Invalid Tracks
  if(req.query.action == 'invalidTrack') {
    Track.findOneAndUpdate({id_yt: req.query.id_yt}, {$set: {invalid: 1}}, (err, doc) => {
      if(err) {
        console.log('error')
      }
      else {
        res.send('invalidate')
      }
    })
  }
  else {
    let find = { invalid: "0" }
    let sort = { timestamp: -1 }
    let limit = 100
    // style
    if(req.query.appStyle != '') {
      find = { style: req.query.appStyle, invalid: "0" }
    }
    // search
    if(req.query.search) {
      find = { $text: { $search: req.query.search }, invalid: "0" }
      if(req.query.appStyle != '') {
        find = { $text: { $search: req.query.search }, style: req.query.appStyle, invalid: "0" }
      }
    }
    Track.find(find)
    .sort(sort)
    .limit(limit)
    .exec(function(err, items){
      Track.find(find).count().exec(function(err, count){
        if (err) res.send(err)
        res.json({items, count})
      })
    })
  }
})

module.exports = router
