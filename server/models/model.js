const mongoose=require('mongoose');

const postInfoCol=new mongoose.Schema({
    userName: {
        type: String,
    },
    subject: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    like: {
        type: Number,
    },
    unlike: {
        type: Number,
    },
});

const postModel=mongoose.model('posts',postInfoCol);

module.exports=postModel;