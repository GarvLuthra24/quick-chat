const router = require("express").Router();
const userController = require("../controller/usersController")

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/set-avatar",userController.setAvatar)
router.post("/get-contacts" , userController.getContacts)


module.exports = router