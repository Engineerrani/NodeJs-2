// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/e-comm')

//*****for mysql */
const mysql = require('mysql');
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'
});
con.connect((err)=>{
    if(err){
        console.log("error is connection")
    }
});

module.exports = con;