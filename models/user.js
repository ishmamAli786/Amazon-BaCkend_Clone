const mongoose=require('mongoose');
const moment=require('moment');


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Profile_Pic:{
        type:String,
        default:"empty-avatar.jpg"
    },
    createdAt:{
        type:String,
        default:moment().format("DD/MM/YYYY")+";"+moment().format("hh:mm:ss")
    },
    updatedAt:{
        type:String,
        default:moment().format("DD/MM/YYYY")+";"+moment().format("hh:mm:ss")
    },
})


//create user model

const UserModel=new mongoose.model('user',userSchema);

//export user model
module.exports=UserModel;