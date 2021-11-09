const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') dotenv.config();

// Import npm modules
const express = require('express');
const swaggerUi = require('swagger-ui-express');

// Import modules
const { port = 8080, nodeEnv = 'development' } = require('./config/keys');

// Import Services
const mongoDB = require('./services/mongoDB');
const swaggerDocument = require('./swagger.json');

global.ROOT_DIR = __dirname;

// Load Logger
global.LOGGER = require('./config/logger');

// Import API routes
const api = require('./routes/api');

const app = express();

// parses incoming requests with JSON payloads
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoDB.connectToMongo();

// Routes
app.use('/api', api);

app.listen(port, () => global.LOGGER.info(`Server up and running in ${nodeEnv === 'production' ? 'production' : 'development'} mode, on port ${port}.`));
