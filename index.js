//1. import express
const express = require('express')

//import jsonwebtoken
const jwt = require('jsonwebtoken')

//import cors
const cors = require('cors')

//import dataservices
const dataService = require('./services/data.service')

//2.server app creation using express
const app = express()

//cors use in  server app
app.use(cors({
    origin: 'http://localhost:4200'
}))

//parse JSON data
app.use(express.json())



//bank server

const jwtMiddleware = (req, res, next) => {

    try {
        //fetch token
        token = req.headers['x-access-token']
        //verify token
        const data = jwt.verify(token, 'supersecretkey12345')
        console.log(data);
        req.currentAcno = data.currentAcno
        console.log(token);
        next()
    }
    catch {
        res.status(401).json({
            status: false,
            statusCode: 401,
            message: 'please log in'
        })
    }

}

app.post('/register', (req, res) => {
    //register solving    //asynchronous
    dataService.register(req.body.username, req.body.acno, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)

        })
})

app.post('/login', (req, res) => {
    //login solving - asynchronous
    dataService.login(req.body.acno, req.body.pswd)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/addEvent',jwtMiddleware,(req,res)=>{
    //asynchronous
    dataService.addEvent(req,req.body.date,req.body.ed)
    .then(result=>{
        res.status(result.statusCode).json(result)
})
})

app.post('/getEvent',jwtMiddleware,(req,res)=>{
    dataService.getEvent(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
})
})






app.listen(3001,()=>{
    console.log("server started at 3001");
})

