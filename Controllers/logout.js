const userModel = require("../Model/userModel");

async function logout(req, res) {
  try {
    res.cookie("token", null, {
      expiresIn: new Date(Date.now),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(200)
      .json({ sucess: true, message: "User Logged out Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
}

module.exports = logout;
