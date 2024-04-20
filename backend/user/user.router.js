const express = require("express");
const { UserCreate, UserSignIn } = require("./user.controller");

const UserRouter = express.Router();

UserRouter.post("/", UserCreate);
UserRouter.post("/signin", UserSignIn)

module.exports = {
  UserRouter
}