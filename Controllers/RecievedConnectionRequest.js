const { status } = require("express/lib/response");
const ConnectionModel = require("../Model/ConnectionModel");

//function of this api is to show all the requests to the user which has status interested

async function RecievedConnectionRequest(req, res) {
  try {
    const loggedInUser = req.user._id;

    const connectionRequest = await ConnectionModel.find({
      receiverUserId: loggedInUser,
      status: "interested",
    })
      .populate("senderUserId", ["name", "email"])
      .select("-createdAt -updatedAt -receiverUserId -_id");

    res.status(200).json({ success: true, data: connectionRequest });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports = RecievedConnectionRequest;
