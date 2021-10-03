const app = require('./app')
const defaultData = require('./constants/products');



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT  ${PORT}`)
})

//defaultData();

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});