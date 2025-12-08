// controllers/club.controller.js
import Club from '../models/club.model.js';

import { 
  createClubService, 
  getClubByIdService, 
  getClubsByOwner, 
  getClubsService,
  updateClubService
} from '../services/club.service.js';
import mongoose from 'mongoose';

export const createClub = async (req, res) => {
  try {
    // Debug logs so we can see what Multer gave us
    console.log('🔥 REQ.BODY in createClub:', req.body);
    console.log('🔥 REQ.FILE in createClub:', req.file);
    console.log('🔥 CONTENT-TYPE:', req.headers['content-type']);

    if (!req.body) {
      return res.status(400).json({
        message:
          'No form body received. Did you send multipart/form-data and is upload.single("image") on this route?',
      });
    }

    const { name, description, tag } = req.body;  
    const ownerId = req.user.id;                  // from auth middleware

    if (!ownerId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Decide the image URL we store in DB
    let image;
    if (req.file) {
      // This is what frontend will use in <img src={club.image} />
      image = `/images/club/${req.file.filename}`;
    } else if (req.body.image) {
      // optional fallback if someone sends an image path manually
      image = req.body.image;
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
      return res
        .status(400)
        .json({ message: 'A club with that name already exists.' });
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


export async function getClubs(req, res) {
  try {
    console.log('✅ getClubs controller called');

    const clubs = await getClubsService();

    return res.status(200).json({
      success: true,
      data: clubs,
    });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch clubs',
    });
  }
}

export const updateClub = async (req, res)  => {
  try {
    const ownerId = req.user.id;
    const clubId = req.params.id;
    const data = req.body; // { name, description, tag, image }

    const updatedClub = await updateClubService(clubId, ownerId, data);

    if (!updatedClub) {
      return res
        .status(403)
        .json({ message: 'Not allowed to edit this club' });
    }

    res.json(updatedClub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const getPendingClubRequests = async (req, res) => {
  try {
    const clubs = await getClubsService();
    const pendingClubs = clubs.filter(club => club.status === 'pending');
    return res.json(pendingClubs);
  } catch (error) {
    console.error('Error fetching pending club requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const setStatusForClub = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Club Id" });
  }

  try {
    const updatedClub = await Club.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedClub) {
      return res.status(404).json({ success: false, message: "Club not found" });
    }

    res.status(200).json({ success: true, data: updatedClub });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteClub = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Club Id" });
  }
  try {
    const deletedClub = await Club.findByIdAndDelete(id);
    if (!deletedClub) {
      return res.status(404).json({ success: false, message: "Club not found" });
    }

    res.status(200).json({ success: true, message: "Club deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getClubById = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = req.user?.id; // from auth middleware (route is protected)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid club ID' });
    }

    const club = await getClubByIdService(id); // will throw if not found

    // OPTIONAL: make sure only the owner can view their club dashboard.
    // If you want this endpoint to be public, remove this block.
    if (ownerId && club.owner && club.owner.toString() !== ownerId) {
      return res
        .status(403)
        .json({ message: 'Not allowed to view this club' });
    }

    return res.status(200).json({ club });
  } catch (err) {
    console.error('Error fetching club by id:', err);

    // if service set statusCode (e.g. 404)
    const status = err.statusCode || 500;
    const message =
      err.statusCode === 404 ? err.message || 'Club not found' : 'Server error fetching club';

    return res.status(status).json({ message });
  }
};