import jwt from 'jsonwebtoken'

// create token
export const createToken=(data)=>{


 return jwt.sign({data},"BI_MAT",{expiresIn:'1d'})
}

export const createTokenRef=(data)=>{

   
    return jwt.sign({data},"BI_MAT_REF",{expiresIn:'60d'})
   }
   export const checkTokenRef=(token)=> jwt.verify(token,"BI_MAT",(error)=>   error)

export const verifyToken=(token)=> jwt.verify(token,"BI_MAT",(error)=>   error)
  

// decode token
export const decodeToken=(token)=>{
    return jwt.decode(token)
}
export const middleToken=(req,res,next)=>{
    let {token}=req.headers;
    const decode=decodeToken(token);
    console.log(token);
    
    if (!decode) {
        return res.status(401).send('Token không hợp lệ hoặc đã hết hạn');
    }

    req.id=decode.data.user_id;
    req.role    =decode.data.user_role
    let error=verifyToken(token);
    if(error) res.status(401).send(error.name);
    else next();
}
export const authorizeRoles = (allowedRoles) => (req, res, next) => {
    const userRole = req.role;
    console.log('User role:', userRole);  // Kiểm tra giá trị role từ request
    console.log('Allowed roles:', allowedRoles); // Kiểm tra danh sách allowedRoles

    if (userRole === undefined || userRole === null) {
        return res.status(401).json({ message: 'Không xác định được quyền người dùng.' });
    }

    // Kiểm tra nếu role có trong danh sách allowedRoles không
    if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Bạn không có quyền truy cập!' });
    }

    next(); // Nếu role hợp lệ, tiếp tục xử lý
};
