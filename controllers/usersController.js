import Users from "../models/usersModel.js";
import AppError from "../utils/appError.js";

const getUsers = async (req, res, next) => {
  let users;
  try {
    if (req.query.email) {
      // console.log("users", req.query.email);
      users = await Users.find({ email: req.query.email });
    } else if (req.query.firstName) {
      const search = req.query.firstName.toLocaleLowerCase();
      users = await Users.find({ firstName: { $regex: search } });
    } else if (req.query.lastName) {
      const search = req.query.lastName.toLocaleLowerCase();
      users = await Users.find({ lastName: { $regex: search } });
    } else {
      users = await Users.find({});
      console.log(users[0]);
    }

    //    const { password, passwordConfirm, ...othersUserDetails } = users._doc;
    res.status(200).json({
      status: "success",
      results: users.length,
      data: users ? users : [],
    });
  } catch (error) {
    next(new AppError(error));
  }
};
const deleteUser = async (req, res, next) => {
  console.log(req.params.email);
  try {
    const response = await Users.findOneAndDelete({ email: req.params.email });
    console.log("user delete", response);
    if (response) {
      res.status(200).json({
        status: "success",
      });
    }
    res.status(200).json({
      status: "no user found",
    });
  } catch (error) {
    next(new AppError(error));
  }
};
const updateUser = async (req, res, next) => {
  const { firstName,lastName ,address,dateOfBirth,phone,photo } = req.body;
  console.log(req.body);
  try {

    const response = await Users.findOneAndUpdate({email: req.params.email},{
      firstName: firstName,
      lastName:lastName,   
      phone: phone,
      dateOfBirth: dateOfBirth,
      address:address,
      photo:photo
    })
    console.log(response);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    next(new AppError(error));
  }
};
export { getUsers, deleteUser, updateUser };
