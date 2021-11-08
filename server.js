require('dotenv').config();

// Import npm modules
const express = require('express');

// Import modules
const { port = 8080, nodeEnv = 'development' } = require('./config/keys');

global.ROOT_DIR = __dirname;

// Load Logger
global.LOGGER = require('./config/logger');

// Import API routes
const api = require('./routes/api');

const app = express();

// parses incoming requests with JSON payloads
app.use(express.json());

// Routes
app.use('/api', api);

app.listen(port, () => global.LOGGER.info(`Server up and running in ${nodeEnv === 'production' ? 'production' : 'development'} mode, on port ${port} !`));
