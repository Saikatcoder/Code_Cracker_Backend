export const registerUser = async (req, res)=>{
    const {email, password, name} = req.body;

    if(!email || !password || !name) {
        res.status({
            message:"all fields are reqire"
        })
    }
}