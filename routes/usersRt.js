const { getLoginForm, sendLoginForm, getRegisterForm, sendRegisterForm, logout, getSettings, validateEmail, sendSettings, deleteUser } = require("../Controladores/usersCt")
const router= require("express").Router()
const autentificado= require ("../helpers/auth")

router.get("/login", getLoginForm ) 
router.post("/login", sendLoginForm) 
router.get("/register", getRegisterForm ) 
router.post("/register", sendRegisterForm) 
router.get("/logout", logout)
router.get("/settings",autentificado, getSettings )
router.post ("/settings",autentificado, sendSettings)
router.get("/validate",autentificado, validateEmail)
router.get("/delete",autentificado, deleteUser)



module.exports=router 