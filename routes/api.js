const express = require('express');

// Routes
const checkHealth = require('./checkHealth');
const url = require('./url');

const router = express.Router();

const requestLoggerMiddleware = (req, res, next) => {
  global.LOGGER.info(`REQ.${req.method}@${req.originalUrl}`);
  next();
};

router.use('/checkHealth', requestLoggerMiddleware, checkHealth);
router.use('/url', requestLoggerMiddleware, url);

module.exports = router;
