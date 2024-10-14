const ConnectionModel = require("../Model/ConnectionModel");
const userModel = require("../Model/userModel");
async function feed(req, res) {
  try {
    const loggedInUser = req.user._id;

    const page = parseInt(req.query.params) || 1;
    const limit = parseInt(req.query.params) || 10;

    if (limit > 10) {
      limit = 10;
    }

    const skip = (page - 1) * limit;

    const connectionRequest = await ConnectionModel.find({
      $or: [{ receiverUserId: loggedInUser }, { senderUserId: loggedInUser }],
    })
      .select("senderUserId recieverUserId")
      .populate("senderUserId", ["name"])
      .populate("receiverUserId", ["name"]);

    const hideUserFromFeed = new Set();

    for (let i = 0; i < connectionRequest.length; i++) {
      hideUserFromFeed.add(connectionRequest[i].receiverUserId);
      hideUserFromFeed.add(connectionRequest[i].senderUserId);
    }

    const feed = await userModel
      .find({
        $and: [
          { _id: { $nin: Array.from(hideUserFromFeed) } },
          { _id: { $ne: loggedInUser._id } },
        ],
      })
      .select("name email")
      .skip(skip)
      .limit(limit);

    res.send(feed);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
}
module.exports = feed;
