"use strict";

// module
const express = require("express");
const app = express();

const dotenv = require("dotenv");
const morgan = require('morgan');

dotenv.config(); // 환경변수 세팅

const accessLogStream = require("./src/config/log");

// routing
const home = require("./src/routes/home");

// app 세팅
app.set("views", "./src/views") 
app.set("view engine", "ejs") 

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(morgan("common", { stream: accessLogStream }));

app.use("/", home); 

module.exports = app;