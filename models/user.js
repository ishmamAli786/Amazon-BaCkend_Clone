const mongoose=require('mongoose');
const moment=require('moment');


const userSchema=new mongoose.Schema({
    username:{
        type:string,
        require:true,
    },
    email:{
        type:string,
        require:true
    },
    password:{
        type:string,
        required:true
    },
    Profile_Pic:{
        type:string,
        default:"empty-avatar.jpg"
    },
    createdAt:{
        type:string,
        default:moment().format("DD/MM/YYYY")+";"+moment().format("hh:mm:ss")
    },
    updatedAt:{
        type:string,
        default:moment().format("DD/MM/YYYY")+";"+moment().format("hh:mm:ss")
    },
})


//create user model

const UserModel=new mongoose.model('user',userSchema);

//export user model
module.exports=UserModel;