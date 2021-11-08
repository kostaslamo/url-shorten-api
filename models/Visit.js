const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const VisitSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  valid: {
    type: Boolean,
    required: true,
  },
  ip: {
    type: String,
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

module.exports = mongoose.model('visit', VisitSchema);
