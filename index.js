import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import cors from "cors";
const app = express();
import globalErrorHandler from "./controllers/errorController.js";
import AuthRoutes from "./routes/authRoutes.js";
import UserRoutes from "./routes/usersRoutes.js";
import FoodRoute from "./routes/foodRoute.js";
import MessageRoute from "./routes/messagesRoutes.js";
import { Server,Socket } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());

// Routes
// app.use('/api/hotels',HotelRoutes)
app.use("/api", UserRoutes);
app.use("/api/message", MessageRoute);
app.use("/api/auth", AuthRoutes);
app.use("/api", FoodRoute);

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

app.listen(5000 || process.env.PORT, () => {
  connection();
  console.log("connected");
});


const httpServer = createServer();
const io = new Server(httpServer, {

});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
});
httpServer.on("send-msg",(data)=>{
const sendUserSocket = onlineUsers.get(data.to);
if(sendUserSocket){
  httpServer.to(sendUserSocket).emit("msg-recieve",data.message)
}
})
httpServer.listen(3000);

