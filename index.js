require ("./Configuraciones/mongo")
const express = require ("express")
const hbs = require ("express-handlebars")
const app= express()
const session = require ("express-session")
const autentificado= require ("./helpers/auth")

app.listen(3000, err =>{
    !err? console.log("Servidor corriendo en http://localhost:3000"): console.log(err);;
})

app.use(session ({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.engine (".hbs", hbs.engine ({ extname: "hbs"}))
app.set("view engine", "hbs")
app.set ("views", "./views")

app.use (express.static ("public"))
app.use(express.json());
app.use(express.urlencoded({extended: false}))



app.get("/", (req, res)=>{
    res.render ("home", {user: req.session.user})
})

app.get("/noAuth", (req, res)=>{
    res.render("noAuth")
})



app.get("/secret", autentificado, (req, res)=>{
    res.render("secret", {user: `${req.session.user.name} ${req.session.user.lastName}`})
})
app.use("/users", require("./routes/usersRt")) 
