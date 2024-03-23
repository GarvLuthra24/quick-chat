const router = require("express").Router();
const messageController = require('../controller/messageController')

router.get('/hi' , (req , res , next )=> {return res.json({message:"hi"})})

router.post("/add-message", messageController.addMessage)
router.post("/get-message", messageController.getMessages)



module.exports = router