const mongoose=require('mongoose');

const signUpCol=new mongoose.Schema({
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
});

const signUpModel=mongoose.model('signupUsers',signUpCol);

module.exports=signUpModel;