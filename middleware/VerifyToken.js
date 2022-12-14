import Jwt  from "jsonwebtoken";
import AppError from "../utils/appError.js";

 const verifyToken = (req,res,next)=>{
     req.cookies.access_token
   
     const auth_token = req.headers.authorization.split(" ");
     console.log("auth",auth_token[1]);
    const token = req.cookies.access_token ? req.cookies.access_token : auth_token[1];

    if(!token){
        return next(new AppError('You are not authenticated!',401))
    }

    Jwt.verify(token, process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err)  return next(new AppError("Token is not valid!", 403));
        req.user=user;
        next()
    });
}

 const verifyUser = (req, res,next) => {
  verifyToken(req, res,() => {
    if (req.user.email === req.params.email) {
      console.log(req.user);
      next();
    } else {
       return next(new AppError("You are not authorize!", 403));

    }
  });
};


 const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
       return next(new AppError("You are not authorize!", 403));
    }
  });
};

export { verifyToken, verifyUser, verifyAdmin };