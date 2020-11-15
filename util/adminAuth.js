
const verifyAdmin = (req,res, next)=>{
    try{
      clientID = req.session.passport.user
      if(clientID == 3){
        next()
      }else{
        res.redirect('/login')
      }
  
    }catch{
      res.redirect('/login')
    }
  }


//If logging in and have admin id then go to admin home page
const checkAdmin = (req,res, next)=>{
try{
    clientID = req.session.passport.user
    if(clientID == 3){
    res.redirect('/admin')
    }else{
    next()
    }
}
catch{
    next()
}

}



module.exports = {
    checkAdmin:checkAdmin,
    verifyAdmin:verifyAdmin
}