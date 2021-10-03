const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const { addProduct, getProducts, getProductById, editProduct, deleteProduct } = require("../controllers/product-controller");


//   For Public
router.get('/products', getProducts);
router.get('/product/:id', getProductById);


//   For Admins Only
// router.post('/add', auth, addProduct);
// router.patch('/edit/:id', auth, editProduct);
// router.delete('/delete/:id', auth, deleteProduct);


module.exports = router;