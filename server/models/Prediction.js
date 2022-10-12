const mongoose = require('mongoose')

const PredictionSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
  },
  predictedWinner: {
    type: String
  },
})

module.exports = mongoose.model('Prediction', PredictionSchema)
