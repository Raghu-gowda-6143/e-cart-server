const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        products: [
            {
                productId: {
                    type: Number,
                    ref: "Product"

                },
                productImg: String,
                quantity: Number,
                name: String,
                price: Object,

            }
        ],
        active: {
            type: Boolean,
            default: true
        },
        modifiedOn: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);


const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart;