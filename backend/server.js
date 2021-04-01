const express = require ('express');
const morgan = require ('morgan');
const bodyParser = require("body-parser");
const cors =require('cors');
const connectDB=require('./config/db')

require('dotenv').config({
    path:'./config/config.env'
})
const app = express();

connectDB();
//Config .env to ./config/config.env


app.use(express.json())
//Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Conifg for development
if(process.env.NODE_ENV==='development'){
    app.use(cors({
        origin:process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
}

//Load routes
const authRouter=require('./routes/authroutes')
const userRouter=require('./routes/userroutes')

//Use routes
app.use('/api/',authRouter);
app.use('/api/',userRouter);

app.use((req,res,next)=>{
    res.status(404).json({
        success:false,
        message:"Page Not Founded"
    })
})
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}!`);
});
