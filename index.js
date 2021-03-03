//// library include
require('dotenv').config();
require('./database');
const express=require('express');
const app=express();
const port=process.env.PORT;
const cors=require('cors');
const morgan=require('morgan');
const userRoute=require('./routes/usersRoutes');





///middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/api/user',userRoute);



///routing
app.get('/',(req,res)=>{
    return res.status(200).json({
        message:"Amazon Clone REST API Home Page"
    })
})







////start server
app.listen(port,()=>{
    console.log(`Server Is Running On ${port}`)
})