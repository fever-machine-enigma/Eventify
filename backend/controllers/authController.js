const User = require("../models/User");

module.exports.post_register = async (req, res) => {
  const { firstName, lastName, email, pwd } = req.body;

  try {
    const user = await User.create({ firstName, lastName, email, pwd });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send("Error, User was not created.");
  }
};

module.exports.post_login = async (req, res) => {
  const { email, pwd } = req.body;
  console.log(email, pwd);
  res.send(`Welcome ${email}`);
};
