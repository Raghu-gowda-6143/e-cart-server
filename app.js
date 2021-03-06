require("dotenv").config({ path: "./config.env" });

const express = require('express');
const cors = require('cors');
const router = express.Router();


const server = async() => {
    const app = express();
    app.use(express.json());


    app.use(cors());


    //connecting database
    await require("./config/db");

    const errorHandler = require("./middleware/error");

    router.get("/", () => {
        res.render("welcome");
    });



    // Connecting Routes
    app.use("/api/user", require("./routers/user-router"));
    app.use("/api/product", require("./routers/product-router"));
    app.use("/api/cart", require("./routers/cart-router"));
    app.use("/api/payment", require("./routers/payment-router"));


    // Error Handler Middleware
    app.use(errorHandler);


}



module.exports = server