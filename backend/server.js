require('dotenv').config()
// this is the index.js 
const express = require('express');
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts');

// express app
const app = express();


//middleware
app.use(express.json()) // any req that comes in ,it looks for json and parses that in the req onj
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next();
})

//routes 
// attaches all routes to app 
app.use('/api/workouts', workoutRoutes); 

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then((v)=> {
        // listen for requests 
        app.listen(process.env.PORT, () => {
        console.log("connected to db & LISTENING ON PORT: ", process.env.PORT)
        })
    })
    .catch((e) => {
        console.log("error: ", e)
    })




