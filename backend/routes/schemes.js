const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');

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

module.exports = router;
