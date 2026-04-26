const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// GET /api/complaints
router.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    next(err);
  }
});

// POST /api/complaints — submit a new complaint
router.post('/', async (req, res, next) => {
  try {
    const { category, location } = req.body;
    if (!category || !location) {
      return res.status(400).json({ message: 'category and location are required' });
    }
    const count = await Complaint.countDocuments();
    const complaint = await Complaint.create({
      id: `TKT-${2400 + count + 1}`,
      category,
      location,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    });
    res.status(201).json(complaint);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
