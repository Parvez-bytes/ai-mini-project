import User from '../models/User.js';
import { generateToken, getAuthCookieOptions, getExpiredCookieOptions } from '../utils/generateToken.js';

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  academicLevel: user.academicLevel,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, academicLevel } = req.body;
    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      academicLevel
    });

    const token = generateToken(user._id.toString());
    res.cookie('token', token, getAuthCookieOptions());

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: { user: sanitizeUser(user) }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = generateToken(user._id.toString());
    res.cookie('token', token, getAuthCookieOptions());

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: { user: sanitizeUser(user) }
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie('token', getExpiredCookieOptions());

  return res.status(200).json({
    success: true,
    message: 'Logout successful.',
    data: {}
  });
};

export const getCurrentUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Current user fetched successfully.',
    data: { user: sanitizeUser(req.user) }
  });
};
