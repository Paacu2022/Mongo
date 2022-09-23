const mongoose=require("mongoose");
const {Schema, model}= require ("mongoose");
const esquemaUsuarios = new Schema({
nombre: {type: String, require: true},
apellido: {type: String, require: true},
email: {type: String, require: true, lowercase: true, trim: true, unique: true},
contraseña: {type: String, require: true}
},
{timestamps: true}
);

const User = model ("Usuario", esquemaUsuarios)

module.exports= User