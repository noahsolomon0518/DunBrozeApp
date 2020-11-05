const query = require('./connection.js')

module.exports.getUser = (user)=>{
	return new Promise((resolve,reject)=>{
		query("SELECT * FROM client WHERE username = \""+user+"\"",(err,result)=>{
			resolve(result)
		})
	}) 
}



module.exports.insertUser = (user)=>{
	console.log(user)
	return new Promise((resolve,reject)=>{
		query(`INSERT INTO client VALUES(${user.clientID}, ${user.company}, ${user.username}, ${user.password}) commit`,(err,result)=>{
			console.log("resulted")
			resolve(result)
		})
	}) 
}
