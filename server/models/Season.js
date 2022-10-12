const mongoose = require('mongoose')

const SeasonSchema = new mongoose.Schema({
  playerIds: [
    { type : mongoose.Schema.Types.ObjectId, ref: 'Player' }
  ],
  weekIds: [
    { type : mongoose.Schema.Types.ObjectId, ref: 'Week' }
  ]
})

module.exports = mongoose.model('Season', SeasonSchema)
