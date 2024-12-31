const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    role: {
      type: String,
      enum: ["MANAGER", "STAFF"],
      default: "STAFF",
    },
  },
  { collection: "User" }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
