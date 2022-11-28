import { mongoose } from "mongoose";


const OrderSchema =  mongoose.Schema({
    name: {
        type: String,
       
    },
    email: {
        type: String,
       
    },
    items: {
        type: Object,
      
    },
    phone: {
        type: Number,
       
    },
    date:{
        type: Date
    },
    totalAmount:{
    type: Number,
   },
   address:{
    state1: String,
    state2: String,
    city: String,
    state: String,
    country: String,
    zipcode: Number,
   },
   paymentStatus:{
    type: String,
   },
   status:{
    type: String,
   }

}, { timestamps: true });

export default mongoose.model("Orders", OrderSchema);