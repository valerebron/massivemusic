let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let api = express()

const styleSchema = new mongoose.Schema({
  id: String,
  value: {type: String, index: true},
})
styleSchema.index({'$**': 'text'})
let Style = mongoose.model('Style', styleSchema)

// Get All
router.get('/', function(req, res) {
  Style.find()
      .sort({id: 1})
      .exec(function (err, result) {
    if (err) res.send(err)
    res.json(result)
  })
})

module.exports = router
