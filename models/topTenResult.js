const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  symbol: { type: String, required: true }, 
  lastPrice: { type: Number, required: true }, 
});

const TopTenResult = mongoose.model('TopTenResult', resultSchema);

module.exports = TopTenResult;
