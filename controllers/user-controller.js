const User = require("../models/userSchema");
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account');


exports.signUp = async(req, res, next) => {

    const user = await new User(req.body);
    const name = user.first_name + user.last_name;


    try {
        await user.save();
        sendWelcomeEmail(user.email, name);
        const token = await user.generateAuthToken();
        res.status(201).json({
            status: "success",
            token,
            name: user.user_name
        });

    } catch (error) {
        next(error)

    }

};

exports.logIn = async(req, res, next) => {
    try {
        const user = await User.findByCredentials(req.body.user_name, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).json({
            status: "success",
            token,
            name: user.user_name

        });
    } catch (error) {
        next(error)

    }
};


exports.logOut = async(req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save();

        res.status(200).json({
            status: "success",
            message: "Logged Out Successfully"
        });
    } catch (error) {
        next(error)

    }

};

exports.logOutAll = async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).json({
            status: "success",
            message: "Logged Out From All Devices"
        });
    } catch (error) {
        next(error)

    }
};


exports.edit = async(req, res, next) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'phone']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({
            status: "failure",
            message: "invalid updates"
        })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.status(200).json({
            status: "success",
            user: req.user

        })
    } catch (error) {
        next(error)

    }
};

exports.deleteUser = async(req, res) => {
    const name = req.user.first_name + req.user.last_name;

    try {
        await req.user.remove();
        sendCancelationEmail(req.user.email, req.user.name);
        res.status(200).json({
            status: "success",
            user: req.user
        });
    } catch (error) {
        next(error)

    }
};