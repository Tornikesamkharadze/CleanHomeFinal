const express = require("express");
const Users = require("./User");

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Corrected from Users.find() to User.find()
    res.send(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
