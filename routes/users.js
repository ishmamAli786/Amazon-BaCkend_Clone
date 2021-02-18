///include library
const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const bodyParser=require('body-parser');
const {check,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const moment=require('moment');
const UserModel=require('.././models/user');
const token_key=process.env.TOKEN_KEY;

///middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));




//default route
router.get('/',(req,res)=>{
   return  res.status(200).json({
       status:"true",
       message:"User Default Route"
    })
})


module.exports=router;