// controllers/club.controller.js
import { createClubService } from '../services/club.service.js';

export const createClub = async (req, res) => {
  const { name, description, tag, image } = req.body;

  try {
    const ownerId = req.user.id; // from auth middleware

    // Call the service layer
    const club = await createClubService({
      ownerId,
      name,
      description,
      tag,
      image,
    });

    return res.status(201).json({
      message: 'Club created successfully',
      club,
    });
  } catch (err) {
    console.error('Error creating club:', err);

    if (err.message === 'Club name is required') {
      return res.status(400).json({ message: err.message });
    }

    if (err.code === 11000) {
      return res.status(400).json({ message: "A club with that name already exists." });
    }

    return res.status(500).json({ message: 'Server error creating club' });
  }
};
