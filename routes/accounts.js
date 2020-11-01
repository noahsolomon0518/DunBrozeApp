const express = require('express')
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
		users.push({
			id: Date.now().toString(),
			name: req.body.name,
			username: req.body.username,
			password: hashedPassword
		})
		res.redirect("/account/login")
	}catch(e){
		console.log(e)
	}
	
	console.log(users)
})

module.exports = router
