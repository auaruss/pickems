const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  playerGroup: {
    type: String,
  },
})

module.exports = mongoose.model('Player', PlayerSchema)
