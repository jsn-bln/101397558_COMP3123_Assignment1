const express = require("express");
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')

require('dotenv').config();


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

const uri = process.env.URI

mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}); 
const db = mongoose.connection;
db.once('open', () => {
    console.log("Connected to MongoDb!")
})



app.use('/api/v1/user', userRoutes);


app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`))