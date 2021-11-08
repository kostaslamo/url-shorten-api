const mongoose = require('mongoose');

const { mongoURI } = require('../config/keys');

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => global.LOGGER.info(`MongoDB successfully connected on ${mongoURI}`))
    .catch((err) => global.LOGGER.error(err));
};

module.exports = {
  connectToMongo,
};
