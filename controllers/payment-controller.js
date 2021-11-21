const secret = process.env.SECRET_KEY;

const stripe = require('stripe')(secret)

exports.payment = async(req, res) => {
    const { tokenId, amount } = req.body;

    stripe.charges.create({
            source: tokenId,
            amount,
            currency: "INR"
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes)
            }
        }
    )

};