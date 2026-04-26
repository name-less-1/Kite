const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  id:       { type: String },
  category: { type: String, required: true },
  location: { type: String, required: true },
  status:   { type: String, enum: ['Resolved', 'Assigned', 'Pending'], default: 'Pending' },
  date:     { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
