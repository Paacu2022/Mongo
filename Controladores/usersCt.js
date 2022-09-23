const securePass= require ("../helpers/securepass")
const User= require ("../Esquemas/EsquemaUsuarios")

function getLoginForm (req, res,next){
    res.render ("loginform")
}

async function sendLoginForm (req, res,next){
   const {email, pass} = req.body
   const user = await User.find().where({email})
   if (!user.length){
    return res.render ("loginForm", {message:"Usuario o contraseña incorrecta"})
   }
   if (await securePass.decrypt(pass, user[0].contraseña)){
    req.session.user= `${user[0].nombre} ${user[0].apellido}`
            res.render("secret", { user: req.session.user})
   } else return res.render ("loginForm", {message:"Usuario o contraseña incorrecta"})
}

function getRegisterForm (req, res,next){
    res.render ("registerform")
}

async function sendRegisterForm (req, res,next){
    const {name, lastName, email, pass}= req.body
    const hashedpass = await securePass.encryp (pass)
    const newUser = new User({
    nombre: name, apellido: lastName, email, contraseña: hashedpass 
    })
    newUser.save((err)=>{
        if (!err) {
            req.session.user= `${name} ${lastName}`
            res.render("secret", { user: req.session.user})
        }else {
            res.render("registerform", { message: "Ya existe un registro con ese email"})
        }
    } )
}

function logout (req, res){
    req.session.destroy()
    res.redirect("/")
}

module.exports= {getLoginForm, sendLoginForm, getRegisterForm, sendRegisterForm, logout}
