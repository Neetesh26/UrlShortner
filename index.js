const express = require('express')
const app = express()
const port = 8001

const { resolve } = require('path')

require('dotenv').config()
const dbconnected = require('./config/db')
const router = require('./routes/urls.routes')
dbconnected()

const staticRoute = require('./routes/staticRoute.routes')

app.set('view engine' , 'ejs')
app.set('views' , resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/url',router)

app.use('/', staticRoute)


app.listen(port , (req,res)=>{
    console.log(`your server is listen on port ${port}`);
    
})