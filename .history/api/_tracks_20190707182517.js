let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let api = express()

const postSchema = new mongoose.Schema({
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
let Post = mongoose.model('Post', postSchema)

// Get All
router.get('/', function(req, res) {
  Post.find()
      .sort({post_timestamp: -1})
      .exec(function (err, result) {
    if (err) res.send(err)
    res.json(result)
  })
})
// Get All filtered by Tag
router.get('/tag/:tag', function(req, res) {
  Post.find({ post_tag: req.params.tag })
      .sort({post_timestamp: -1})
      .exec(function (err, result) {
    if (err) res.send(err)
    res.json(result)
  })
})
// Get All filtered by Search

// Get One
router.get('/:id', function(req, res) {
  Post.findById(req.params.id, function (err, result) {
    if (err) res.send(err)
    res.json(result)
  })
})
// Save one
router.post('/', function(req, res, next) {
  // req.body.post_tags
  Post.create(req.body, function (err, result) {
    if (err) return next(err)
    res.json(result)
  })
})
// Update one
router.put('/', function(req, res) {
  Post.findByIdAndUpdate(req.body.id, req.body, {new: true}, function (err, result) {
    if (err) res.status(500).send(err)
    res.json(result)
  })
})
// Delete one
router.delete('/:id', function(req, res) {
  Post.findByIdAndRemove(req.params.id, req.body, function (err, result) {
    if (err) res.send(err)
    res.json(result)
  })
})

module.exports = router
