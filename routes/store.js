
const storeController = require('../controllers/store');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/auth.middleware");

const router = require("express").Router();

// GET WINESTORE COLLECTIONS
router.post('/', storeController.getStoreCollections);

//GET STORE WHERE SELECTED WINE IS STORED
router.get("/:id", storeController.getWineStore );

// UPDATE Store Properties
router.put('/updatestore/:id', storeController.updateStore);

//CREATE STORE

router.post("/newstore",storeController.newStore);

//DELETE STORE
// router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     await Store.findByIdAndDelete(req.params.id);
//     res.status(200).json("Store has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// //GET ALL STORE

// router.get("/", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const carts = await Store.find();
//     res.status(200).json(carts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
