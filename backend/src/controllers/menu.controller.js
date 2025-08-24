import MessMenu from '../models/MessMenu.js';

export const getMenu = async (req, res) => {
  const items = await MessMenu.find().sort({ createdAt: 1 });
  res.json(items);
};

export const upsertDayMenu = async (req, res) => {
  const { day, breakfast, lunch, dinner } = req.body;
  if (!day || !breakfast || !lunch || !dinner) return res.status(400).json({ message: 'All fields required' });
  const updated = await MessMenu.findOneAndUpdate(
    { day },
    { day, breakfast, lunch, dinner },
    { upsert: true, new: true }
  );
  res.json(updated);
};

export const deleteDayMenu = async (req, res) => {
  const { day } = req.params;
  await MessMenu.findOneAndDelete({ day });
  res.json({ success: true });
};

