const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { Session } = require('inspector');
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

require('dotenv').config();
app.use(express.static('uploads'))
const PORT = process.env.PORT || 4000;
app.use(express.json());
require("./config/database").connect();






//app.get("/",(req,resp)=>{resp.send("Hello Ji!!")})

app.use("/",require('./routes/route'));



app.listen(PORT,()=>{
    console.log(`Server Started Successfully at ${PORT} Port`);
});