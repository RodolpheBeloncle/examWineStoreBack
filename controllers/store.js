const StoreModel = require('../models/store');
// const { uploadErrors } = require('../utils/errors.utils');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getStoreCollections = async (req, res) => {
  try {
    StoreModel.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log('Error to get data : ' + err);
    }).sort({ createdAt: -1 });
  } catch (err) {
    res.status(500).json({ message: err });
  }

};

module.exports.getWineStore = async (req, res) => {
  try {
    const { array2d } = await StoreModel.findById(req.params.id);
    res.status(200).json(array2d);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports.updateStore = async (req, res) => {
  try {
    if (!req.body) {
      console.log('is empty');
      res.status(500).json({message:"no changes provided !"});
    } else {
      const updatedStore = await StoreModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: { array2d: req.body },
        },
        { new: true }
      );
      res.status(200).json(updatedStore);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
