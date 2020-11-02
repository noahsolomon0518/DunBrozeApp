module.exports = async() => {
	const mysql = require('mysql')
	const dbConfig = require('../config/dbConfig.js')
	const con = mysql.createConnection(dbConfig)
	return await con.connect()
		
}
