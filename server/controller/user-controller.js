// req = frontend -> backend
// res = backend -> frontend

import User from "../model/user.js"

export const signupUser = async (req,res) => {
    try{
        const user = req.body;
        const newUser = new User(user)
        await newUser.save()

        return res.staus(200).json({
            msg: "signup successfull"
        })
    }catch(e){
        return res.staus(400).json({
            msg: "signup not successfull"
        })
    }
}