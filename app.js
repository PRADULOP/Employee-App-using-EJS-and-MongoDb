require('dotenv').config();  
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router/router');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');
require('./db/connection');
app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
