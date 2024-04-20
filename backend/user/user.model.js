const mongoose = require("mongoose");

const UserObject = {
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}

const UserSchema = new mongoose.Schema(UserObject);

const UserModel = new mongoose.model('User', UserSchema);

module.exports = {
  UserObject,
  UserSchema,
  UserModel
}