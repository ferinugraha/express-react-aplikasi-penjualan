const bcrypt = require("bcryptjs");
const { UserModel } = require("./user.model");
const { UserNotExist, ValidatePassword, MakeJWTToken } = require("./user.service");
const { ExceptionHandler } = require("../libs/lib.exception");

async function UserCreate(req, res) {
  try {
    const passwordEncrypted = await bcrypt.hash(req.body.password, 10);
    await UserModel.create({...req.body, password: passwordEncrypted});
    const {password, ...payload} = req.body;
    return res.status(201).json(payload);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res)
  }
}

async function UserSignIn(req, res) {
  try {
    // user service not exist
    const user = await UserNotExist(req.body.email)

    // validate password
    await ValidatePassword(req, user);
    
    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
    // proses pembuatan token
    const token = MakeJWTToken(payload); 

    // return response
    return res.status(200).json({ token })
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res)
  }
}

module.exports = {
  UserCreate,
  UserSignIn,
}