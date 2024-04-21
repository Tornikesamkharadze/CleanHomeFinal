const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("./User");
const authenticateToken = require("./authenticateToken");

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* USER REGISTER */
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    /* Take all information from the form */
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    /* The uploaded file is available as req.file */
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    /* path to the uploaded profile photo */
    const profileImagePath = profileImage.path;

    /* Check if user exists */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "მომხმარებელი უკვე არსებოს!" });
    }

    /* Hass the password */
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    /* Create a new User */
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
      phoneNumber,
    });

    /* Save the new User */
    await newUser.save();

    /* Send a successful message */
    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed!", error: err.message });
  }
});

/* USER LOGIN*/
router.post("/login", async (req, res) => {
  try {
    /* Take the infomation from the form */
    const { email, password } = req.body;

    /* Check if user exists */
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(409).json({ message: "მომხმარებელი არ არსებობს!" });
    }

    /* Compare the password with the hashed password */
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "მეილი ან პაროლი არასწორია!" });
    }

    /* Generate JWT token */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

/* ADD ORDER */
router.post("/order", async (req, res) => {
  try {
    const { userId, orderData } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Მომხმარებელი ვერ მოიძებნა!" });
    }
    user.orders.push(orderData);
    await user.save();
    res.status(200).json({ message: "შეკვეთა წარმატებით დაემატა!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/user", authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, email, orders, role } = req.user;
    res.json({ firstName, lastName, email, orders, role });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

router.patch("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = role;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Error updating user role" });
  }
});

router.delete("/userorders/:orderNo", async (req, res) => {
  try {
    const { orderNo } = req.params;

    const user = await User.findOne({ "orders.orderNo": orderNo });

    if (!user) {
      return res.status(404).json({ message: "User or order not found" });
    }
    user.orders = user.orders.filter((order) => order.orderNo !== orderNo);
    await user.save();

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Error deleting order" });
  }
});

/* FETCH ALL USERS' ORDERS ALONG WITH FIRST AND LAST NAMES */
router.get("/userorders", async (req, res) => {
  try {
    const users = await User.find({}, { firstName: 1, lastName: 1, orders: 1 });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users' orders:", error);
    res.status(500).json({ error: "Error fetching users' orders" });
  }
});

router.get("/userorders/:orderNo", async (req, res) => {
  try {
    const { orderNo } = req.params;

    // Query the database to find the user with the matching orderNo
    const user = await User.findOne(
      { "orders.orderNo": orderNo },
      { firstName: 1, lastName: 1, orders: { $elemMatch: { orderNo } } }
    );

    if (!user) {
      return res.status(404).json({ message: "User or order not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user's orders:", error);
    res.status(500).json({ error: "Error fetching user's orders" });
  }
});

router.patch("/userorders/:orderNo", async (req, res) => {
  try {
    const { orderNo } = req.params;
    const { status } = req.body;

    // Find the order with the specified orderNo
    const orderToUpdate = await User.findOneAndUpdate(
      { "orders.orderNo": orderNo }, // Find the user containing the order
      { $set: { "orders.$.status": status } }, // Update the status of the order
      { new: true }
    );

    if (!orderToUpdate) {
      return res.status(404).json({ message: "Order not found" });
    }
    console.log("Updated order:", orderToUpdate);
    res
      .status(200)
      .json({
        message: "Order status updated successfully",
        order: orderToUpdate,
      });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Error updating order status" });
  }
});

module.exports = router;
