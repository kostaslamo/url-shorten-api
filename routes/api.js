const express = require('express');

// Routes
const checkHealth = require('./checkHealth');

const router = express.Router();

router.use('/checkHealth', checkHealth);

module.exports = router;
