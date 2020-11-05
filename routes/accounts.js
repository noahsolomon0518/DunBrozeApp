const express = require('express')
const insertUser = require('../db/authentication').insertUser
const bcrypt = require('bcrypt')
const router = express.Router()
const passport = require('passport')
const checkAuthenticated = require('../util/authentication.js').checkAuthenticated
const checkNotAuthenticated = require('../util/authentication.js').checkNotAuthenticated
router.get('/login',checkNotAuthenticated, (req,res) => {
	res.render('login.ejs')
	
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local',{
	successRedirect: '/home',
	failureRedirect: '/account/login',
	failureFlash: true
}))



router.get('/register',checkNotAuthenticated, (req,res) => {
	
	res.render('register.ejs')
})

router.post('/register', checkNotAuthenticated, async(req,res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		user = {
			clientID: Date.now().toString(),
			company: req.body.name,
			username: req.body.username,
			password: hashedPassword
		}
		await insertUser(user)
		res.redirect("/account/login")
	}catch(e){
		console.log(e)
	}
	
})

module.exports = router
