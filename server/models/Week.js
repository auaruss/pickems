const mongoose = require('mongoose')

const WeekSchema = new mongoose.Schema({
  weekNumber: {
    type: Number
  },
  seasonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Season'
  },
  predictionIds: [
    { type : mongoose.Schema.Types.ObjectId, ref: 'Prediction' }
  ]
})

module.exports = mongoose.model('Week', WeekSchema)
