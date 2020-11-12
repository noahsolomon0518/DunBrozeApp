const dbConfig = require("../config/dbConfig")

const mysql = require("mysql")
const con = mysql.createConnection(dbConfig)



function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/account/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/home')
  }
  next()
}



const admin = (req,res, next)=>{
  try{
    clientID = req.session.passport.user
    if(clientID == 3){
      res.redirect('/admin/home')
    }else{
      next()
    }
  }
  catch{
    next()
  }
  
}

const verifyAdmin = (req,res, next)=>{
  try{
    clientID = req.session.passport.user
    if(clientID == 3){
      next()
    }else{
      res.redirect('/account/login')
    }

  }catch{
    res.redirect('/account/login')
  }
}



const verifyClientID = (req,res, next)=>{
  try{
    clientID = req.session.passport.user
    if(clientID == req.params.clientID || clientID==3){
      next()
    }else{
      res.redirect('/account/login')
    }

  }catch{
    res.redirect('/account/login')
  }
}


module.exports.admin = admin
module.exports.verifyAdmin = verifyAdmin
module.exports.verifyClientID = verifyClientID
module.exports.checkAuthenticated = checkAuthenticated
module.exports.checkNotAuthenticated = checkNotAuthenticated
