const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET /api/jobs?category=Engineer
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const jobs = await Job.find(filter).sort({ id: 1 });
    res.json(jobs);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
