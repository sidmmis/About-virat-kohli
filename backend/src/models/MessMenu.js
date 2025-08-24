import mongoose from 'mongoose';

const dayMenuSchema = new mongoose.Schema(
  {
    day: { type: String, required: true, unique: true },
    breakfast: { type: String, required: true },
    lunch: { type: String, required: true },
    dinner: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('MessMenu', dayMenuSchema);

