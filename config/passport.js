
const passport = require('passport')
const LocalStrat = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const getUserByUsername = require('../db/authentication.js').getUser

function init(passport, getUserById){
	console.log("Hello")
	const authenticateUser = async (username, password, done) => {
		getUserByUsername(username).then(async (user)=>{
			console.log(user)
			console.log(username, password)
			if(user==[]){
				console.log("No user with this username")
				return done(null,false,{message:'No user with this username'})

			}
			try{
				console.log("type password="+password)
				console.log(user)
				console.log("actual password="+user[0].password)
				if(await bcrypt.compare(password, user[0].password)){
					return done(null,user)
				}else{
					console.log("password incorrect")
					return done(null, false, {message: 'password incorrect'})
				}
			}catch(e){
				console.log("some type of error")
				console.log(e)
				return done(e)
			}
		})
	}
	passport.use(new LocalStrat({usernameField: 'username', passwordField: 'password'}, 
	authenticateUser))
	passport.serializeUser((user, done) => done(null, user.clientID))
  	passport.deserializeUser((id, done) => {
    		return done(null, getUserById(id))
  	})
}
module.exports = init
