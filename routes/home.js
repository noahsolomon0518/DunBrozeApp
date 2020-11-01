const express = require('express')
const router = express.Router()
const passport = require('passport')
const checkAuthenticated = require('../util/authentication.js').checkAuthenticated
const checkNotAuthenticated = require('../util/authentication.js').checkNotAuthenticated
router.get('/',(req,res) => {
	res.redirect('/home')
})


router.get('/home',checkAuthenticated, (req,res) => {
	res.render('index.ejs', {name: "Noah"})
})


module.exports = router
