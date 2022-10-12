const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  playerGroup: {
    type: String,
  },
});

module.exports = mongoose.model('Client', ClientSchema);
