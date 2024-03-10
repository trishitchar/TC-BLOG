import express from 'express';
import Connection from './DB/db.js';
import dotenv from 'dotenv'
dotenv.config()

import bodyParser from 'body-parser';

import cors from 'cors'

const app = express();

import router from './routes/route.js';
app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/',router)


const PORT = 8000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT} `)
})

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASS;

Connection(USERNAME,PASSWORD)