// models/clubMembership.model.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const clubMembershipSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    club: {
      type: Schema.Types.ObjectId,
      ref: 'Club',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'left'],
      default: 'active',
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    leftAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate membership per student+club
clubMembershipSchema.index({ student: 1, club: 1 }, { unique: true });

const ClubMembership = mongoose.model('ClubMembership', clubMembershipSchema);

export default ClubMembership;
