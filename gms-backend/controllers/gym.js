// Importing required modules
const { hash } = require("bcryptjs"); // bcryptjs for hashing passwords
const Gym = require("../modals/gym"); // Mongoose model for Gym users
const bcrypt = require("bcryptjs"); // Password hashing and comparing
const crypto = require("crypto"); // For generating secure random OTP
const nodemailer = require("nodemailer"); // For sending emails
const jwt = require("jsonwebtoken");

// ---------------- REGISTER ----------------
exports.register = async (req, res) => {
  try {
    // Destructure data from the request body
    const { userName, password, gymName, profilePic, email } = req.body;

    // Check if the username already exists in the DB
    const isExist = await Gym.findOne({ userName });

    if (isExist) {
      // If user exists, return error
      res.status(400).json({
        error: "Username already exist, please try with other username",
      });
    } else {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword); // For debugging only, remove in production

      // Create new gym user with hashed password
      const newGym = new Gym({
        userName,
        password: hashedPassword,
        gymName,
        profilePic,
        email,
      });

      // Save the new user in the DB
      await newGym.save();

      // Respond with success
      res.status(201).json({
        message: "User registered successfully",
        success: "yes",
        data: newGym,
      });
    }
  } catch (err) {
    // Handle any unexpected errors
    res.status(500).json({
      error: "Server error",
    });
  }
};

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
};

// ---------------- LOGIN ----------------
exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find user by username
    const gym = await Gym.findOne({ userName });

    // If user found and password matches
    if (gym && (await bcrypt.compare(password, gym.password))) {
      const token = jwt.sign({ gym_id: gym._id }, process.env.JWT_SecretKey);

      res.cookie("cookie_token", token, cookieOptions);

      res.json({ message: "Logged in successfully", success: "true", gym });
    } else {
      // Wrong username or password
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

// ---------------- EMAIL TRANSPORTER SETUP ----------------
const transporter = nodemailer.createTransport({
  service: "gmail", // Using Gmail SMTP
  auth: {
    user: process.env.SENDER_EMAIL, // Your Gmail address stored in .env
    pass: process.env.EMAIL_PASSWORD, // App password from Gmail stored in .env
  },
});

// ---------------- SEND OTP EMAIL ----------------
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const gym = await Gym.findOne({ email });

    if (gym) {
      // Generate a secure random 6-digit OTP
      const buffer = crypto.randomBytes(4);
      const token = (buffer.readUInt32BE(0) % 90000) + 100000;

      // Store the OTP and expiry time in DB
      gym.resetPasswordToken = token;
      gym.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
      await gym.save();

      // Prepare email options
      const mailOptions = {
        from: "petrovblaze48@gmail.com", // Sender email (must match authenticated one)
        to: email,
        subject: "Password Reset Request",
        text: `Your OTP is: ${token}`, // Fallback plain text
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>Dear user,</p>
            <p>We received a request to reset your password for your Gym Management System account.</p>
            <p>Please use the following OTP code to proceed:</p>
            <p style="font-size: 24px; font-weight: bold; color: #2e86de; text-align: center; letter-spacing: 2px;">
              ${token}
            </p>
            <p>This code is valid for the next <strong>1 hour</strong>.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
            <br/>
            <p>Best regards,<br/>Gym Management System Team</p>
          </div>
        `,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({ error: "Server error", errorMsg: error });
        } else {
          res.status(200).json({ message: "OTP Sent to your email" });
        }
      });
    } else {
      // If user not found
      return res.status(400).json({ error: "Gym not found" });
    }
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

// ---------------- VERIFY OTP ----------------
exports.checkOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if gym user exists with given email, OTP and unexpired token
    const gym = await Gym.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() }, // Not expired
    });

    if (!gym) {
      // Invalid or expired OTP
      return res.status(400).json({ error: "OTP is invalid or has expired" });
    }

    // OTP is valid
    res.status(200).json({ message: "OTP is successfully verified" });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

// ---------------- RESET PASSWORD ----------------
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Find user by email
    const gym = await Gym.findOne({ email });

    if (!gym) {
      return res.status(400).json({
        error: "Some technical issue, please try again later",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear OTP fields
    gym.password = hashedPassword;
    gym.resetPasswordToken = undefined;
    gym.resetPasswordExpires = undefined;

    await gym.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

exports.logout = async (req, res) => {
  res
    .clearCookie("cookie_token", cookieOptions)
    .json({ message: "Logged out successfully" });
};
