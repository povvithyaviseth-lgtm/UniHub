// controllers/club.controller.js
import { 
  createClubService, 
  getClubsByOwner, 
  updateClubService
} from '../services/club.service.js';

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

    const { name, description, tag } = req.body;  // ✅ safe now, inside try
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
