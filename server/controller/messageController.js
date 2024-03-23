const mongoose = require('mongoose')
const User = require('../model/userModel')
const Messages = require('../model/messageModel')

module.exports.addMessage = async(req , res, next) => {
    try{
        const {from , to , message} = req.body;

        const fromId= from._id;
        const toId = to._id;
        const data = await Messages.create(
            {
                message: message,
                users: [fromId , toId],
                sender: from
            }
        )

        if(data){
            return res.json({message:"Message Added to DB", status: true})
        }
        else{
            return res.json({message: "Failed to Add Message to the DB" , status:false})
        }
    }
    catch(err){
        console.log(err)
        next(err)
    }
}


module.exports.getMessages = async(req , res , next) => {
    try{
        const {from , to} = req.body
        console.log(req.body)
    
    
        const fromId = from
        const toId = to

        console.log(fromId)
        console.log(toId)


        const messages = await Messages.find({users:{
            $all: [fromId ,toId]
        }}).sort({updatedAt: 1})

        console.log(messages)

        const projectedMessages = messages.map((message , index) => {
            return {
                fromSelf: message.sender.toString() === from,
                message: message.message
            }
        })

        console.log(projectedMessages)
        
        return res.json(projectedMessages)

    }
    catch(err){
        console.log(err)
        next(err)
    }
}