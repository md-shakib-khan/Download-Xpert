const crypto = require("crypto");
function generateStrongPassword(length = 16) {
  return crypto
    .randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, length);
}

module.exports = generateStrongPassword;
