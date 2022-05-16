const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },

  path: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('uploads', uploadSchema);
