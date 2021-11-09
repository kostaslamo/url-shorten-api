const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;
const mongoDB = process.env.MONGODB || 'tier-app';
const mongoPort = process.env.MONGOPORT || 27017;
const mongoURI = `mongodb://localhost:${mongoPort}/${mongoDB}`;

module.exports = {
  port,
  nodeEnv,
  mongoURI,
};
