const express = require("express");
const { Router } = express;
const Message = require("../database/registers");
const User = require("../database/signupschema");
const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to ChatApp API");
});

router.get("/messages", async (req, res) => {
  const result = await Message.find();
  res.send(result);
});

router.post("/messages", async (req, res) => {
  try {
    const { message, time, username, roomId } = req.body;
    const newMessage = new Message({
      message,
      time,
      username,
      roomId,
    });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/join", async (req, res) => {
  try {
    const { username, roomId } = req.body;

    // Check if both username and roomId are provided
    if (!username || !roomId) {
      return res
        .status(400)
        .json({ error: "Both username and roomId are required" });
    }

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        error:
          "Username is already taken in this room, please use different username",
      });
    } else {
      const newUser = new User({
        username,
        roomId,
      });

      await newUser.save();

      const responseData = {
        message: "User registered successfully",
        data: {
          _id: newUser._id,
          username: newUser.username,
          roomId: newUser.roomId,
        },
      };

      res.status(201).json(responseData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
