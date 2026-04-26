const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// GET /api/alerts?city=Delhi
router.get('/', async (req, res, next) => {
  try {
    const { city } = req.query;
    const filter = city ? { city } : {};
    const alerts = await Alert.find(filter).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
