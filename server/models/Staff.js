const mongoose = require("mongoose");
function getFormatDate() {
  const date = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-Us", options);
}

const StaffSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    staffId: { type: String, unique: true },
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
    joiningDate: { type: String, default: getFormatDate() },
  },
  { collection: "Staff" }
);

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
