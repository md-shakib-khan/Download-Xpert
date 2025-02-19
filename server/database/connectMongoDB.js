const mongoose = require("mongoose");

const connection = {};

const connectMongoDB = async () => {
  // Check if the database URI is provided
  if (!process.env.MONGO_DB_URI) {
    console.error("MongoDB URI not found in environment variables!");
    process.exit(1);
  }

  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    const instance = await mongoose.connect(process.env.MONGO_DB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    // Use instance.connection.readyState for clarity
    connection.isConnected = instance.connection.readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
};

module.exports = { connectMongoDB };
