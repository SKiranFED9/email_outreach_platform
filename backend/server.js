const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes/routes')

const cors = require('cors')

const cookieParser = require('cookie-parser')

const app = express()

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