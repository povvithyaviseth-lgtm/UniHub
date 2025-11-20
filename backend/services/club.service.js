import Club from '../models/club.model.js';

// Helper function to turn Mongoose object into a simple DTO
function toClubDTO(club) {
  return {
    id: String(club._id),
    name: club.name,
    description: club.description || '',
    location: club.location || '',
    time: club.time || '',
    imageUrl: club.imageUrl || '',
    status: club.status,
    clubOwner: String(club.clubOwner),
    createdAt: club.createdAt,
    updatedAt: club.updatedAt,
  };
}

// Create a new club in the database (database-only)
export async function createClub(payload, ownerId) {
  const name = String(payload?.name || '').trim();
  if (!name) throw new Error('Club name is required');

  const club = await Club.create({
    name,
    description: payload?.description || '',
    location: payload?.location || '',
    time: payload?.time || '',
    imageUrl: payload?.imageUrl || '',
    status: 'pending',  
    clubOwner: ownerId,
    members: [],        // empty array for members
  });

  return toClubDTO(club);

  //approveClub()
  //rejectClub()
}
