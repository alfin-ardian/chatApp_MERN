const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
  },
  roomId: {
    type: String,
    required: [true, "Please enter a room ID"],
  },
});
const User = new mongoose.model("user", userSchema);
module.exports = User;
