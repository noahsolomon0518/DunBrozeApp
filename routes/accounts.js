const express = require('express')
const bcrypt = require('bcrypt')
const mysql = require('mysql')
const dbConfig = require('../config/dbConfig.js')
const router = express.Router()
const passport = require('passport')
const checkNotAuthenticated = require('../util/authentication.js').checkNotAuthenticated
const checkAuthenticated = require('../util/authentication.js').checkAuthenticated
const checkAdmin = require('../util/authentication.js').admin
const verifyAdmin = require('../util/authentication.js').verifyAdmin
const con = mysql.createConnection(dbConfig)
router.get('/login',checkNotAuthenticated, (req,res) => {
	res.render('login.ejs')
	
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local',{
	successRedirect: '/home',
	failureRedirect: '/account/login',
	failureFlash: true
}))





router.post('/logout', (req,res)=>{
	req.logout()
	res.redirect('/account/login')
})







module.exports = router
