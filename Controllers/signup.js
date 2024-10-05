const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");

async function signup(req, res) {
  try {
    const { firstName, email, skills, password } = req.body;

    if (!firstName || !email || !skills) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res
        .status(409)
        .json({ success: false, message: "Email already Exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      email,
      firstName,
      skills,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Error signing up" });
  }
}

module.exports = signup;
