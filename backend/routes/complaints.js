const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { protect } = require('../middleware/auth');

// GET /api/complaints
router.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const complaints = await Complaint.find(filter).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) { next(err); }
});

// POST /api/complaints — protected, user must be logged in
router.post('/', protect, async (req, res, next) => {
  try {
    const { category, location, description } = req.body;
    if (!category || !location) {
      return res.status(400).json({ message: 'category and location are required' });
    }
    const count = await Complaint.countDocuments();
    const complaint = await Complaint.create({
      id: `TKT-${2400 + count + 1}`,
      category,
      location,
      description: description || '',
      status: 'Pending',
      user: req.user._id,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    });
    res.status(201).json(complaint);
  } catch (err) { next(err); }
});

// GET /api/complaints/mine — get complaints filed by logged in user
router.get('/mine', protect, async (req, res, next) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) { next(err); }
});

module.exports = router;
