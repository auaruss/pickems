const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
  home: {
    type: String,
  },
  away: {
    type: String,
  },
  winner: {
    type: String,
  },
  weekId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Week',
  }
})

module.exports = mongoose.model('Game', GameSchema)
