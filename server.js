//Libraries
const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

//Path to modules
const initPassport = require('./config/passport.js')
const client = require('./routes/client')
const login = require('./routes/login.js')
const admin = require('./routes/admin.js')

//Middleware
initPassport(passport)
app.set('view-engine','ejs')
app.use(session({secret:"hello",resave: false, saveUninitialized: false}))
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

//Init routes
app.use('/client',client)
app.use('/',login)
app.use('/admin',admin)


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

