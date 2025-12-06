// models/club.model.js
import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Store image as a URL or filename (PNG on the frontend)
    image: {
      type: String,
      default: '', // e.g. '/uploads/my-club.png' or a Cloudinary URL
    },

    tag: {
      type: String,
      default: '',
      trim: true,
    },

    description: {
      type: String,
      default: '',
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending',
      required: true,
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

const Club = mongoose.model('Club', clubSchema);
export default Club;
