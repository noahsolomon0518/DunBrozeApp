const express = require('express')
const mysql = require('mysql')
const dbConfig = require('../config/dbConfig.js')
const router = express.Router()
const passport = require('passport')
const { verifyAdmin } = require('../util/authentication.js')
const bcrypt = require('bcrypt')
const con = mysql.createConnection(dbConfig)

router.use(verifyAdmin)
router.get('/home', (req,res)=>{
    res.render('adminHome.ejs')
})


router.get('/addJob', (req,res)=>{
    res.render('addJob.ejs')
})

router.post('/addJob', (req,res)=>{
    req.flash('success', 'Job added!')
    res.redirect('/admin/home')
})



router.get('/register', (req,res) => {
	
	res.render('register.ejs')
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
				res.redirect("/account/register")
			}
			else{
				req.flash("success","Company was sucessfully registered!")
				res.redirect("/admin/home")
			}
		})

	}catch(e){
		console.log(e)
	}
	
})


router.get('/clients', (req,res) => {
	con.query("SELECT company,clientID from clients", (err,result)=>{
        console.log(result)
        res.render('clients.ejs', {result:result})
    })
})

module.exports = router