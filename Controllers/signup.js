const Validator = require("custom-data-validator");
const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");

async function signup(req, res) {
  try {
    const { firstName, email, skills, password, bio, profileImagePath } =
      req.body;

    // Validation rules using custom validator
    const rules = {
      firstName: ["required", "string"],
      email: ["required", "string", "regex:^\\S+@\\S+\\.\\S+$"],
      skills: ["required", "array"],
      password: ["required", "string", "minLength:6"],
      bio: ["optional", "string"],
      profileImagePath: ["optional", "string"],
    };

    const validator = new Validator(rules);

    // Custom validation for "optional"
    validator.addCustomValidator(
      "optional",
      (field, value, param, validatorInstance) => {
        if (value === undefined || value === null) {
          // Skip validation if the field is not provided
          return;
        }
      }
    );

    // Custom validation for "array"
    validator.addCustomValidator(
      "array",
      (field, value, param, validatorInstance) => {
        if (!Array.isArray(value)) {
          validatorInstance.addError(field, `${field} must be an array.`);
        }
      }
    );
    const isValid = validator.validate(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validator.getErrors(),
      });
    }

    // Proceed with the rest of the signup logic
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      email,
      firstName,
      skills,
      bio,
      password: hashedPassword,
      profileImagePath,
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
