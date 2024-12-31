const mongoose = require("mongoose");
const shiftSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: true,
    },
    shiftId: {
      type: String,
      required: true,
      unique: true,
    },
    shiftDescription: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    state: {
      type: String,
      enum: ["unchecked", "checked-in", "checked-out"],
      default: "unchecked",
    },
  },
  { collection: "Shift" }
);
const Shift = mongoose.model("Shift", shiftSchema);
module.exports = Shift;
