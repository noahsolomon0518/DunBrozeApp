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
	jobID = req.params.jobID
	con.query("SELECT * FROM jobs where jobID = "+ jobID, (err,job)=>{
		con.query("SELECT * FROM checklist JOIN checklistItem ON checklist.checklistItemID = checklistItem.checklistItemID WHERE checklist.jobID ="+jobID, (err,checklist)=>{
			completedMinutes = 0
			totalMinutes = 0
			for(i = 0; i<checklist.length; i++){
				if(checklist[i].status == 2){
					completedMinutes+=checklist[i].timeEstimate
				}
				totalMinutes += checklist[i].timeEstimate
	
			}
			completion = completedMinutes/totalMinutes
			res.render('admin/job.ejs', {job:job[0],checklist:checklist, completion:completion})
		})

	})
    
})

module.exports = router