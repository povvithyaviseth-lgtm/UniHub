import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' },
  location: { type: String, default: '' },
  time: { type: String, default: '' },
  imageUrl: { type: String, default: '' },

  // approval flow
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },

  // membership embedded as IDs
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', index: true }],

  clubOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
}, { timestamps: true });


const Club = mongoose.model('Club', clubSchema);

export default Club;
