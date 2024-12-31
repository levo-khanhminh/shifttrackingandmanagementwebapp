//Load env varibale
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const connectDB = require("./DB.js");
const express = require("express");
const Staff = require("./models/Staff.js");
const Manager = require("./models/Manager.js");
const User = require("./models/User.js");
const app = express();
const cors = require("cors");
const Shift = require("./models/Shift.js");
connectDB();
async function getNextStaffId() {
  const staffCount = await Staff.countDocuments();
  const nextId = Number(staffCount) + 1;
  return `staff${nextId > 9 ? String(nextId) : "0" + nextId}`;
}
async function getNextShiftId() {
  const shift = await Shift.findOne().sort({ _id: -1 });
  const lastShiftId = Number(shift?.shiftId.split("S")[1]);
  const shiftId = lastShiftId ? lastShiftId : 0;
  const nextShiftId = shiftId + 1;
  return `S${
    nextShiftId > 9 ? String(nextShiftId) : "0" + String(nextShiftId)
  }`;
}
app.use(express.json());
app.use(cors());
//Routing
app.get("/Users", async (req, res) => {
  const users = await User.find();
  res.json({ users: users });
});
app.get("/User/:id", async (req, res) => {
  const username = req.params.id;
  const user = await User.find({ username: username });
  res.json({ user: user });
});
app.get("/ManagerInfor/:id", async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    console.log("Error with user id");
    return;
  }
  const userInfor = await Manager.find({ userId: userId });
  res.json({ userInfor: userInfor });
});
app.get("/StaffInfo/:id", async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    console.log("Error with user id");
    return;
  }
  const userInfor = await Staff.find({ userId: userId });
  res.json({ userInfor: userInfor });
});
app.get("/StaffInfor/:id", async (req, res) => {
  const staffId = req.params.id;
  const userInfor = await Staff.find({ staffId: staffId });
  res.json({ userInfor: userInfor });
});
app.get("/Staffs", async (req, res) => {
  const staffs = await Staff.find();
  res.json({ staffs: staffs });
});
app.get("/Shift/:id", async (req, res) => {
  const staffId = req.params.id;
  const shifts = await Shift.find({ staffId: staffId });
  res.json({ shifts });
});

/// Retrieve all created shifts to Client  by using SSE
app.get("/shift-event-source-list", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const intervalID = setInterval(async () => {
    try {
      const shifts = await Shift.find();
      res.write(`data: ${JSON.stringify({ shifts })}\n\n`);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, 1000);

  req.on("close", () => {
    clearInterval(intervalID);
    res.end();
  });
});

/// Retrieve staff shift list from the database
app.get("/staff-shift-event-source-list/:id", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  const staffId = req.params.id;
  const intervalID = setInterval(async () => {
    try {
      const shifts = await Shift.find({ staffId: staffId });
      res.write(`data: ${JSON.stringify({ shifts })}\n\n`);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, 1000);

  req.on("close", () => {
    clearInterval(intervalID);
    res.end();
  });
});
//post
// Create a user
app.post("/User", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  if (!username || !password || !role) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const user = await User.create({
    username: username,
    password: password,
    role: role,
  });
  res.json({ user: user });
});
/// Create manager
app.post("/Manager", async (req, res) => {
  const userId = req.body.userId;
  const fullname = req.body.fullname;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const email = req.body.email;
  const manager = await Manager.create({
    userId: userId,
    fullname: fullname,
    phoneNumber: phoneNumber,
    address: address,
    email: email,
  });
  res.json({ manager: manager });
});
/// Create a staff
app.post("/Staff", async (req, res) => {
  const userId = req.body.userId;
  let staffId;
  try {
    staffId = await getNextStaffId();
  } catch (error) {
    console.log(error);
  }
  const fullname = req.body.fullname;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const email = req.body.email;
  const joiningDate = req.body.joiningDate;
  const staff = await Staff.create({
    userId: userId,
    staffId: staffId,
    fullname: fullname,
    phoneNumber: phoneNumber,
    address: address,
    email: email,
    joiningDate: joiningDate,
  });
  res.json({ staff: staff });
});

///Create a shift to a specific staff
app.post("/Shift", async (req, res) => {
  try {
    const staffId = req.body.staffId;
    const shiftId = await getNextShiftId();
    const shiftDescription = req.body.shiftDescription;
    const date = req.body.date;
    const location = req.body.location;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const note = req.body.note;
    const shift = await Shift.create({
      staffId: staffId,
      shiftId: shiftId,
      shiftDescription: shiftDescription,
      date: date,
      location: location,
      startTime: startTime,
      endTime: endTime,
      note: note,
    });
    res.json({ shift });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task", error });
  }
});
//put
//Update or add user information
app.put("/Users/:id", async (req, res) => {
  const userId = req.params.id;
  const userUpdatedInfor = req.body;
  const newUserInfor = await Manager.findByIdAndUpdate(
    userId,
    userUpdatedInfor
  );
  res.json({ updateInfor: newUserInfor });
});
//Update or  edit shift information
app.put("/Shift/update", async (req, res) => {
  const shiftId = req.body.shiftId;
  const newShiftUpdate = req.body;
  try {
    const newShift = await Shift.findOneAndUpdate(
      {
        shiftId,
      },
      newShiftUpdate,
      { new: true }
    );

    res.json({ newShift });
  } catch (error) {
    console.log(error);
    console.log("Unsuccessfully update theshift");
  }
});
//Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is working on port ${process.env.PORT}`);
});
