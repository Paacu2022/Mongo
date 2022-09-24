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
    const usr= {
        id: user[0]._id,
        name: user[0].nombre,
        lastName: user[0].apellido
    }

    req.session.user= usr
       res.render("secret", { user: `${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user.id})     
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
    const usr= {
        id: newUser._id,
        name: newUser.nombre,
        lastName: newUser.apellido
    }
    newUser.save((err)=>{
        if (!err) {
            req.session.user= usr
            res.render("secret", { user: `${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user.id}) 
        }else {
            res.render("registerform", { message: "Ya existe un registro con ese email"})
        }
    } )
}

async function getSettings (req, res){   
    const user = await User.findById(req.session.user.id).lean()
    return res.render ("editUserForm", {user})
}



async function sendSettings (req, res){
    try{  
    await User.findByIdAndUpdate (req.session.user.id, {nombre: req.body.name, apellido: req.body.lastName, email:req.body.email})
    res.redirect ("/secret")
} catch (err){
    res.render ("/editUserForm", {message: "Ocurrio un error, intenta nuevamente"})
}
}

async function deleteUser (req, res){
    try{
        await User.findByIdAndDelete (req.session.user.id)
        req.session.destroy()
        res.redirect ("/")
    } catch (err){
        res.render ("/editUserForm", {message: "Ocurrio un error, intenta nuevamente"})
    }
    }




async function validateEmail (req, res){
    res.send("email verificacion en base de datos")
}


function logout (req, res){
    req.session.destroy()
    res.redirect("/")
}

module.exports= {getLoginForm, sendLoginForm, getRegisterForm, sendRegisterForm, logout, getSettings, validateEmail, sendSettings, deleteUser}
