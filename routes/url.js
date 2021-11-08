const express = require('express');

// Import Services
const { generateUniqueUrl, saveOriginalGeneratedToDB, returnOriginalUrlFromDB } = require('../services/url');
const { postVisit } = require('../services/visit');

const router = express.Router();

router.get('/visit', async (req, res) => {
  const { u } = req.query;
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.socket.remoteAddress;
  try {
    if (!u) throw new Error('Provide u in queryString');
    const originalURL = await returnOriginalUrlFromDB(u);
    // first return response with the originalURL and then write visit to DB
    res.json({ originalURL });
    const data = { url: u, valid: originalURL !== null, ip };
    postVisit(data).catch((dbErr) => {
      global.LOGGER.error(dbErr.message);
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/generate', async (req, res) => {
  const { originalUrl, metadata } = req.body;
  try {
    if (!originalUrl) throw new Error('Provide originalUrl in body request');
    const generatedUrl = await generateUniqueUrl();
    const dbEntry = await saveOriginalGeneratedToDB(originalUrl, generatedUrl, metadata);
    res.json({ dbEntry });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
