const mysql = require('mysql')
const passport = require('passport')
const LocalStrat = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const dbConfig = require('./dbConfig.js')
const { user } = require('./dbConfig.js')
const con = mysql.createConnection(dbConfig)



function init(passport){
	const authenticateUser = (username, password, done) => {
		con.query("SELECT * FROM clients WHERE username = "+"\""+username+"\"",async(err,user) => {
			try{
				console.log(user)
				if(await bcrypt.compare(password, user[0].password)){

					return done(null,user[0])
				}else{
					return done(null, false, {message: 'password incorrect'})
				}
			}catch(e){
				return done(null,false,{message:'No user with this username'})
			}
		})
	}
	passport.use(new LocalStrat({usernameField: 'username', passwordField: 'password'}, 
	authenticateUser))
	passport.serializeUser((user, done) => done(null, user.clientID))
  	passport.deserializeUser((id, done) => {
		console.log(id)
		con.query("SELECT * FROM clients WHERE clientID = \""+id+"\"", (err,user)=>{
			return done(null, user[0])
		})
  	})
}
module.exports = init
