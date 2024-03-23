const User = require('../model/userModel')
const bcrypt = require('bcrypt')

module.exports.register = async(req, res , next) => {
    // console.log(req.body)
    try{
        const {userName , email , password} = req.body

        const userNameExist = await User.findOne({userName:userName})

        if(userNameExist){
            return res.json({message:"User already Exist with this UserName!" , status: false})
        }

        const emailExist = await User.findOne({email: email})

        if(emailExist){
            return res.json({message:"Email already used!" , status:false})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({userName: userName , password: hashedPassword , email: email})

        await delete newUser.password

        res.json({status: true , newUser:newUser })
    }
    catch(err){
        console.log(err)
        next(err)
    }


}



module.exports.login = async(req, res , next) => {
    // console.log(req.body)
    try{
        const {userName , password} = req.body

        const userExist = await User.findOne({userName:userName})



        if(!userExist){
            return res.json({message:"Incorrect Username or Password" , status: false})
        }

        const validPassword = await bcrypt.compare(password , userExist.password)

        if(validPassword){
            delete userExist.password
            res.json({status: true , userExist })
        }
        else{
            res.json({status: false, message: "Incorrect Username or Password"})
        }

        
    }
    catch(err){
        console.log(err)
        next(err)
    }


}

module.exports.setAvatar = async(req , res , next) => {
    try{
        const userId = req.body.id
        const image = req.body.image


        const userData = await User.findByIdAndUpdate({_id: userId} , {
            haveAnAvatar: true,
            avatarImage: image
        })
      

        return res.json({ isSet:true ,image: image})
    }
    catch(err){
        console.log(err)
        next(err)
    }
}


// req -> id(user id)
module.exports.getContacts = async(req , res , next) => {
    // console.log('inside getContacts controller')

    try{
        const id = req.body.id
        const user = await User.find({_id: {$ne:id}}).select(
            ["email" , "userName" , "avatarImage" , "_id"]
        );
        
        return res.json(user)
    }
    catch(err){
        console.log(err)
        next(err)
    }
}