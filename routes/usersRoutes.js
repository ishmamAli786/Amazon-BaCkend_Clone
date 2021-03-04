///include library
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const UserModel = require('.././models/user');
const token_key = process.env.TOKEN_KEY;
const storage = require('./storage');

///middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));




//default route
router.get('/', (req, res) => {
    return res.status(200).json({
        status: "true",
        message: "User Default Route"
    })
})


///user register route
//// Express Validation
router.post('/register', [
    //check empty field
    check('username').not().isEmpty().trim().escape(),
    check('password').not().isEmpty().trim().escape(),
    //check email
    check('email').isEmail().normalizeEmail()

], (req, res) => {
    const errors = validationResult(req);
    ///check errors is not empty
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            errors: errors.array(),
            message:"Form Validation Error..."
        })
    }


    ///// insert New User

    UserModel.findOne({ email: req.body.email }).then((user) => {
        ///check email exist or not
        if (user) {
            return res.status(409).json({
                status: false,
                message: "User Email Already Exist"
            });
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);
            const newUser = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });
            // newUser.save().then((result)=>{
            //     return res.status(200).json({
            //         status: True,
            //         message: "User Registered Successfully",
            //         result:result
            //     });
            // }).catch((error)=>{
            //     return res.status(502).json({
            //         status: false,
            //         message: "User Failed To Register",
            //         error:error
            //     });
            // });
            newUser.save((err, result) => {
                if (err) throw err;
                if (result) {
                    return res.status(200).json({
                        status: true,
                        message: "Data Inserted Into Database Successfully",
                        result: result
                    });
                } else {
                    return res.status(502).json({
                        status: false,
                        message: "Data Failed to Insert Into Database",
                        error: error
                    });
                }
            })
        }
    })
        .catch((error) => {
            return res.status(502).json({
                status: false,
                error: error
            });
        });
})


/////upload Profile Pic Route
router.post('/uploadProfilePic', (req, res) => {
    let upload = storage.getProfilePicUpload();
    upload(req, res, (err) => {
        console.log(req.file);
        if (err) {
            return res.status(400).json({
                status: false,
                message: "File Uplaod Failed....",
                err: err
            });
        } else {
            return res.status(200).json({
                status: true,
                message: "File Uplaod Successfully",
            });
        }
    })
})

///user login route
router.post('/login', [
    //check empty field
    check('password').not().isEmpty().trim().escape(),
    //check email
    check('email').isEmail().normalizeEmail()

], (req, res) => {
    const errors = validationResult(req);
    ///check errors is not empty
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            errors: errors.array(),
            message:"Form Validation Error..."
        })
    }
    ///check email exist or not
    UserModel.findOne({ email: req.body.email })
        .then((user) => {
            // if user dont exist
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User don't Exist"
                })
            }else{
                ///match user password
                let isPasswordMatch=bcrypt.compareSync(req.body.password,user.password);
                ///check  password is not matched
                if(!isPasswordMatch){
                    return res.status(401).json({
                        status: false,
                        message:"Password Don't Matched..."
    
                    })
                }
                else{
                    ///JSON WEB Token Generate
                    let token=jwt.sign({id:user._id,email:user.email},token_key,{expiresIn:3600})
                    ///login success
                return res.status(200).json({
                    status: true,
                    message:"User Login Successfully...",
                    token:token,
                    user:user

                })
            }
            }
        }).catch((error) => {
            return res.status(502).json({
                status: false,
                message:"Database Error..."

            })
        })

})








module.exports = router;