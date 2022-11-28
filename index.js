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
import MessageRoute from "./routes/messagesRoutes.js";
import GenarateOrderRoute from "./routes/genarateOrderRoute.js";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
const Strip_secret_key = process.env.STRIPE_SECRET_KEY;
// const Strip_public_key = process.env.STRIPE_PUBLIC_KEY;
const stripe = new Stripe("sk_test_51Ljyj5SBDj4qcoMh4fHXGYUqPFSXNtsGlf4wev2Gk2mJwTFlq8i6ZnTxE1C8FeQ10qMAxoBfLCTpfM4SvVmYTw9d003QkuO3Bc");

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

app.listen(process.env.PORT || 5000, () => {
  connection();
  console.log("connected");
});

// const httpServer = createServer();
// const io = new Server(httpServer, {});
// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });
// });
// httpServer.on("send-msg", (data) => {
//   const sendUserSocket = onlineUsers.get(data.to);
//   if (sendUserSocket) {
//     httpServer.to(sendUserSocket).emit("msg-recieve", data.message);
//   }
// });
// httpServer.listen(3000);

app.post("/payment", async (req, res) => {
  const { product, token } = req.body;
  const idempontencyKey = uuidv4();
console.log("object,",);
  try {
   stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
        }
      );
    })
    .then((result) =>{
      console.log(result);
       res.status(200).json(result)
    }
    )
    .catch((err) => console.log("err",err));

    // stripe.customers
    //   .create({
    //     name: token.card.name,
    //     email: token.email,
    //     source: token.id
    //   })
    //   .then(customer =>
    //     stripe.charges.create({
    //       amount: product.price * 100,
    //       currency: "usd",
    //       customer: customer.id
    //     })
    //   )
    //   .then((result) =>{
    //     console.log("object,result",result);
    //     res.render("completed.html")
    //   } )
    //   .catch(err => console.log("wee",err));
  } catch (err) {
    res.send("error",err);
  }
});
