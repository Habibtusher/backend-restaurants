import genarateOrderModal from "../models/generateOrderModal.js";

const genarateOrders = async (req, res, next) => {
  console.log(req.body.items.Carts);
  const {
    address,
    email,
    phone,
    name,
    items,
    totalAmount,
    date,
    paymentStatus,
    status
  } = req.body;
  const ordersGenarate = await genarateOrderModal.create({
    address: address,
    email: email,
    phone: phone,
    name: name,
    items: items,
    totalAmount: totalAmount,
    date: date,
    paymentStatus: paymentStatus,
    status:status
  });
  res.status(201).json({
    status: "success",
    message: "Ordergenarate successfully.",
  });
 
};
const getOrders = async (req, res, next) => {
  console.log(req.params.email);
  try {
    const orders = await genarateOrderModal.find({});
    res.status(200).json({
      status: "success",
      results: genarateOrderModal.length,
      data: orders ? orders : [],
    });
  } catch (error) {
    next(new AppError(error));
  }

};
const deleteOrder = async (req, res, next) => {
  console.log(req.query.id);

  try {
    // const order = await genarateOrderModal.find({ email: req.query.email });
    // res.status(200).json({
    //   status: "success",
    //   data: order ? order : [],
    // });
  } catch (error) {
    next(new AppError(error));
  }

};
const getOrdersByuser = async (req, res, next) => {
  console.log(req.query.email);

  try {
    const order = await genarateOrderModal.find({ email: req.query.email });
    res.status(200).json({
      status: "success",
      data: order ? order : [],
    });
  } catch (error) {
    next(new AppError(error));
  }

};
export { genarateOrders, getOrders,getOrdersByuser,deleteOrder };
