const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const { addToCart, getCartItems, deleteCart } = require("../controllers/cart-controller");


router.post("/add", auth, addToCart);
router.get("/get", auth, getCartItems);
router.delete("/delete/:id", auth, deleteCart);




module.exports = router;
