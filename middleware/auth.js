const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')

const auth = async (req, res, next) => {
    try {

        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });



        if (!user) {
            throw new Error("Please Login or Signup");

        };

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            status: "failure",
            error: "Please Login or SignUp"
        })
    }
};

module.exports = auth;