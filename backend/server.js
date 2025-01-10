const express = require('express')
const mongoose = require('mongoose')

const nodemailer = require ('nodemailer')

const multer = require('multer')

const bodyParser = require('body-parser')

const routes = require('./routes/routes')

const cors = require('cors')

const cookieParser = require('cookie-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var to;
var subject;
var body;
var path;

var storage = multer.diskStorage({
    destination: function(req,file, callback) {
        callback(null, './images')
    },
    filename: function(req, file, callback) {
        callback(null, file.filename + "_" + Date.now() + "_" + file.originalname)
    }
})

var upload = multer({
    storage: storage
}).single('image');

app.post('/sendmail', (req, res) =>{

    upload(req, res, function(err) {
        if(err){
            console.log(err)
            return res.end("something went wrong")
        }
        else {
            to = req.body.to
            subject = req.body.subject
            body = req.body.body

            path = req.file.path

            console.log(to)
            console.log(subject)
            console.log(body)
            console.log(path)

        }
    })

})

app.use(cors({
    credentials: true,
    origin:['http://localhost:4200']
}))

app.use(cookieParser())

app.use(express.json())

app.use("/api",routes)

mongoose.connect("mongodb://localhost:27017/jwtproject")
.then(() =>{
    console.log("connected to database")
    app.listen(5000,() =>{
        console.log("App is liestening port 50000")
    })
})



// },() => {
//     console.log("connected to database")
//     app.listen(5000,() =>{
//         console.log("App is liestening port 50000")
//     })
// })
// const mongoURI = "mongodb://localhost/loginData"
// app.use(express.urlencoded({extended:true}))

// mongoose.connect(mongoURI)
// mongoose.connection('open', () =>{
//     console.log('database connected successfully');
// })

// app.listen(3000, (err) =>{
//     if(!err) {
//         console.log('App listening....')
//     }
// })