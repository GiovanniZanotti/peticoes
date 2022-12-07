const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env['mongodb'], {dbName: process.env['peticao']});
mongoose.Promise = global.Promise;

module.exports = mongoose;