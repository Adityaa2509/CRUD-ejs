const express = require('express');
const router = express.Router();
const user = require('../models/User');
const multer = require('multer');
const User = require('../models/User');

var storage = multer.diskStorage({
    destination: function(req,file,cb)
    {
        cb(null,'./uploads');
    },
    filename: function(req,file,cb)
    {
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
})

var upload = multer({
    storage:storage
}).single("image");

//all users
router.get("/",async (req,resp)=>{
   const user= await User.find()
    resp.render("index",{title:"All Users",users:user});
    // resp.json({
    //     message:"lelebidu",
    //     user   
    // })
})

router.get("/add",(req,resp)=>{

    resp.render("add_user",{title:"Add USER Page"});
})

router.post("/add",upload,async(req,resp)=>{
    try{
        const user = await User.create({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            image:req.file.filename
        })
        resp.redirect('/');
    }
    catch(err)
    {
        return resp.redirect('/add_user');
    }
    })
    
router.get("/edit/:id",async(req,resp)=>{
    let id = req.params.id;
    const user = await User.findById(id);
    try{
        if(user == '')
        resp.redirect("/");
    else
    {
        resp.render("edit",{title:"Edit User",user:user});
    }
    }
    catch(err)
    {
        console.log(err);
        resp.redirect("/");
    }

})

router.post("/update/:id",upload,async(req,resp)=>{
    try{
        let id = req.params.id;
        let new_img="";
        if(req.file)
        {
            new_img=req.file.filename;
            try{
                fs.unlinkSync("./uploads"+req.body.old_image);
            }
            catch(err)
            {
                console.log(err);
            }
        }
        const user = await user.findByIdAndUpdate(id,{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            image:new_img
        });
        resp.redirect('/');
    }
    catch(err)
    {
        return resp.redirect('/');
    }
})

router.get("/delete/:id",async(req,resp)=>{
    try{
    let id = req.params.id;
    const user = await User.findByIdAndDelete(id);
resp.redirect("/");    
}
    catch(err)
    {
        console.log(err);
        resp.redirect("/");
    }
})

module.exports = router;