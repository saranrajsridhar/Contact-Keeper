const express=require('express');
const router =express.Router();
const bcrypt=require('bcryptjs');
const config=require('config');
const jwt=require('jsonwebtoken');
const auth=require('../middleware/auth')
const { check, validationResult } = require('express-validator');

const User=require('../models/User');

//@route Get api/auth
//@desc  Get logged in user
//@access Private
//login validation
router.get('/',auth,async (req,res)=> {
   try {
       const user=await User.findById(req.user.id).select('-password');
       res.json(user);
       
   } catch (error) {

    console.error(error.message);
    res.status(500).send('Server Error');
       
   }
});



//@route Post api/auth
//@desc Auth user and get token
//@access Public
router.post('/',[check('email','Enter the valid email').isEmail(),
check('password','Password is required').exists()],
async (req,res)=> {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    //passing the data
    const {email,password}=req.body;
try {
    let user = await User.findOne({email});

    if(!user){
        return res.status(400).json({msg:'Invalid Credentials'});
    }

    const isMatch= await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({msg:'Invalid Credentials'});
    }
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