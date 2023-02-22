import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Stripe from "stripe";
import cors from "cors";
const app = express();
import globalErrorHandler from "./controllers/errorController.js";
import AuthRoutes from "./routes/authRoutes.js";
import UserRoutes from "./routes/usersRoutes.js";
import FoodRoute from "./routes/foodRoute.js";
import PaymentRoute from "./routes/paymentRoutes.js";
import MessageRoute from "./routes/messagesRoutes.js";
import GenarateOrderRoute from "./routes/genarateOrderRoute.js";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
const Strip_secret_key = process.env.STRIPE_SECRET_KEY;
// const Strip_public_key = process.env.STRIPE_PUBLIC_KEY;
const stripe = new Stripe(Strip_secret_key);

// Middleware
app.set("view engine", "ejs");
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Routes
// app.use('/api/hotels',HotelRoutes)
app.use("/api", UserRoutes);
app.use("/api/message", MessageRoute);
app.use("/api/auth", AuthRoutes);
app.use("/api", FoodRoute);
app.use("/api", PaymentRoute);
app.use("/order", GenarateOrderRoute);

// Error Handler
app.all("/", (req, res, next) => {
  res.send("hello");
  // next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

// Connection
const connection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
  }
};
app.post("/create-payment-intent", async (req, res) => {
  const booking = req.body;
  const price = booking.price;
  const amount = price * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "usd",
    amount: amount,
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.listen(process.env.PORT || 5000, () => {
  connection();
  console.log("connected");
});




