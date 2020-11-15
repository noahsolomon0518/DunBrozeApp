
//When accessing /client/:clientID verifies you are indeed the user or admin
const verifyClientID = (req,res, next)=>{
    try{
      clientID = req.session.passport.user
      if((clientID == req.params.clientID) || (clientID==3)){
        next()
      }else{
        res.redirect('/login')
      }
  
    }catch{
      res.redirect('/login')
    }
  }



function verifyAuthenticated(req, res, next) {
if (req.isAuthenticated()) {
    return next()
}

res.redirect('/login')
}



//When logging in check if authenticated. If so redirect to client homepage
function checkNotAuthenticated(req, res, next) {
if (req.isAuthenticated()) {
    return res.redirect('/client')
}
next()
}




module.exports = {
    verifyClientID:verifyClientID ,
    checkNotAuthenticated:checkNotAuthenticated,
    verifyAuthenticated:verifyAuthenticated
}