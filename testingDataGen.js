const dbConfig = require('./config/dbConfig')
mysql =  require('mysql')
con = mysql.createConnection(dbConfig)

userIds = []
jobID = 0
partID = 10
initJobs = function(){
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
}


initChecklists = function(){
    checklistItems = ["debir", "set up machine", "cut metal", "use lave", "clean machine"]
    for(z = 0; z<5; z++){
        con.query("INSERT INTO checklistItem(checklistItemActivity) VALUES("+ checklistItems[z]+")",(err,job)=>{
            
        })

    }
}
test = function(){
    con.query("SELECT * FROM clients", (err,result1)=>{
        clientID = result1[0].clientID
        con.query("SELECT * FROM jobs where clientID = "+clientID, (err, result2)=>{
            console.log(clientID)
        })
    })

}

test()