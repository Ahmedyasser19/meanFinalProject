import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Joi from "joi";

// Joi validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  pw: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  pw: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

export async function register(req, res) {
  try {
    // Validate input using Joi
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { pw, email } = req.body;

    // Validate input
    if (!pw || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pw, 10);

    // Create the user
    const user = await userModel.create({
      pw: hashedPassword,
      email,
      jwt: "", // Will generate later
    });

    // Generate a JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Save the token to the user document
    user.jwt = token;
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { email: user.email, token },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while registering: " + error });
  }
}

export async function login(req, res) {
  try {
    // Validate input using Joi
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, pw } = req.body;

    // Validate input
    if (!email || !pw) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(pw, user.pw);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a new JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Update the user's token in the database
    user.jwt = token;
    await user.save();

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email, token },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while logging in " + error });
  }
}
