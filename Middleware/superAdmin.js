const VerifySuperAdmin = async(req,res,next)=>{
    try {
        if(req.user.role == 'superAdmin') next();
        else{
            return res.status(400).json({msg:'only for admin'});
        }
    } catch (error) {
        return res.status(400).json({error:error});
    }
}

module.exports=VerifySuperAdmin;