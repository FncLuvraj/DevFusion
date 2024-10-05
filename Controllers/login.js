const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "All fields are required" });
    }

    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const payload = {
      email: email,
      userId: userExist._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // Send cookie only over HTTPS in production
    });

    res
      .status(200)
      .json({ success: true, message: "User Logged In Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error logging-In" });
  }
}
module.exports = login;
