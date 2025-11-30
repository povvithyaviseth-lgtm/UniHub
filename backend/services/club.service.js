// services/club.service.js
import Club from '../models/club.model.js';

// Create a new club
export async function createClubService({ ownerId, name, description, tag, image }) {
  if (!name) {
    throw new Error('Club name is required');
  }

  const club = await Club.create({
    name,
    description,
    tag,
    image,
    owner: ownerId,
  });

  return club;
}

// Get all clubs for a specific student (optional future use)
export async function getClubsByOwner(ownerId) {
  return Club.find({ owner: ownerId }).sort({ createdAt: -1 });
}

// Delete a club (only the owner can delete)
export async function deleteClub(clubId, ownerId) {
  const club = await Club.findOneAndDelete({
    _id: clubId,
    owner: ownerId,
  });

  return club;
}
