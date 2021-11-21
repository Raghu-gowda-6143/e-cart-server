const express = require('express');
const router = express.Router();

const { payment } = require('../controllers/payment-controller');

const auth = require("../middleware/auth");



router.post("/pay", auth, payment);



module.exports = router;