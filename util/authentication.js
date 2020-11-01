
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
module.exports.checkAuthenticated = checkAuthenticated
module.exports.checkNotAuthenticated = checkNotAuthenticated
