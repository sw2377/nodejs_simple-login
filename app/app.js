"use strict";

// module
const express = require("express");
const app = express();

// routing
const home = require("./src/routes/home")

// app 세팅
app.set("views", "./src/views") 
app.set("view engine", "ejs") 

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/", home); 

module.exports = app;