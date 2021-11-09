const mongoose = require('mongoose');

const { mongoURI } = require('../config/keys');

/**
 * Connects to MongoDB
 *
 * @function connectToMongo
 */
const connectToMongo = () => {
  global.LOGGER.info(`MongoDB trying to connect on ${mongoURI}...`);
  mongoose
    .connect(mongoURI)
    .then(() => global.LOGGER.info(`MongoDB successfully connected.`))
    .catch((err) => global.LOGGER.error(err));
};

module.exports = {
  connectToMongo,
};
