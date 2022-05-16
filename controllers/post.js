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

const uploadSchemaWine = Joi.object({
  estate: Joi.string(),
  vintage: Joi.string(),
  cuvee: Joi.string(),
  typeOfWine: Joi.string(),
  price: Joi.string(),
  stock: Joi.number(),
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
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;
  PostModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
      image: req.file.path,
    },
    { new: true, useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.status(200).send({ message: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Tutorial with id=' + id,
      });
    });
  // const { value: updateWine, error } = uploadSchemaWine.validate(req.body);
  // if (error) {
  //   return res.status(400).json(error);
  // }

  // try {
  //   const updatedPost = await PostModel.findOneAndUpdate(
  //     { _id: req.params.id },
  //     {
  //       ...updateWine,
  //       image: req.file.path,
  //     },
  //     { new: true }
  //   );
  //   return res.status(200).json({ response: updatedPost });
  // } catch {
  //   res.status(404).json({ error: "Post doesn't exist!" });
  // }
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
    const { pairing } = await PostModel.findById(req.params.id);
    console.log('paring', pairing);

    PostModel.findOneAndUpdate(
      { _id: selectedId },
      {
        pairing: [...pairing, ...result],
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

module.exports.deleteOnePairing = async (req, res) => {
  const selectedId = req.params.id;
  const removeId = req.body.removeId;
  console.log('removeId', removeId);

  const { pairing } = await PostModel.findById(selectedId);
  console.log('Pairing', pairing);

  if (!pairing) {
    return res.status(404).json({ message: 'img doesn t exist' });
  }

  try {
    await PostModel.updateMany(
      { _id: selectedId },
      { $pull: { pairing: { _id: ObjectID(removeId) } } },
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
