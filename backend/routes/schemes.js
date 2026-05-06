const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');
const { protect, admin } = require('../middleware/auth');

// GET /api/schemes?state=Punjab&category=Students
router.get('/', async (req, res, next) => {
  try {
    const { state, category } = req.query;
    const filter = {};

    if (state && state !== 'National') {
      filter.$or = [{ state: 'National' }, { state }];
    }
    if (category && category !== 'All') {
      filter.category = category;
    }

    const schemes = await Scheme.find(filter).sort({ id: 1 });
    res.json(schemes);
  } catch (err) {
    next(err);
  }
});

// GET /api/schemes/:id
router.get('/:id', async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) return res.status(404).json({ message: 'Scheme not found' });
    res.json(scheme);
  } catch (err) {
    next(err);
  }
});

// POST /api/schemes (Admin only)
router.post('/', protect, admin, async (req, res, next) => {
  try {
    const maxScheme = await Scheme.findOne().sort({ id: -1 });
    const newId = maxScheme && maxScheme.id ? maxScheme.id + 1 : 1;
    const schemeData = { ...req.body, id: newId };
    
    const scheme = await Scheme.create(schemeData);
    res.status(201).json(scheme);
  } catch (err) {
    next(err);
  }
});

// PUT /api/schemes/:id (Admin only)
router.put('/:id', protect, admin, async (req, res, next) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!scheme) return res.status(404).json({ message: 'Scheme not found' });
    res.json(scheme);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/schemes/:id (Admin only)
router.delete('/:id', protect, admin, async (req, res, next) => {
  try {
    const scheme = await Scheme.findByIdAndDelete(req.params.id);
    if (!scheme) return res.status(404).json({ message: 'Scheme not found' });
    res.json({ message: 'Scheme removed' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
