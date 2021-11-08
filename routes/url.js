const express = require('express');

// Import Services
const { generateUniqueUrl, saveOriginalGeneratedToDB } = require('../services/url');

const router = express.Router();

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
