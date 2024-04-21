const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userData = require("./auth.js");
const authRoutes = require("./rout.js");
const usersRoutes = require("./User.js"); // Import the new users route
const User = require("./User"); // Import the User model

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", usersRoutes); // Mount the users route

const PORT = process.env.PORT || 3001;

/* MONGOOSE SETUP */

const uri =
  "mongodb+srv://tornikesamkharadzee:user1@cluster0.ltkhpyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 ";

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  
    console.log("User documents updated successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connect();

app.use("/auth", userData);
app.use("/users", usersRoutes); // Mount the users routes

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!!`);
});
