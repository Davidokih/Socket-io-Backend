const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const likeModel = require("../model/likeModel");
const mongoose = require("mongoose");


router.get("/", async (req, res) => {
    try {
        const user = await userModel.find();
        res.json({
            message: "success",
            data: user
        });
    } catch (error) {
        res.json({
            message: error.message
        });
        console.log(error);
    }
});
router.post("/create", async (req, res) => {
    try {
        const user = await userModel.create(req.body);
        res.json({
            message: "working",
            data: user
        });
    } catch (error) {
        res.json({
            message: error.message
        });
        console.log(error);
    }
});
router.post("/:id/like", async (req, res) => {
    try {
        const getUser = await userModel.findById(req.params.id);
        const createLike = await new likeModel({ user: req.params.id });

        createLike.user = getUser;
        createLike.save();

        getUser.like.push(mongoose.Types.ObjectId(createLike._id));
        getUser.save();
        res.json({
            message: "working",
            data: createLike
        });
    } catch (error) {
        res.json({
            message: error.message
        });
        console.log(error);
    }
});

module.exports = router;