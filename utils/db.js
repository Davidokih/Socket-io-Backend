const mongoose = require("mongoose");

const url = "mongodb+srv://Davidokih:dav517id@cluster0.1nweu.mongodb.net/socketIO?retryWrites=true&w=majority";

mongoose.connect(url).then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log(err);
});
module.exports = mongoose;