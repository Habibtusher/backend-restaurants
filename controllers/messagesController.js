import messageModel from "../models/messageModel.js";

const addMessages = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({ msg: "message added successfully" });
    } else {
      return res.json({ msg: "failed to add message to the database" });
    }
  } catch (error) {
    next(new AppError(error));
  }
};
const getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg) => {
      return {
        formSelf: msg.sender.toString() === from,
        msg: msg.message.text,
      };
    });
    res.json(projectedMessages)
  } catch (error) {
    next(new AppError(error));
  }
};

export { addMessages, getAllMessages };
