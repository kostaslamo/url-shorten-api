require('dotenv').config();

// Import modules
const express = require('express');

// Import API routes
const api = require('./routes/api');

const app = express();

// parses incoming requests with JSON payloads
app.use(express.json());

// Routes
app.use('/api', api);

const port = process.env.PORT || 8080;

app.listen(port, () => console.info(`Server up and running in ${process.env.NODE_ENV === 'production' ? 'production' : 'development'} mode, on port ${port} !`));
