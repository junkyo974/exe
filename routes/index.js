const express = require("express");
const router = express.Router();

const postsRouter = require("./posts.js");
const commentsRouter = require("./comments.js");

router.use("/posts", [postsRouter]);

router.use("/posts/:_postId/comments", [commentsRouter]);

module.exports = router;
