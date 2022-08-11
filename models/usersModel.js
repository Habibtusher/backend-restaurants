import { mongoose } from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  lastName: {
    type: String,
    required: [true, "Please tell us last name"],
  },
  phone: {
    type: Number,
    required: [true, "Please tell us phone number"],
  },

  dateOfBirth:{
    type:String
  },
  address: {
    state1: String,
    state2: String,
    city: String,
    state: String,
    country: String,
    zipcode: Number,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Please provide your email address"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a valid email address",
    ],
    validate: {
      validator: function (v) {
        return this.model("User")
          .findOne({ email: v })
          .then((user) => !user);
      },
      message: (props) => `${props.value} is already used by another user`,
    },
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your confirm password "],
    minlength: [8, "Confirm password must be at least 8 characters"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", UserSchema);
