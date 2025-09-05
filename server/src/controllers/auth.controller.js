import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function sign(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export async function signup(req, res) {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, passwordHash });

    const token = sign(user);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl }
    });
  } catch (e) {
    res.status(500).json({ message: "Signup failed" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = sign(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl }
    });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
}

export async function me(req, res) {
  try {
    const user = await User.findById(req.user.id).select("_id name email role avatarUrl");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
}
