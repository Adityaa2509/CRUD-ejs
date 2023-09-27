const mongoose = require('mongoose');
require('dotenv').config();
exports.connect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{console.log("DatabAse Connected Succesffuly")})
    .catch((err)=>{
        console.log("DB cONNECTION iSSUE");
        console.error(err);
        process.exit(1);
    })
}