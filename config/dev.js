const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;
const mongoDB = process.env.MONGODB || 'tier-app';
const mongoURI = `mongodb://localhost:27017/${mongoDB}`;

module.exports = {
  port,
  nodeEnv,
  mongoURI,
};
