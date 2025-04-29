import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { FullName, email, password, country } = req.body;
  try {
    if (!FullName || !email || !password || !country) {
      return res.status(400).json({ message: "All Field are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      FullName,
      email,
      password: hashedPassword,
      country,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        FullName: newUser.FullName,
        email: newUser.email,
        country: newUser.country,
      });
    } else {
      res.status(500).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
export const login = (req, res) => {
  res.send("login");
};
export const logout = (req, res) => {
  res.send("logout");
};
