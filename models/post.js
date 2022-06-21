const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema(
  {
   
    estate: { type: String, default: 'NC' },
    vintage: { type: String, default: 'NC' },
    cuvee: { type: String, default: 'NC' },
    typeOfWine: { type: String, default: 'NC' },
    price: { type: String, default: 'NC' },
    stock: { type: Number, default: 0 },
    image: { type: String, default: 'No Provided Image' },
    pairings:{ type: Array,default:[] },
    storeId: { type: Array,default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wine', wineSchema);
