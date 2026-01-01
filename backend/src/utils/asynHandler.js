const asynHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch(next);
    }
}
export default asynHandler;

// const asynHandler = (requestHandler)=>{
//     return (req,res,next)=>{
//         Promise.resolve(requestHandler(req,res,next))
//         .catch((err)=> next(err))
//     }
// }