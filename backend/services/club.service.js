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

export async function getClubsService() {
  const clubs = await Club.find().sort({ createdAt: -1 });
  return clubs;
}

// Delete a club (only the owner can delete)
export async function deleteClub(clubId, ownerId) {
  const club = await Club.findOneAndDelete({
    _id: clubId,
    owner: ownerId,
  });

  return club;
}

export async function updateClubService(clubId, ownerId, data) {
  const { name, description, tag, image } = data;

  if (name !== undefined && name.trim() === '') {
    throw new Error('Club name cannot be empty');
  }

  const updateFields = {};
  if (name !== undefined) updateFields.name = name;
  if (description !== undefined) updateFields.description = description;
  if (tag !== undefined) updateFields.tag = tag;
  if (image !== undefined) updateFields.image = image;

  const club = await Club.findOneAndUpdate(
    { _id: clubId, owner: ownerId }, // ensures only owner can edit
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  // If club is null, either it doesn't exist or the user isn't the owner
  return club;
}

// Get a single club by ID
export async function getClubByIdService(clubId) {
  if (!clubId) {
    throw new Error("Club ID is required");
  }

  const club = await Club.findById(clubId);

  if (!club) {
    const err = new Error("Club not found");
    err.statusCode = 404;
    throw err;
  }

  return club;
}


