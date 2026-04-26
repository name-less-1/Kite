const express = require('express');
const router = express.Router();
const Law = require('../models/Law');

// GET /api/laws
router.get('/', async (req, res, next) => {
  try {
    const laws = await Law.find().sort({ id: 1 });
    res.json(laws);
  } catch (err) {
    next(err);
  }
});

// GET /api/laws/:id
router.get('/:id', async (req, res, next) => {
  try {
    const law = await Law.findById(req.params.id);
    if (!law) return res.status(404).json({ message: 'Law not found' });
    res.json(law);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
