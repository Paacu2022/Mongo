const bcrypt = require ("bcrypt")
const saltRnd = 10

const encryp= async(pass)=>{
    return await bcrypt.hash(pass, saltRnd)   
}

const decrypt= async(pass, hashedpass)=>{
    return await bcrypt.compare(pass, hashedpass)
}

module.exports={encryp, decrypt}



