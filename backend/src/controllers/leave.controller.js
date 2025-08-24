import Leave from '../models/Leave.js';

export const applyLeave = async (req, res) => {
  const { fromDate, toDate, reason } = req.body;
  if (!fromDate || !toDate || !reason) return res.status(400).json({ message: 'Missing fields' });
  const leave = await Leave.create({ student: req.user._id, fromDate, toDate, reason });
  res.status(201).json(leave);
};

export const myLeaves = async (req, res) => {
  const list = await Leave.find({ student: req.user._id }).sort({ createdAt: -1 });
  res.json(list);
};

export const allLeaves = async (req, res) => {
  const list = await Leave.find().populate('student', 'name email').sort({ createdAt: -1 });
  res.json(list);
};

export const updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'approved' | 'rejected' | 'pending'
  if (!['approved', 'rejected', 'pending'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
  const updated = await Leave.findByIdAndUpdate(id, { status }, { new: true });
  res.json(updated);
};

