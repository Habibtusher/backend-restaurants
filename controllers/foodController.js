import foodModel from "../models/foodModel.js";
import AppError from "../utils/appError.js";

const addFood = async (req, res, next) => {
  const {
    name,
    category,
    image,
    price,
    discountPrice,
    discountPercent,
    ratting,
  } = req.body;

  try {
    const newUser = await foodModel.create({
      name: name,
      category: category,
      image: image,
      price: price,
      discountPrice: discountPrice,
      discountPercent: discountPercent,
      ratting: ratting,
    });
    res.status(201).json({
      status: "success",
      message: "Food added successfully.",
      data: newUser,
    });
  } catch (error) {
    next(new AppError(error, 400));
  }
};
const getFood = async (req, res, next) => {
  let foods;
  console.log(req.body);
  try {
    if (req.body.name) {
      const search = req.body.name.toLocaleLowerCase();
      foods = await foodModel.find({
        name: { $regex: search, $options: "$in" },
      });
    } else if (req.body.category) {
      const search = req.body.category.toLocaleLowerCase();
      foods = await foodModel.find({
        category: { $regex: search, $options: "$in" },
      });
    } else {
      foods = await foodModel.find({});
    }

    //    const { password, passwordConfirm, ...othersUserDetails } = users._doc;
    res.status(200).json({
      status: "success",
      results: foods.length,
      data: foods ? foods : [],
    });
  } catch (error) {
    next(new AppError(error));
  }
};
const deleteFood =async(req,res,next)=>{ 
 const {id} = req.body
 console.log(id);
 try{
  await foodModel.deleteOne({ _id: id })
  res.status(200).json({
    status: "success",
   message:"Item delete successfully",
  });
 } catch (error) {
    next(new AppError(error));
  }

}
export { addFood, getFood,deleteFood };
