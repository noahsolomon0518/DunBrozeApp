const home = require('./routes/home')
const express = require('express')
const app = express()
const port = 3000
const users = []
const bcrypt = require('bcrypt')
const initPassport = require('./config/passport.js')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const router = express.Router()
const account = require('./routes/accounts.js')
const checkAuthenticated = require('./util/authentication.js').checkAuthenticated
const checkNotAuthenticated = require('./util/authentication.js').checkNotAuthenticated

initPassport(passport, 
	username => users.find(user=> user.username === username),
	id => users.find(user=> user.id === id)

)
app.set('view-engine','ejs')
app.use(session({secret:"hello",resave: false, saveUninitialized: false}))
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use('/',home)
app.use('/account',account)


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

