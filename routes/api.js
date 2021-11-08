const express = require('express');

// Routes
const checkHealth = require('./checkHealth');

const router = express.Router();

const requestLoggerMiddleware = (req, res, next) => {
  global.LOGGER.info(`REQ.${req.method}@${req.originalUrl}`);
  next();
};

router.use('/checkHealth', requestLoggerMiddleware, checkHealth);

module.exports = router;
