const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  groups: {
    type: [String],
  },
})

module.exports = mongoose.model('Player', PlayerSchema)
