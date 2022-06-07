const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const postModel=require('./models/model.js');
const signUpModel=require('./models/models2.js');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://tugcankartal:tugcankartal@cluster0.ngc95.mongodb.net/postInfo?retryWrites=true&w=majority');

app.get('/',(req,res)=>{
    res.status(200).send('Hello Love');
});

app.get('/read',async(req,res)=>{
    postModel.find({},(err,result)=>{
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
});

app.get('/allUsers',async(req,res)=>{
    signUpModel.find({},(err,data)=>{
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

app.post('/addPostToDB',async(req,res)=>{
    const userName=req.body.userName;
    const subject=req.body.subject;
    const imageUrl=req.body.imageUrl;
    const like=Number(req.body.like);
    const unlike=Number(req.body.unlike);

    const post=new postModel({userName: userName,subject: subject,imageUrl: imageUrl,like: like,unlike: unlike});
    await post.save();

    res.send(post);
})

app.post('/addSignUpToDB',async(req,res)=>{
    const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;

    const signup=new  signUpModel({email: email,username: username,password: password});
    await signup.save();

    res.send(signup);
})

app.put('/update',async(req,res)=>{
    const newSubject=req.body.newSubject;
    const id=req.body.id;

    try{
        await postModel.findById(id,(error,postToUpdate)=>{
            postToUpdate.subject=newSubject;
            postToUpdate.save();
        }).clone()
    }catch(err){
        console.log(err)
    }

    res.send("updated");
})

app.put('/updateLike',async(req,res)=>{
    const newLikeCount=req.body.newLikeCount;
    const id=req.body.id;

    try{
        await postModel.findById(id,(error,postToUpdate)=>{
            postToUpdate.like=newLikeCount;
            postToUpdate.save();
        }).clone()
    }catch(err){
        console.log(err)
    }

    res.send("updated");
})

app.put('/updateUnlike',async(req,res)=>{
    const newUnlikeCount=req.body.newUnlikeCount;
    const id=req.body.id;

    try{
        await postModel.findById(id,(error,postToUpdate)=>{
            postToUpdate.unlike=newUnlikeCount;
            postToUpdate.save();
        }).clone()
    }catch(err){
        console.log(err)
    }

    res.send("updated");
})

app.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id;
    await postModel.findByIdAndRemove(id).exec();
    res.send('item deleted');
})

app.listen(3001,()=>{
    console.log('You are connected!');
});