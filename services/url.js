// Using the asynchronous API of Nano ID, as it uses crypto module to generate IDs and its hash functions are known to block the event loop, using it asynchronously prevents that
const { customAlphabet } = require('nanoid/async');

const Url = require('../models/URL');

const nanoId = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 7);

/**
 * Generates a unique URL
 *
 * @function generateUniqueUrl
 * @return {Promise}
 */
const generateUniqueUrl = async () => {
  try {
    let urlExists = true;
    let generatedUrl;
    // Just to make sure that uuid generated is not allready in DB
    while (urlExists) {
      // eslint-disable-next-line no-await-in-loop
      const customId = await nanoId();
      generatedUrl = `tier.app/${customId}`;
      // eslint-disable-next-line no-await-in-loop
      if (!(await Url.findOne({ generatedUrl }).exec())) urlExists = false;
    }
    return generatedUrl;
  } catch (e) {
    global.LOGGER.error(e);
    throw e;
  }
};

/**
 * Save URLs to Database
 *
 * @function saveOriginalGeneratedToDB
 * @param {string} originalUrl - The original url.
 * @param {string} generatedUrl - The generated url.
 * @return {Promise}
 */
const saveOriginalGeneratedToDB = async (originalUrl, generatedUrl, metadata = {}) => {
  try {
    if (originalUrl && generatedUrl && typeof originalUrl === 'string' && typeof generatedUrl === 'string') {
      const savedUrl = await new Url({ originalUrl, generatedUrl, metadata }).save();
      return savedUrl;
    }
    throw new Error(`Provide originalUrl and generatedUrl as string types. originalUrl provided (${typeof originalUrl}), generated url provided ${typeof originalUrl}`);
  } catch (e) {
    global.LOGGER.error(e);
    throw e;
  }
};

/**
 * Returon Original Url from generated one
 *
 * @function returnOriginalUrlFromDB
 * @param {string} generatedUrl - The original url.
 * @return {Promise} String with the original url
 */
const returnOriginalUrlFromDB = async (generatedUrl) => {
  try {
    const urlDB = await Url.findOne({ generatedUrl }).exec();
    if (urlDB) return urlDB.originalUrl;
    return null;
  } catch (e) {
    global.LOGGER.error(e);
    throw e;
  }
};

module.exports = {
  generateUniqueUrl,
  saveOriginalGeneratedToDB,
  returnOriginalUrlFromDB,
};
