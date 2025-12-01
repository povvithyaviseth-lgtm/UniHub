// controllers/club.controller.js
import { 
  createClubService, 
  getClubsByOwner
} from '../services/club.service.js';

export const createClub = async (req, res) => {
  const { name, description, tag, image } = req.body;

  try {
    const ownerId = req.user.id; // from auth middleware
    
    if (!ownerId) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
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

export const getMyClubs = async (req, res) => {
  try {
    const ownerId = req.user.id;

    if (!ownerId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const clubs = await getClubsByOwner(ownerId);

    return res.json({ clubs });
  } catch (err) {
    console.error('Error fetching clubs for owner:', err);
    return res.status(500).json({ message: 'Failed to fetch your clubs' });
  }
};