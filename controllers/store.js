const StoreModel = require('../models/store');
// const { uploadErrors } = require('../utils/errors.utils');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getStoreCollections = async (req, res) => {
  const { ids } = req.body;

  try {
    StoreModel.find(
      {
        _id: {
          $in: [...ids],
        },
      },
      (err, array) => {
        if (err) {
          return res.status(500).json({ message: "no related wineStore found" });
          // handle error
        }
        let objects = {};
        array.forEach((o) => (objects[o._id] = o));
        let dupArray = ids.map((id) => objects[id]);
        // here you have objects with duplicates in dupArray:
        console.log(dupArray.length);
        if (dupArray.length === 0) {
          return res.status(200).json('no related wineStore found');
        }
        return res.status(200).json(dupArray);
      }
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports.getWineStore = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ message: 'ID unknown : ' + req.params.id });
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
      res.status(500).json({ message: 'no changes provided !' });
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

module.exports.getWineStore = async (req, res) => {
  try {
    const { array2d } = await StoreModel.findById(req.params.id);
    res.status(200).json(array2d);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports.newStore = async (req, res) => {
  const createStore = new StoreModel({
    ...req.body,
  });

  try {
    const savedStore = await createStore.save();
    res.status(200).json(savedStore);
  } catch (err) {
    res.status(500).json(err);
  }
};
