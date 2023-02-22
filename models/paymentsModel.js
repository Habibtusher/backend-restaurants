import mongoose from "mongoose";

const Payments = mongoose.Schema({
  price: {
    type: Number,
    required: [true, "Please provide a name"],
  },

  email: {
    type: String,
    required: [true, "Please provide a email"],
  },
  transactionId: {
    type: String,
  },
  name: {
    type: String,
  },
});
export default mongoose.model("payment", Payments);
