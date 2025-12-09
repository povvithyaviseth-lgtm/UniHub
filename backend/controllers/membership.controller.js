// controllers/membership.controller.js
import mongoose from 'mongoose';
import {
  joinClubService,
  leaveClubService,
  getJoinedClubsService,
} from '../services/membership.service.js';

/**
 * POST /api/membership/:id/join
 * Logged-in student joins an approved club.
 */
export const joinClub = async (req, res) => {
  try {
    const studentId = req.user.id;
    const clubId = req.params.id;

    if (!studentId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ message: 'Invalid club id' });
    }

    const { membership, action } = await joinClubService(
      studentId,
      clubId
    );

    if (action === 'already-member') {
      return res
        .status(200)
        .json({ message: 'Already a member of this club', membership });
    }

    // action === 'joined'
    return res
      .status(201)
      .json({ message: 'Joined club successfully', membership });
  } catch (error) {
    console.error('Error joining club:', error);

    if (error.message === 'Club not found') {
      return res.status(404).json({ message: 'Club not found' });
    }

    if (error.message === 'Club not approved') {
      return res
        .status(403)
        .json({ message: 'This club is not approved yet and cannot be joined.' });
    }

    return res.status(500).json({ message: 'Server error joining club' });
  }
};

/**
 * POST /api/membership/:id/leave
 * Logged-in student leaves a club (membership doc is deleted).
 */
export const leaveClub = async (req, res) => {
  try {
    const studentId = req.user.id;
    const clubId = req.params.id;

    if (!studentId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ message: 'Invalid club id' });
    }

    const membership = await leaveClubService(studentId, clubId);

    return res
      .status(200)
      .json({ message: 'Left club successfully', membership });
  } catch (error) {
    console.error('Error leaving club:', error);

    if (error.message === 'Membership not found') {
      return res
        .status(404)
        .json({ message: 'You are not a member of this club' });
    }

    return res.status(500).json({ message: 'Server error leaving club' });
  }
};

/**
 * GET /api/membership/joined
 * All clubs the current student is a member of.
 */
export const getJoinedClubs = async (req, res) => {
  try {
    const studentId = req.user.id;

    if (!studentId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const clubs = await getJoinedClubsService(studentId);

    return res.status(200).json({ clubs });
  } catch (error) {
    console.error('Error fetching joined clubs:', error);
    return res
      .status(500)
      .json({ message: 'Server error fetching joined clubs' });
  }
};
