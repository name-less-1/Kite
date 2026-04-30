const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  id:          { type: String },
  category:    { type: String, required: true },
  location:    { type: String, required: true },
  status:      { type: String, enum: ['Resolved', 'Assigned', 'Pending'], default: 'Pending' },
  date:        { type: String },
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
