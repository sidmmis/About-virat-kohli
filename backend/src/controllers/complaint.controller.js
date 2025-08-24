import Complaint from '../models/Complaint.js';

export const createComplaint = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ message: 'Missing fields' });
  const complaint = await Complaint.create({ title, description, student: req.user._id });
  res.status(201).json(complaint);
};

export const myComplaints = async (req, res) => {
  const list = await Complaint.find({ student: req.user._id }).sort({ createdAt: -1 });
  res.json(list);
};

export const allComplaints = async (req, res) => {
  const list = await Complaint.find().populate('student', 'name email').sort({ createdAt: -1 });
  res.json(list);
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'pending' | 'resolved'
  if (!['pending', 'resolved'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
  const updated = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
  res.json(updated);
};

