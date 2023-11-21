const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
});
const Message = new mongoose.model("message", chatSchema);
module.exports = Message;
