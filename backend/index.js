const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require("stripe");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Environment variables
const PORT = process.env.PORT || 8080;
const _dirname = path.resolve();

// MongoDB connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

// Cart Schema
const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
});
const cartModel = mongoose.model("cart", cartSchema);

// User Schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  confirmpassword: String,
  image: String,
});
const userModel = mongoose.model("user", userSchema);

// Product Schema
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

// API Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Signup API
app.post("/signup", async (req, res) => {
  const { email } = req.body;
  userModel.findOne({ email }, (err, result) => {
    if (result) {
      res.send({ message: "Email id is already registered", alert: false });
    } else {
      const data = new userModel(req.body);
      data.save();
      res.send({ message: "Successfully signed up", alert: true });
    }
  });
});

// Login API
app.post("/login", (req, res) => {
  const { email } = req.body;
  userModel.findOne({ email }, (err, result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      res.send({ message: "Login successful", alert: true, data: dataSend });
    } else {
      res.send({ message: "Email is not available, please sign up", alert: false });
    }
  });
});

// Product APIs
app.post("/uploadProduct", async (req, res) => {
  const data = new productModel(req.body);
  await data.save();
  res.send({ message: "Upload successfully" });
});

app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

// Stripe Payment Gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.post("/create-checkout-session", async (req, res) => {
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1OdZA3SJ6Ij3FdkhiWHq19WM" }],
      line_items: req.body.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: { enabled: true, minimum: 1 },
        quantity: item.qty,
      })),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json({ sessionId: session.id });
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

// Static File Serving and Catch-All Route
const frontendDistPath = path.join(_dirname, "frontend", "dist");
app.use(express.static(frontendDistPath));

// Serve frontend's index.html for all unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(frontendDistPath, "index.html"));
});

// Start the server
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
