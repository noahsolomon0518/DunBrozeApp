const clients = require('./routes/client')
const express = require('express')
const app = express()
const port = 3000
const initPassport = require('./config/passport.js')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const account = require('./routes/accounts.js')
const admin = require('./routes/admin.js')


initPassport(passport)
app.set('view-engine','ejs')
app.use(session({secret:"hello",resave: false, saveUninitialized: false}))
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use('/clients',clients)
app.use('/account',account)
app.use('/admin',admin)


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

