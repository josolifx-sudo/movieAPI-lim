const bcrypt = require("bcrypt");
const User = require("../models/User");
const { createAccessToken } = require("../auth");

async function register(req, res) {
  try {
    const { email, password, isAdmin } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).send({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashed,
      isAdmin: !!isAdmin
    });

    return res.status(201).send({ message: "Registered Successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const token = createAccessToken(user);

    
    return res.status(200).send({ access: token });
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  }
}

module.exports = { register, login };