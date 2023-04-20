const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post.js");
const Comments = require("../schemas/comment.js");

// 전체 조회
router.get("/", async (req, res) => {
    const posts = await Posts.find().sort({ Pdate: -1 });
    res.status(200).json({ all: posts });
  });

// userId 값에 해당하는 글만 조회  
  router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    
    const posts = await Posts.find({ userId }).sort({ Pdate: -1 });
    res.status(200).json({ detail: posts });
        
  });




// post 를 통해 게시글 작성
router.post("/:userId", async (req, res) => {
    const {title, userId, password, content} = req.body;

    const posts = await Posts.find({userId: userId});

    if( posts.length){
        return res.status(400).json({
        success:false,
        errorMessage: "이미 존재하는 아이디 입니다."
     });
    }
    const Pdate = new Date()

    const createdPosts = await Posts.create({title, userId, password, content, Pdate});

    res.json({posts: createdPosts });

});

router.put("/:userId", async(req, res) => {
    const {title, userId, password, content} = req.body;

    const post = await Posts.findOne({password});
    if (!post || post.password !== password){
        return res.status(400).json({
            success:false,
            errorMessage:"비밀번호가 일치하지 않습니다. "
        })
    } else {
        await Posts.updateOne(
            {userId: userId},
            {$set: {content:content}}
        )
    }
    res.status(200).json({success:true});
});

router.delete("/:userId", async(req, res) => {
    const {userId} = req.params;

    const existsPosts = await Posts.find({userId});
    if(existsPosts.length){
        await Posts.deleteOne({userId});
    }

    res.json({result:"success"});
})

module.exports = router;