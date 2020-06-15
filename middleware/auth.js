const config=require('config');
const jwt=require('jsonwebtoken');

module.exports=function(req,res,next){
    //Geet the token from the header
    const token=req.header('x-auth-token');
    //check if not token
    if(!token){
        return res.status(401).json({msg:'No token,authorization denied'});
    }

    try {
        const decoded=jwt.verify(token,config.get('jwtSecret'));
        
        //request user details

        req.user=decoded.user;

        next();
    } 
    catch (error) {
         res.status(401).json({msg:'invalid token'});
    }
}