

const roleGuard = (...roles)=>{
    return(req,res,next)=>{
        if(!req.user){
            return res.status(401).json({
                message:"You are not login . Plese login first",
            })
        }
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message:`Access denied. This action requires ${roles.join(' or ')} role.`
            })
        }
        next()
    };
};
export default roleGuard;