import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || '7d',
  });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already in use' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = signToken(user);
  res.status(201).json({ user: { id: user._id, name, email }, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  res.json({ user: { id: user._id, name: user.name, email }, token });
};
