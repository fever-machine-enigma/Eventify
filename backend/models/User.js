const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  pwd: {
    type: String,
    require: true,
    minLength: 6,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
