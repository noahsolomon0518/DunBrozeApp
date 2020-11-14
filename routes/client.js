const express = require('express')
const { checkAuthenticated } = require('../util/authentication.js')
const router = express.Router()
const mysql  = require('mysql')
const dbConfig = require('../config/dbConfig.js')
const verifyClientID = require('../util/authentication.js').verifyClientID
const checkAdmin = require('../util/authentication.js').admin
//Clients home page. Can see list of jobs, active jobs, and general status of jobs.
con = mysql.createConnection(dbConfig)

router.get('/', checkAdmin,checkAuthenticated, (req,res) => {
	con.query("SELECT company FROM clients WHERE clientID="+req.session.passport.user,(err,result)=>{
		console.log(result)
		res.redirect('/client/'+result[0].company)
	})
})


router.get('/:company', verifyClientID, (req,res) => {
	res.render('clientHome.ejs', {company: req.params.company})
})


module.exports = router