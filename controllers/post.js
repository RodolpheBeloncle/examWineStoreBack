const PostModel = require('../models/post');
const UploadModel = require('../models/schema');
const fs = require('fs');
const ObjectID = require('mongoose').Types.ObjectId;
const Joi = require('joi');

module.exports.getWines = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error to get data : ' + err);
  }).sort({ createdAt: -1 });
};

//GET POST
module.exports.getSelectedWine = async (req, res) => {
  try {
    const selectedWine = await PostModel.findById(req.params.id);
    res.status(200).json(selectedWine);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports.updateOneImage = async (req, res) => {
  const selectedId = req.params.id;
  if (!ObjectID.isValid(selectedId)) {
    return res.status(400).send('ID unknown : ' + selectedId);
  }

  try {
    PostModel.findOneAndUpdate(
      { _id: selectedId },
      {
        image: req.file.path,
      },
      { new: true, upsert: true }
    )
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: `Cannot update images . Maybe images was not found!`,
          });
        } else res.status(200).send({ message: data });
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error updating pairing img with id',
        });
      });
  } catch (error) {
    console.log(error);
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Too many files to upload.' });
    }
    return res
      .status(400)
      .json({ message: `Error when trying upload many files: ${error}` });
  }
};

const uploadSchemaWine = Joi.object({
  estate: Joi.string().allow(null, ''),
  vintage: Joi.string().allow(null, ''),
  cuvee: Joi.string().allow(null, ''),
  typeOfWine: Joi.string().allow(null, ''),
  price: Joi.string().allow(null, ''),
  stock: Joi.number().allow(null, ''),
});

module.exports.createNewWine = async (req, res) => {
  const { value: newWine, error } = uploadSchemaWine.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  try {
    const newPost = new PostModel({
      ...newWine,
      image: req.file.path,
    });

    const post = await newPost.save();
    return res.status(201).json({ message: post });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports.updateWine = async (req, res) => {
  const { value: wineToUpdate, error } = uploadSchemaWine.validate(req.body);

  const selectedId = req.params.id;
  if (!ObjectID.isValid(selectedId)) {
    return res.status(400).send('ID unknown : ' + selectedId);
  }

  try {
    await PostModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...wineToUpdate,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).then((response) => res.status(201).json({ message: response }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ message: 'ID unknown : ' + req.params.id });

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.status(200).json({ message: 'wine deleted successfully' });
    else console.log('Delete error : ' + err);
  });
};

module.exports.multipleDeletePost = async (req, res) => {
  const { ids } = req.body;
  await PostModel.deleteMany({
    _id: { $in: ids },
  });
  return res.status(200).json({ message: 'record deleted' });
};

module.exports.increaseAmount = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ message: 'ID unknown : ' + req.params.id });

  PostModel.findOneAndUpdate(
    req.params.id,
    {
      $inc: {
        totalInstock: 1,
      },
    },
    { new: true }
  )
    .then((response) => {
      res.status(200).json({ message: response });
    })

    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

// IMAGES CONTROLLER

module.exports.getImages = async (req, res) => {
  const all_images = await UploadModel.find();
  res.status(200).json({ images: all_images });
};

module.exports.multipleUpload = async (req, res) => {
  console.log('req.files.pathclear', req.files);

  const files = req.files;
  try {
    // await upload(req, res);

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    // convert images into base64 encoding
    let imgArray = files.map((file) => {
      let img = fs.readFileSync(file.path);

      return (encode_image = img.toString('base64'));
    });

    let result = imgArray.map((src, index) => {
      // create object to store data in the collection

      let finalImg = {
        filename: files[index].filename,
        contentType: files[index].mimetype,
        path: files[index].path,
      };

      return new UploadModel(finalImg);
    });

    const selectedId = req.params.id;
    const { pairings } = await PostModel.findById(req.params.id);
    console.log('paring', pairings);

    PostModel.findOneAndUpdate(
      { _id: selectedId },
      {
        pairings: [...pairings, ...result],
      },
      { new: true, upsert: true }
    )
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: `Cannot update images from selected idwine ${id}. Maybe images was not found!`,
          });
        } else res.status(200).send({ message: data });
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error updating pairing img with id=' + id,
        });
      });
  } catch (error) {
    console.log(error);
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Too many files to upload.' });
    }
    return res
      .status(400)
      .json({ message: `Error when trying upload many files: ${error}` });
  }
};

module.exports.insertStore = async (req, res) => {
  const selectedWineId = req.params.id;
  const selectedStore = req.body.storeId;
  console.log('selectedStore', selectedStore);

  const { storeId } = await PostModel.findById(selectedWineId);

  console.log('selectedStore from selected wineid', storeId);

  PostModel.findOneAndUpdate(
    { _id: selectedWineId },
    {
      storeId: [...selectedStore],
    },
    { new: true, upsert: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update selectedwine`,
        });
      } else res.status(200).send({ message: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

module.exports.deleteOnePairing = async (req, res) => {
  const selectedId = req.params.id;
  const removeId = req.body.removeId;
  console.log('removeId', removeId);

  const { pairings } = await PostModel.findById(selectedId);

  console.log('winePairings from selected wineid', pairings);

  if (!pairings) {
    return res.status(404).json({ message: 'img doesn t exist' });
  }

  try {
    await PostModel.findOneAndUpdate(
      { _id: selectedId },
      { $pull: { pairings: { _id: ObjectID(removeId) } } },
      { multi: true }
    ).then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update pairings`,
        });
      } else res.status(200).send({ message: data });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Too many files to upload.' });
  }
};

module.exports.removeOneStore = async (req, res) => {
  const selectedId = req.params.id;
  const removeStoreId = req.body.removeStoreId;
  console.log('removeStoreId from storeList', removeStoreId);

  const { storeId } = await PostModel.findById(selectedId);

  console.log('storeId list', storeId);

  if (!storeId) {
    return res.status(404).json({ message: "storeId doesn't exist" });
  }

  let filteredStoreList = storeId.filter((id) => !removeStoreId.includes(id));
  console.log("filteredStoreList",filteredStoreList)

  try {
    await PostModel.updateMany(
      { _id: selectedId },
      { storeId: filteredStoreList },
      { new: true, upsert: true }
    ).then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update storeId`,
        });
      } else res.status(200).send({ message: data });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
};
