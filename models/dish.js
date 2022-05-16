const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    wineId: {
      type: String,
    },
    dishName: {
      type: String,
    },
    typeOfCourse: {
      type: String,
    },
    ingredients: {
      type: Array,
    },
    dishImg: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports =  mongoose.model('dish', dishSchema)
