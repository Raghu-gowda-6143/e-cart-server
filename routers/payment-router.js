const express = require('express');
const router = express.Router();

const { payment, success, cancel } = require('../controllers/payment-controller');

const auth = require("../middleware/auth");



router.post("/pay", auth, payment);
router.get("/success", auth, success);
router.get("/cancel", auth, cancel);


module.exports = router;
