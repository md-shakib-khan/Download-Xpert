const jwt = require("jsonwebtoken"); // Importing jwt for token generation
const bcrypt = require("bcryptjs"); // Import bcrypt to hash the password
const User = require("../database/userModel"); // Import User model

// Secret key for JWT signing (store securely in .env)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register a new user
const RegisterUser = async (req, res, next) => {
  try {
    const { name, email, password, provider } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email, createdBy: provider });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password, // Password will be hashed automatically via pre-save hook
      createdBy: "manual", // As the registration is manual
    });

    // Save user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Login an existing user
const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email, createdBy: "manual" });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Authenticate user via external providers (e.g., Google, Facebook)
const AuthByProviders = async (req, res, next) => {
  try {
    const { name, email, image, provider } = req.body;

    // Check if the user already exists (based on email)
    let user = await User.findOne({ email, createdBy: provider });
    if (!user) {
      // If no user, create a new user with the provider's data
      user = new User({
        name,
        email,
        image,
        createdBy: provider, // Set the provider as the source of registration
      });

      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

const TokenVerification = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User is authenticated",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
  AuthByProviders,
  TokenVerification,
};
