const Cart = require("../models/cartSchema");


exports.addToCart = async (req, res, next) => {
    const { productId, productImg, quantity, name, price } = req.body;


    try {

        const cartItems = await new Cart({
            user: req.user._id,
            products: [{ productId, productImg, quantity, name, price }]
        });
        await cartItems.save();
        res.status(201).json({
            status: "success",
            cartItems
        });

    } catch (err) {
        next(error)
    }
}


exports.getCartItems = async (req, res, next) => {
    try {
        const cartItems = await Cart.find({ user: req.user._id });
        res.status(200).json({
            status: "success",
            cartItems
        });
    } catch (error) {
        next(error);

    }
};


exports.deleteCart = async (req, res, next) => {

    try {
        const cartItem = await Cart.findOneAndDelete({ user: req.user._id, 'products._id': req.params.id, })

        if (!cartItem) {
            throw new Error("Product does not found")

        }

        res.status(200).json({
            status: "success",
            cartItem
        })
    } catch (error) {
        next(error);
    }
};



