const dotenv=require('dotenv');
dotenv.config();

const express=require('express');
const cors=require('cors');
const logger=require('morgan');

const connectDB=require('./config/db');
const authCtrl=require('./controllers/auth');
const booksCtrl=require('./controllers/books');
const verifyToken=require('./middleware/verifyToken');

const app=express();
const PORT=process.env.PORT||3000;

connectDB();

app.use(cors({
    origin:process.env.CLIENT_URL || 'http://localhost:5173',
}));
app.use(express.json());
app.use(logger('dev'));


app.use('/api/auth',authCtrl);

app.use('/api/books',verifyToken,booksCtrl);

app.listen(PORT,()=>{
    console.log(`Shelved API running on port ${PORT}`);
});
