import { mongoose } from "mongoose";


const FoodSchema =  mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    category: {
        type: String,
        required: [true, "Please provide a category"],
    },
    image: {
        type: String,
        required: [true, "Please upload a image"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"]
    },
    rating:{
        type: Array
    },
   discountPrice:{
    type: Number,
   },
   discountPercent:{
    type: Number,
   }

}, { timestamps: true });

export default mongoose.model("Food", FoodSchema);