const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  id:          { type: Number },
  title:       { type: String, required: true },
  ministry:    { type: String, required: true },
  category:    { type: String, required: true },
  benefit:     { type: String, required: true },
  eligibility: { type: String },
  state:       { type: String, default: 'National' },
  tag:         { type: String },
  docs:        [{ type: String }],
  portal:      { type: String },
}, { timestamps: true });

schemeSchema.index({ state: 1, category: 1 });

module.exports = mongoose.model('Scheme', schemeSchema);
