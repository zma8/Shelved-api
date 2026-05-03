const express=require('express');
const Book=require('../models/Book');

const router=express.Router();

router.get('/',async(req,res)=>{
    try{
        const books=await Book.find({userId:req.user._id}).sort({createdAt:-1});
        res.json(books);
    }catch(err){
        res.status(500).json({ err: 'Something went wrong' });
    }
});

router.post('/',async (req,res)=>{
    try{
        const newBook=await Book.create({
            title:req.body.title,
            status:req.body.status || 'Maybe today?',
            note:req.body.note || '',
            mood:req.body.mood || '',
            lastOpened:new Date(),
            userId:req.user._id,
        });
        res.status(201).json(newBook);
    }catch(err){
        res.status(500).json({ err: 'Something went wrong' });
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const book=await Book.findOne({_id:req.params.id,userId:req.user._id});

        if(!book){
            return res.status(404).json({err:'Book not found'}); 
        }

        req.body.lastOpened=new Date();

        if(req.body.status && req.body.status !==book.status){
            req.body.lastOpened=new Date();
        }

        const updateBook=await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json(updateBook);

    }catch(err){
        res.status(500).json({ err: 'Something went wrong' });
    }
})

module.exports=router;