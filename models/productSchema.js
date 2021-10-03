const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        unique: true,
        required: true,

    },
    detailUrl: {
        type: String,
        unique: true
    },
    title: {
        type: Object,
        required: true,
    },
    price: {
        type: Object,
        required: true,
    },
    quantity: {
        type: Number,
        required: true

    },
    description: {
        type: String,

    },
    discount: {
        type: String,

    },
    category: {
        type: String,
    },
    tagline: {
        type: String,

    }

});

autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, 'Product');

const Product = mongoose.model('Product', productSchema)

module.exports = Product;