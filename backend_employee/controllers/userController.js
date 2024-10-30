const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    return res.json({ message: "All fields are mandatory" });
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    return res.json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password", hashedPassword);

  // Create the user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created: ${user}`);

  if (user) {
    res.status(201).json({ id: user._id, hashedPassword: user.password });
  } else {
    res.status(500).json({ message: "User could not be created" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
