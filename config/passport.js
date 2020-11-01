
const passport = require('passport')
const LocalStrat = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function init(passport, getUserByUsername, getUserById){
	console.log("Hello")
	const authenticateUser = async (username, password, done) => {
		const user = getUserByUsername(username)
		console.log(username, password)
		if(user==null){
			console.log("No user with this username")
			return done(null,false,{message:'No user with this username'})

		}
		try{
			if(await bcrypt.compare(password, user.password)){
				return done(null,user)
			}else{
				console.log("password incorrect")
				return done(null, false, {message: 'password incorrect'})
			}
		}catch(e){
			console.log(e)
			return done(e)
		}
	}
	passport.use(new LocalStrat({usernameField: 'username', passwordField: 'password'}, 
	authenticateUser))
	passport.serializeUser((user, done) => done(null, user.id))
  	passport.deserializeUser((id, done) => {
    		return done(null, getUserById(id))
  	})
}
module.exports = init
