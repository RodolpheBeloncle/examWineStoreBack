const multer = require('multer');
// const upload = multer({ dest: 'uploads/images' });

//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatar');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.split('/')[1] === 'jpg' ||
    file.mimetype.split('/')[1] === 'png' ||
    file.mimetype.split('/')[1] === 'jpeg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('wrong image format!!'), false);
  }
};

//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const { requireAuth } = require('../middlewares/auth.middleware');

const router = require('express').Router();
const userController = require('../controllers/user');

//GET ALL USER

router.get('/getAllUsers', requireAuth, userController.getAllUsers);

// router.get('/', verifyTokenAndAdmin, async (req, res) => {
//   const query = req.query.new;
//   try {
//     const users = query
//       ? await User.find().sort({ _id: -1 }).limit(5)
//       : await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// update profil
router.post(
  '/updateProfil/:id',
  upload.single('profilPic'),
  userController.updateProfil
);

//UPDATE
// router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
//   if (req.body.password) {
//     req.body.password = CryptoJS.AES.encrypt(
//       req.body.password,
//       process.env.PASS_SEC
//     ).toString();
//   }

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//DELETE
// router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json('User has been deleted...');
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET USER
// router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const { password, ...others } = user._doc;
//     res.status(200).json(others);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET USER STATS

// router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//   try {
//     const data = await User.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: '$createdAt' },
//         },
//       },
//       {
//         $group: {
//           _id: '$month',
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
