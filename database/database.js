const mongoose = require('mongoose');

const connectDb = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('connected to database');

}

module.exports = connectDb;