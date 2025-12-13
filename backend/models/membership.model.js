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
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// prevent duplicate membership per student+club
clubMembershipSchema.index({ student: 1, club: 1 }, { unique: true });

const ClubMembership = mongoose.model('ClubMembership', clubMembershipSchema,"clubMemberships");

export default ClubMembership;
