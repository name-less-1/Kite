const mongoose = require('mongoose');

const lawSchema = new mongoose.Schema({
  id:      { type: Number },
  title:   { type: String, required: true },
  date:    { type: String },
  status:  { type: String },
  summary: { type: String },
  bullets: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Law', lawSchema);
