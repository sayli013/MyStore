
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host :'localhost',
    user: "root",
    password:'Sagar@2606#',
    database: 'products'
})

connection.connect((error,data)=>{
    console.log(data,"ngxfghjbkl")
    if(error){
        console.log("error in connectig database", error);
        return;  
    }

    console.log("Connected to mySQL db");
    
})
const getConnectionObj=async ()=>{
    return connection;
}
module.exports={ getConnectionObj}

