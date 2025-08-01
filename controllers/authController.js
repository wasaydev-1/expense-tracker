const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already in use" });

    const user = await User.create({ username, email, password });
    const token = createToken(user._id);

    res.status(201).json({ message: "User registered", token });
  } catch (err) {
    res.status(500).json({ message: "Signup error", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = createToken(user._id);
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};
