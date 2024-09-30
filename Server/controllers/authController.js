const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../utils/authToken");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
};

exports.verifyToken = async (req, res) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized - Missing Token" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid Token Format" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }

  res.status(200).json({ message: "Token verified successfully", decoded });
};
