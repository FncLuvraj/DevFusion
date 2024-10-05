const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");

async function AuthMiddlewear(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid User" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = AuthMiddlewear;
