"use strict";

const logger = require("../../config/logger");
const User = require("../../model/User");

const output = {
  home: (req, res) => {
    logger.info(`GET / 200 "home 화면으로 이동"`);
    res.render("home/index"); 
  },
  login: (req, res) => {
    logger.info(`GET / 200 "login 화면으로 이동"`);
    res.render("home/login"); 
  }, 
  register: (req, res) => {
    logger.info(`GET / 200 "register 화면으로 이동"`);
    res.render("home/register");
  }
}

const process = {
  login: async (req, res) => {
    const user = new User(req.body)
    const response = await user.login();
    if (response.err) {
      logger.error(`POST /login 200 Response: "success: ${response.success}, ${response.err}"`)
    } 
    else {
      logger.info(
        `POST /login 200 Response: "success: ${response.success}, msg: ${response.msg}"`
      )
    }
    return res.json(response);
  },
  register: async (req, res) => {
    const user = new User(req.body)
    const response = await user.register();
    if (response.err) {
      logger.error(`POST /login 200 Response: "success: ${response.success}, ${response.err}"`)
    } 
    else {
      logger.info(
        `POST /register 200 Response: "success: ${response.success}, msg: ${response.msg}"`
      )
    }
    return res.json(response);
  },
}

module.exports = {
  output,
  process,
}