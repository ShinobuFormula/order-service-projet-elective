"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
require('dotenv').config();
//const mongoUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
var mongoUrl = "mongodb://" + process.env.MONGO_DB_HOST + ":" + process.env.MONGO_DB_PORT + "/" + process.env.MONGO_DB_NAME + "?readPreference=primary&authSource=admin&appname=MongoDB%20Compass&ssl=false";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('MongoDB connected');
});
exports["default"] = db;
