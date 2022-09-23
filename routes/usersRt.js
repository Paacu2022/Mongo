const { getLoginForm, sendLoginForm, getRegisterForm, sendRegisterForm, logout } = require("../Controladores/usersCt")

const router= require("express").Router()


router.get("/login", getLoginForm ) 
router.post("/login", sendLoginForm) 
router.get("/register", getRegisterForm ) 
router.post("/register", sendRegisterForm) 
router.get("/logout", logout)



module.exports=router 