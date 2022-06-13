const { nanoid } = require('nanoid');
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: 'NC' },
    array2d: {
      type: Array,
      default: [
        // [
        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },
        // ],
        // [
        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },
        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },
        // ],
        // [
        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },
        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },
        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },
        // ],
        // [
        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },

        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },
        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },
        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },
        // ],
        // [
        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },
        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },

        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },
        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },
        //   {
        //     _id: {
        //       type: String,
        //       default: nanoid(),
        //     },
        //     estate: '',
        //     vintage: '',
        //     cuvee: '',
        //     stockStatus: 0,
        //     typeOfWine: '',
        //     image: '',
        //     price: '',
        //     storeId: [],
        //     storeIndex: [],
        //   },
        // ],
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Store', storeSchema);
