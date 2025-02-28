const jwt = require("jsonwebtoken"); // Importing jwt for token generation
const bcrypt = require("bcryptjs"); // Import bcrypt to hash the password
const User = require("../database/userModel");
const { v4: uuidv4 } = require("uuid"); // Import User model

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
      providerEmail: uuidv4,
    });

    // Save user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // res.cookie("user_2225", token, {
    //   maxAge: 86400000, // 1 day in milliseconds
    //   httpOnly: true, // Prevent JavaScript access
    //   secure: process.env.NODE_ENV === "production",
    //   // sameSite: "Lax", // CSRF protection
    // });
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
    const user = await User.findOne({ email, provider: "manual" });
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
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    // res.cookie("user_2225", token, {
    //   maxAge: 86400000, // 1 day in milliseconds
    //   httpOnly: true, // Prevent JavaScript access
    //   secure: process.env.NODE_ENV === "production",
    //   // sameSite: "Lax", // CSRF protection
    // });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
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

const getProfileInfo = async (req, res, next) => {
  try {
    const userId = req.user?.id; // Extract user ID from the request

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user found" });
    }

    // Fetch user profile from MongoDB using Prisma
    const user = await User.findOne({ id: userId })
      .select("-password -_id -id -__v -createdAt -updatedAt")
      .lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Profile Found", data: user }); // Send user data as response
  } catch (error) {
    console.error("Error fetching profile:", error);
    next(error);
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
  TokenVerification,
  getProfileInfo,
};
