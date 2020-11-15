const dbConfig = require('./config/dbConfig')
mysql =  require('mysql')
con = mysql.createConnection(dbConfig)

userIds = []
jobID = 0
partID = 10

con.query("SELECT clientID, company from clients", (err,res)=>{
    console.log(res)
    for(i=0;i<res.length; i++){

        for(x=0; x<10; x++){
            con.query(`INSERT INTO jobs values(${jobID},\"${res[i].company}\",${res[i].clientID}, ${partID}, NOW() )`)
            jobID+=7
            partID+=31
        }
    }
    console.log("Mock data success")
})

