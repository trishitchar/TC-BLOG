import express from 'express';
import Connection from './DB/db.js';
import dotenv from 'dotenv'
dotenv.config()

const app = express();

import router from './routes/route.js';
app.use('/',router)


const PORT = 8000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT} `)
})

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASS;

Connection(USERNAME,PASSWORD)