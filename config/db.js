const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_DEV_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => {
    console.log("Database Connected Successfully");
});