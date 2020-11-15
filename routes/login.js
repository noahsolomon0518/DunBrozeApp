const express = require('express')
const router = express.Router()
const passport = require('passport')
const checkNotAuthenticated = require('../util/clientAuth.js').checkNotAuthenticated



router.get('/login',checkNotAuthenticated, (req,res) => {
	res.render('client/login.ejs')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local',{
	successRedirect: '/client', 			//client redirects to admin if admin id
	failureRedirect: '/login',
	failureFlash: true
}))


router.post('/logout', (req,res)=>{
	req.logout()
	res.redirect('/login')
})







module.exports = router
