import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'No token provided' });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = await User.findById(payload.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthenticated' });
  if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
  next();
};

