const express=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const User=require('../models/User');

const router=express.Router();

router.post('/sign-up',async (req,res)=>{
    try{
        const existingUser=await User.findOne({email:req.body.email});

        if(existingUser){
            return res.status(409).json({err:'An account with the same email exists'});
        }

        const hashedPassword=bcrypt.hashSync(req.body.password,10);

        const newUser=await User.create({
            email:req.body.email,
            hashedPassword:hashedPassword,
        });

        const payload={
            _id:newUser._id,
            email:newUser.email,
        };

        const token=jwt.sign(payload,process.env.JWT_SECRET);

        res.status(201).json({token,user:newUser});
    }catch(err){
        res.status(500).json({err:'Something went wrong'});
    }
});

router.post('/sign-in',async (req,res)=>{
    try{
        const userInDataBase=await User.findOne({email:req.body.email});

        if(!userInDataBase){
            return res.status(401).json({err:'Email or password is invalid'});
        }

        const validPassword=bcrypt.compareSync(req.body.password,userInDataBase.hashedPassword);

        if(!validPassword){
            return res.status(401).json({err:'Email or password is invalid'});
        }

        const payload={
            _id:userInDataBase._id,
            email:userInDataBase.email,
        };

        const token=jwt.sign(payload,process.env.JWT_SECRET);

        res.json({token,user:userInDataBase});
    }catch(err){
        res.status(500).json({err:'Something went wrong'});

    }
});

module.exports=router;