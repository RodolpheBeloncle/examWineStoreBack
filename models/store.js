const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  {
    storeName: { type: String, required: true },
    // array2d: [
    //   [
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Wine' },
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Wine' },
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Wine' },
    //   ],
    //   [
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Wine' },
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Wine' },
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Wine' },
    //   ],
    //   [
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Wine' },
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Wine' },
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Wine' },
    //   ],
    // ],
    array2d: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Store', storeSchema);
