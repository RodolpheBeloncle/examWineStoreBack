const postController = require('../controllers/post');
const storeImg = require('../middlewares/multer');
const multer = require('multer');

const { requireAuth } = require('../middlewares/auth.middleware');

const upload = multer({ dest: 'uploads/images' });

const router = require('express').Router();

// READ IMAGES
router.get('/images', postController.getImages);

// GET ALL WINE LIST
router.get('/', postController.getWines);

//GET SELECTED WINE
router.get('/:id', postController.getSelectedWine);

//CREATE New Wine
router.post('/', upload.single('image'), postController.createNewWine);

// Remove SelectedWine
router.delete('/:id', postController.deletePost);

// remove multiple selectedWine
router.post('/selectedwines', postController.multipleDeletePost);

// UPDATE WINE Properties
router.put(
  '/updateselectedwine/:id',
  upload.single('image'),
  postController.updateWine
);

// UPLOAD MULTIPLES IMAGES
router.post(
  '/uploadmultiple/:id',
  storeImg.array('files', 12),
  postController.multipleUpload
);

// UPDATE WINE IMAGE
router.post(
  '/updateimg/:id',
  upload.single('image'),
  postController.updateOneImage
);

// UPDATE WINE IMAGE
router.post(
  '/insertStore/:id',
  postController.insertStore
);

// DELETE SELECTED IMAGE

router.post('/deletepairing/:id', postController.deleteOnePairing);

router.post('/removeStore/:id', postController.removeOneStore);

//INCREASE wine stock
router.post('/increase/:id', requireAuth, postController.increaseAmount);

module.exports = router;
