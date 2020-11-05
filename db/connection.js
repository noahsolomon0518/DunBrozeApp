const mysql = require('mysql')
const dbConfig = require('../config/dbConfig.js')

module.exports = function(command, callback){
	con = mysql.createConnection(dbConfig)
	con.query(command, (err,res)=>{
		return callback(err,res)
	})
}
