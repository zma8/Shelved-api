const { Timestamp } = require('bson');
const mongoose=require('mongoose');

const bookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        enum:['Maybe today?', 'Loading...','Resting','Done enough','Not for me'],
        default:'Maybe today?',
    },
    note:{
        type:String,
        trim:true,
        default:'',
    },
    lastOpened:{
        type:Date,
        default:null,
    },
    mood:{
        type:String,
        enum:['light', 'deep', 'short', ''],
        default:'',
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
},{timestamps:true});

const Book=mongoose.model('Book',bookSchema);

module.exports=Book;