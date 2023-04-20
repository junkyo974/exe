const mongoose = require("mongoose");
const Post = require("./post");

const commentSchema = new mongoose.Schema({
    
    userId: {
    type: String,
    required: true,
    
  },  
    comment: {
    type: String,
    required: true
  },
    Pdate: {
    type: Date,
    required: true,
    default: Date.now
  },
});

module.exports = mongoose.model("comment", commentSchema);