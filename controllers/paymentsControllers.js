import { ObjectId } from "mongodb";
import paymentModel from "../models/paymentsModel.js"



const addPayments = async (req, res) => {
  const paymentInfo = req.body;
  console.log("🚀 ~ file: paymentsControllers.js:8 ~ addPayments ~ paymentInfo:", paymentInfo)
  // const id = paymentInfo.bookingId;
  const email = paymentInfo.email;
  // const filter = {
  //   _id: new ObjectId(id),
  //   email:email
  // };
  // const updateDoc = {
  //   $set:{
  //       paid: true,
  //       transactionId: paymentInfo.transactionId
  //   }
  // }
  try {
    const newPayment = await paymentModel.create(paymentInfo);
    // const updateBooking = await bookingModel.updateOne(filter,updateDoc);
    res.status(201).json({
      status: "success",
      message: "Payment Successfully!",
      data: newPayment,
    });
  } catch (error) {
    res.send(error);
    //   next(new AppError(error, 400));
  }
};
export { addPayments };

