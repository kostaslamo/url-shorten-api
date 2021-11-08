const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const URLSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  generatedUrl: {
    type: String,
    required: true,
  },
  metadata: {
    method: String,
    fields: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('url', URLSchema);
