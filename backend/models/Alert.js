const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  city: { type: String, required: true },
  type: { type: String, required: true },
  msg:  { type: String, required: true },
  icon: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
