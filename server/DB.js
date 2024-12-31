const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
