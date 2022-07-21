const mongoose = require("mongoose");

const likeModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

module.exports = mongoose.model("likes", likeModel);