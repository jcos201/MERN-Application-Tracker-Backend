const express = require('express');
const logger = require('morgan');
const app = express();

require('dotenv').config();
require('./config/database');

app.use(logger('dev'));
app.use(express.json());
app.use(require('cors')());
app.use(require('./config/auth'));

app.use('/users', require('./routes/users'));

const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Express is listening on port ${port}`)
})