const express = require('express');

// Import Services
const { generateUniqueUrl, saveOriginalGeneratedToDB, returnOriginalUrlFromDB } = require('../services/url');
const { postVisit, getVisitsFromUrl } = require('../services/visit');

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
      global.LOGGER.error(dbErr);
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/stats/:uuid', async (req, res) => {
  const { uuid } = req.params;
  try {
    if (!uuid) throw new Error('Provide uuid in request params');
    const visits = await getVisitsFromUrl(`tier.app/${uuid}`);
    if (visits.length > 0) {
      const stats = visits.reduce(
        (acc, cur, idx) => {
          if (cur.ip) acc.ips.push(cur.ip);
          acc.numOfVisits = idx + 1;
          acc.lastVisit = new Date(cur.createdAt) > new Date(acc.lastVisit) ? cur.createdAt : acc.lastVisit;
          return acc;
        },
        { ips: [], numOfVisits: 0, lastVisit: new Date(0).toISOString() },
      );
      res.json(stats);
    } else throw new Error('Could not find visits');
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
    res.json(dbEntry);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
