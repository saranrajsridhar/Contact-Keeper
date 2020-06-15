const express=require('express');
const router =express.Router();
const bcrypt=require('bcryptjs');
const config=require('config');
const jwt=require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User=require('../models/User');

//@route Post request
//@desc Register a user with details
//@access Public

router.post('/',
[check('name','Please enter name').not().isEmpty(),
check('email','Enter valid email').isEmail(),
check('password','Password must be atleast a length 6').isLength({min:6})],async (req,res)=> {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {name,email,password}=req.body;

    try {
        let user=await User.findOne({email});

        if(user){
            return res.status(400).json({msg:'User already exists'});
        }

        user=new User({

            name,
            email,
            password
        });

        const salt=await bcrypt.genSalt(10);
       //bcrypting the password 
        user.password=await bcrypt.hash(password,salt);

        await user.save();

       //jwt token
      const payload={
           user:{
               id:user.id
           }
       };

       jwt.sign(payload,config.get('jwtSecret'),{
           expiresIn:36000},
           (error,token)=>{
               if(error) throw error;
               res.json({token});
           }
       ); 
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
        
    }
   
});


//exporting to the router
module.exports=router;