const express = require('express')
const router = express.Router()
const checkClientID = require('../util/authentication.js').checkClientID
const checkAdmin = require('../util/authentication.js').admin
//Clients home page. Can see list of jobs, active jobs, and general status of jobs.

router.get('/',(req,res) => {
	res.redirect('/home')
})


router.get('/:company', checkClientID, (req,res) => {
	res.render('clients.ejs', {company: req.params.company})
})


module.exports = router