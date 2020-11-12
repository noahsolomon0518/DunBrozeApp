const express = require('express')
const router = express.Router()
const passport = require('passport')
const checkAuthenticated = require('../util/authentication.js').checkAuthenticated
const checkNotAuthenticated = require('../util/authentication.js').checkNotAuthenticated
const checkAdmin = require('../util/authentication.js').admin
//Clients home page. Can see list of jobs, active jobs, and general status of jobs.

router.get('/',(req,res) => {
	res.redirect('/home')
})


router.get('/home', checkAdmin,checkAuthenticated, (req,res) => {
	console.log(req.session)
	res.render('index.ejs', {username: req.session.username})
})


module.exports = router
