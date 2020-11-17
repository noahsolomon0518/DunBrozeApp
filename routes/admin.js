const express = require('express')
const mysql = require('mysql')
const dbConfig = require('../config/dbConfig.js')
const router = express.Router()
const { verifyAdmin } = require('../util/adminAuth')
const bcrypt = require('bcrypt')
const con = mysql.createConnection(dbConfig)

router.use(verifyAdmin)
router.get('/', (req,res)=>{
    res.render('admin/home.ejs')
})





router.get('/register', (req,res) => {
	
	res.render('admin/register.ejs')
})

router.post('/register', async (req,res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		user = {
			company: req.body.name,
			username: req.body.username,
			password: hashedPassword
		}


		con.query(`INSERT INTO clients(company, username, password) VALUES( \"${user.company}\", \"${user.username}\", \"${user.password}\")`,(err,result)=>{
			if(err){
				req.flash("error","Username taken")
				res.redirect("/admin/register")
			}
			else{
				req.flash("success","Company was sucessfully registered!")
				res.redirect("/admin")
			}
		})

	}catch(e){
		console.log(e)
	}
	
})


router.get('/clients', (req,res) => {
	con.query("SELECT company,clientID from clients", (err,result)=>{
        res.render('admin/clients.ejs', {result:result})
    })
})



router.get('/clients/:clientID', (req,res) => {
	con.query("SELECT * from jobs where ClientID = "+req.params.clientID, (err,jobs)=>{
        res.render('admin/client.ejs', {jobs:jobs})
    })
})


router.get('/clients/:clientID/:jobID', (req,res) => {
	con.query("SELECT * from jobs where jobID = "+req.params.jobID, (err,job)=>{
		
        res.render('admin/job.ejs', {job:job[0]})
    })
})

module.exports = router