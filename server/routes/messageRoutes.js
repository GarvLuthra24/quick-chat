const router = require("express").Router();
const messageController = require('../controller/messageController')

router.post("/add-message", messageController.addMessage)
router.post("/get-message", messageController.getMessages)



module.exports = router