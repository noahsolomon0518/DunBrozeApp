const express = require('express')
const router = express.Router()
const mysql  = require('mysql')
const dbConfig = require('../config/dbConfig.js')

const verifyAuthenticated = require('../util/clientAuth.js').verifyAuthenticated
const verifyClientID = require('../util/clientAuth.js').verifyClientID
const checkAdmin = require('../util/adminAuth.js').checkAdmin



//Clients home page. Can see list of jobs, active jobs, and general status of jobs.
con = mysql.createConnection(dbConfig)

router.get('/', checkAdmin,verifyAuthenticated, (req,res) => {
	res.redirect('/client/'+req.session.passport.user)
})


router.get('/:clientID', verifyClientID, (req,res) => {
	res.render('client/home.ejs')
})


module.exports = router