const Product = require('../models/productSchema.js');


exports.addProduct = async (req, res, next) => {


    try {
        if (req.user.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ message: 'You Are Not Admin' });
        }
        const exist = await Product.findOne({ detailUrl: req.body.detailUrl });
        if (exist) {
            return res.status(400).json({ message: 'Product already exist' });
        }
        const product = await new Product(req.body);
        await product.save();
        res.status(201).json({
            status: "success",
            product

        });

    } catch (error) {
        next(error);

    }

};


exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});

        res.status(200).json({
            status: "success",
            products
        });
    } catch (error) {
        next(error)

    }
};



exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        res.status(200).json({
            status: "success",
            product

        });
    } catch (error) {
        next(error)
    }
};


exports.editProduct = async (req, res, next) => {

    try {
        if (req.user.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ message: 'You Are Not Admin' });
        }
        const product = await Product.findOne({ product_name: req.params.id });
        const updates = Object.keys(req.body)
        const allowedUpdates = ['id', 'url', 'detailUrl', 'title', 'price', 'quantity', 'decsription', 'discount', 'tagline']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            next(error);
        }
        updates.forEach((update) => product[update] = req.body[update])
        await product.save()
        res.status(200).json({
            status: "success",
            product

        })
    } catch (error) {
        next(error);
    }
};


exports.deleteProduct = async (req, res, next) => {


    try {
        if (req.user.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ message: 'You Are Not Admin' });
        }
        const product = await Product.findOne({ product_name: req.params.id });
        if (!product) {
            return res.status(404).json({ message: 'Product Does Not Exist' });
        };

        await product.remove();
        res.status(200).json({
            status: "success",
            product
        });

    } catch (error) {
        next(error);
    }
};

exports.productData = async () => {
    try {
        await Product.insertMany([])

    }
    catch (error) {
        console.log(error)
    }
};