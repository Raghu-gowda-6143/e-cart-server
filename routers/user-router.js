const express = require('express');
const router = express.Router();

const { signUp, logIn, logOut, logOutAll, edit, deleteUser } = require("../controllers/user-controller");

router.post("/signUp", signUp);
router.post("/logIn", logIn);


const auth = require("../middleware/auth");

router.get("/logOut", auth, logOut);
router.get("/logOutAll", auth, logOutAll);
router.patch("/edit", auth, edit);


module.exports = router;
