const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  id:       { type: Number },
  title:    { type: String, required: true },
  org:      { type: String, required: true },
  location: { type: String },
  type:     { type: String },
  category: { type: String },
  deadline: { type: String },
  link:     { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
