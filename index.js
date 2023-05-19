// const  mongoose = require('mongoose');

// //schema
// mongoose.connect('mongodb://localhost:27017/e-comm');
// const ProductSchema = new mongoose.Schema({
//     name:String,
//     price:Number,
//     brand:String,
//     category:String
// })
// //model
// const saveInDB = async() =>{
// const Product = mongoose.model('products', ProductSchema);
// let data = new Product({name:"m 10",
//  price:1000,
//  brand:"xyz",
//  category:"mobile"
// });                        //create new instances
// const result = await data.save();
// console.log(result);
// }

// const updateInDB = async() =>{
// const Product = mongoose.model('products', ProductSchema);
// let data = await Product.updateOne(
//     {name:"M 40"},
//     {
//         $set:{price:700, name:"MAX"}
//     }
// )
// console.log(data)
// }

// const deleteInDB = async() =>{
// const Product = mongoose.model('products', ProductSchema);
// let data = await Product.deleteOne({name:"MAX"});
// console.log(data)
// }

// const findInDB = async() =>{
// const Product = mongoose.model('products', ProductSchema);
// let data = await Product.find({name:"max 2"});
// console.log(data)
// }
 
// findInDB();


///////////////***************post api with nodejs and mongoose */

// const express = require('express');
// require('./config');
// const Product = require('./product');//import our products, schema already included in which

// const app = express();

//(CRUD api with postman)*it's always require for convert data - string to json
// app.use(express.json());
//we save our data in database always use post method
// app.post('/create', async(req, res)=>{
// let data = new Product(req.body);//req.body se data aa rha hai postman se hmne console krke dekha terminal me
// let result = await data.save()
//     console.log(result)//data shows on terminal
//     res.send(result)//data shows on postman
// });

// app.get('/list', async(req, res)=>{
//     let data = await Product.find()
//     res.send(data)
// })

// app.delete('/delete/:_id', async(req, res)=>{
//   console.log(req.params)   
//  let data = await Product.deleteOne(req.params)
//    res.send(data)
// })

// app.put('/update/:_id', async(req, res)=>{
//   console.log(req.params)   
//  let data = await Product.updateOne(req.params, {$set: req.body}//we update on the basis of id
//     // {name: "m 80"},//condition
//     // {$set{brand:"oppo"}}//update data
//  )
//    res.send(data);
// })

// app.get('/search/:key', async(req,res)=>{
//     console.log(req.params.key)
//     let data = await Product.find(
//         {
//          "$or":[
//             {"name":{$regex:req.params.key}},
//             {"brand":{$regex:req.params.key}},
//             {"category":{$regex:req.params.key}}

//          ]
//         }
//     )
//     res.send(data);
// })

// app.listen(5000)



///////////**upload files */
// const express  =require('express');
// const multer = require('multer');
// const app = express();

// const upload = multer({
//     storage:multer.diskStorage({
//         destination: function (req, file, cb){
//             cd(null, "uploads")
//         },
//         filename: function(req, file, cb){
//             cb(null, file.fieldname + "-" + Date.now() + ".jpg")
//         }
//     })
// }).single("user_file");
// app.post('/upload', upload, (req, res)=>{
//     res.send("file upload")
// });

// app.listen(5000)



///***OS module in nodejs */
// const os = require('os');
// // console.log(os.arch())
// // ...many more funcion on documentation
// console.log(os.platform())
// console.log(os.userInfo())



///**Events and Event Emitter in nodejs */

// events(signal) || event emitter(generate events/something)

// const express = require('express')
// const EventEmitter = require('events');
// const app =express();
// const event = EventEmitter();

// let count = 0

// event.on("countAPI", ()=>{
//     count++;
//     console.log("event called")
// })


// app.get('/', (req ,res)=>{
//     res.send("api called")
//     event.emit("countAPI")
// })

// app.get('/search', (req ,res)=>{
//     res.send("search api called")
// })

// app.get('/update', (req ,res)=>{
//     res.send("update api called")
// })

// app.listen(5000);



///********REPL(READ-EVAL-PRINT-LOOP) */
// node, .editor, .help



////**nodejs with my sql */

// const mysql = require('mysql')

// const con = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:"",
//     database:"test"
// });
// ///*check the connection

// // con.connect((err)=>{
// //     if(err){
// //         console.warn("error")
// //     }
// //     else{
// //         console.warn("connected")
// //     }
// // });
// con.query("select * from users", (err, result) =>{
//     console.warn("result", result)
// })

//****************************************
// nodejs get api with mysql

const express = require('express')
const con = require('./config');
const app = express()

app.use(express.json());//post ke liye jaruri hai

app.get('/', (req, res)=>{
    con.query("select * from users", (err, result)=>{
        if(err){
            res.send("error in api")
        }else{
            res.send(result)
        }
    })
});
//nodejs POST API with MYSQL

app.post('/', (req, res)=>{
const data = req.body;
con.query('INSERT INTO users SET ?', data, (error, results, fields)=>{
    if(error) error;
    res.send(results)
})
})
//nodejs PUT API with MYSQL//update the data on the id:3 
//its statically updated data
// app.put('/', (req, res)=>{
// const data = ["tony","0000",'reader', 'dombivali thane', 3]
// con.query('UPDATE users SET name = ?, password = ?, user_type = ?, user_address = ? where id = ?', data, (err, result, fields)=>{
//  if(err) err;
//     res.send(result);
// });
 
// })

//its dynamically updated data
app.put('/:id', (req, res)=>{
const data = [req.body.name, req.body.password,req.body.user_type,req.body.user_address, req.params.id]
con.query('UPDATE users SET name = ?, password = ?, user_type = ?, user_address = ? where id = ?', data, (err, result, fields)=>{
 if(err) err;
    res.send(result);
});
 
})
//if affectedRows 0 then use this code for insertion
// const data = req.body;
// con.query('INSERT INTO users SET ?', data, (error, results, fields)=>{
//     if(error) error;
//     res.send(results)
// })


//nodejs delete api with mysql
app.delete('/:id', (req, res) =>{
    con.query("DELETE FROM users WHERE id =" + req.params.id,(error, results, fields) =>{
        if(error) throw error;
        res.send(results)
    })
});


app.listen(5000);