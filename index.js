const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
var cors = require("cors");
require("dotenv").config();

const expressLayout = require('express-ejs-layouts');


app.use(expressLayout);
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(cors())
app.use('/',require('./routes'))
app.use(express.static('./assets')) // for getting static
app.set('layout extractStyles',true);
app.set('layout extractScripts',true)
app.set('view engine','ejs');
app.set('views','./views')
const db = require('./config/mongoose')




app.listen(port,function(err){
    if(err){
        console.log(`error in running the ${port}`)
        return;
    }
    console.log(`Server is running @ ${port}`)
})