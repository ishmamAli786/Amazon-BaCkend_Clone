///include library
const mongoose=require('mongoose');
const DB_URL=process.env.DB_URL;

////Establish Database Connection
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true,useFindAndModify: true})
.then(()=>{
    console.log("Database Connected Successfully")
})
.catch(()=>{
    console.log("Database Failed To Connect")
})