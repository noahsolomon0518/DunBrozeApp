const express = require('express')
const router = express.Router()
const passport = require('passport')
const checkNotAuthenticated = require('../util/authentication.js').checkNotAuthenticated



router.get('/login',checkNotAuthenticated, (req,res) => {
	res.render('clientLogin.ejs')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local',{
	successRedirect: '/client',
	failureRedirect: '/account/login',
	failureFlash: true
}))


router.post('/logout', (req,res)=>{
	req.logout()
	res.redirect('/account/login')
})







module.exports = router
