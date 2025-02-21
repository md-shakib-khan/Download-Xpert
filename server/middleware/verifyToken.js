const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use a secure, environment-specific secret key

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  // Get the token from the Authorization header (Bearer token)
  const token = req.headers["authorization"]?.split(" ")[1]; // Assumes "Bearer <token>"

  // If no token is provided, respond with an error
  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  // Verify the token using the secret key
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Token is valid, attach the decoded information to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  });
}

module.exports = verifyToken;
