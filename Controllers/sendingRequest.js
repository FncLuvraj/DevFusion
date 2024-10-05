const ConnectionModel = require("../Model/ConnectionModel");
const userModel = require("../Model/userModel");

async function sendingRequest(req, res) {
  try {
    const senderUserId = req.user._id; // current logged in user id passed by middlewear;
    const receiverUserId = req.params.receiverUserId;
    const status = req.params.status;

    // validating status
    const allowedStatus = ["interested", "ignored"];

    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "invalid status" });
    }

    // validating toUserid

    const receiverUserExist = await userModel.findById(receiverUserId);

    if (!receiverUserExist) {
      return res
        .status(400)
        .json({ success: false, message: "reciever user does not exist" });
    }

    // checking if connection already exist

    const connectionExist = await ConnectionModel.findOne({
      $or: [
        { senderUserId, receiverUserId },
        { senderUserId: receiverUserId, receiverUserId: senderUserId },
      ],
    });

    if (connectionExist) {
      return res
        .status(400)
        .json({ success: false, message: "Connection already exist" });
    }

    // if connection does not exist

    const newConnection = new ConnectionModel({
      senderUserId: senderUserId,
      receiverUserId: receiverUserId,
      status: status,
    });

    await newConnection.save();

    res
      .status(200)
      .json({ success: true, message: "Connection request successfull" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = { sendingRequest };
