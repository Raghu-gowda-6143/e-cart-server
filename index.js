require("dotenv").config({ path: "./config.env" });

const express = require('express');
const cors = require('cors');
const router = express.Router();


(async() => {
    const app = express();
    app.use(express.json());


    app.use(cors());


    //connecting database
    await require("./config/db");
    const defaultData = require('./constants/products');
    //defaultData();


    const errorHandler = require("./middleware/error");

    // Connecting Routes
    app.use("/api/user", require("./routers/user-router"));
    app.use("/api/product", require("./routers/product-router"));
    app.use("/api/cart", require("./routers/cart-router"));
    app.use("/api/payment", require("./routers/payment-router"));


    // Error Handler Middleware
    app.use(errorHandler);
    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT, () => {
        console.log(`Server is running successfully on PORT  ${PORT}`)
    })


    process.on("unhandledRejection", (err, promise) => {
        console.log(`Logged Error: ${err.message}`);
        server.close(() => process.exit(1));
    });


})().catch(err => {
    console.log(err)
});