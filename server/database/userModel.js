const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4 for generating unique IDs

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4, // Generate a unique id using uuidv4
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Added image field
    },
    createdBy: {
      type: String,
      enum: ["google", "manual", "github", "tiktok", "instagram"],
      default: "manual",
      required: true,
    },
  },
  { timestamps: true }
);

// Hash the password before saving it
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// You can still use 'id' directly in your response, no need for virtuals

const User = model("User", UserSchema);

module.exports = User;
