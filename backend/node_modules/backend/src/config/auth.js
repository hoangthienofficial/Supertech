import jwt from 'jsonwebtoken'
import { decodeToken } from './jwt.js';
const isAuthenticated=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        console.log(token);
        
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false,
            });
        }
        const decode=decodeToken(token)
        console.log(decode);
        
        if(!decode){
            return res.status(401).json({
                message:"Invalid",
                success:false
            })
        }
        req.id=decode.data.user_id;
        console.log(req.id);
        
        next();
    }catch(e){
        console.log(e);
        
    }
}
export default isAuthenticated