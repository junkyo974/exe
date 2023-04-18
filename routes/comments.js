const express = require("express");
const router = express.Router();
const Comments = require("../schemas/comment.js");
const Posts = require("../schemas/post.js")

router.get("/posts/:userId/comments", async(req, res) => {
    const comments = await Comments.find({});

    const userIds = comments.map((comments) => {
       return comments.userId;
    })
    const posts = await Posts.find({userId: userIds});

    const results = comments.map((comment) => {
        return {
            comment: comments.commnet,
            userId : posts.find((item) => item.userId === comments.userId)
        }
    })
    res.json({
        Comments : results, 
    })
});

router.post("/posts/:userId/comments/", async(req,res) => {
  const {userId} = req.params;
  const {comment} = req.body;

  const existsComments = await Comments.findOne({comment});
  if (existsComments.length === 0 ){
      return res.status(400).json({
          success:false,
          errorMessage:"댓글 내용을 입력해주세요 "
      })
  }

  await Comments.create({userId, comment});

  res.json({result: success});
});


router.put("/posts/:userId/comments/", async(req, res) => {
    const {userId} = req.params;
    const {comment} = req.body;

    const existsComments = await Comments.findOne({comment});
    if (existsComments.length === 0){
        return res.status(400).json({
            success:false,
            errorMessage:"댓글 내용을 입력해주세요 "
        })
    } else {
        await Comments.updateOne(
            {userId: userId},
            {$set: {comment:commnet}}
        )
    }
    res.status(200).json({success:true});
});

router.delete("posts/:userId/comments/", async(req, res) => {
    const {userId} = req.params;

    const existsComments = await Comments.find({userId});
    if(existsComments.length){
        await Comments.deleteOne({userId});
    }

    res.json({result:"success"});
})

module.exports = router;