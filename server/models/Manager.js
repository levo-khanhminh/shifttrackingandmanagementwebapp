const mongoose = require("mongoose");
const ManagerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { collection: "Manager" }
);
const Manager = mongoose.model("Manager", ManagerSchema);
module.exports = Manager;
