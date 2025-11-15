import Club from '../models/clubModels.js';
import Student from '../models/studentModels.js';

// all functions related to manipulating clubs
// but not including membership 

// A helper functions that takes plain mongoose data and makes it usable 
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

export async function createClubRequest(payload, ownerId) {
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
    members: [], // membership handled elsewhere
  });

  return toClubDTO(club);
}

export async function approveClub(clubId) {
  const club = await Club.findById(clubId);
  if (!club) throw new Error('Club not found');
  club.status = 'approved';
  await club.save();
  return toClubDTO(club);
}


export async function rejectClub(clubId, reason = '') {
  const club = await Club.findById(clubId);
  if (!club) throw new Error('Club not found');
  club.status = 'rejected';
  // TODO: add club.rejectionReason that sends a notification to the club owner 
  // for why the club was rejected
  await club.save();
  return toClubDTO(club);
}

/** List all pending clubs (add pagination as desired). */
export async function getPendingApprovalClubs({ skip = 0, limit = 20 } = {}) {
  const clubs = await Club.find({ status: 'pending' })
    .sort('-createdAt')
    .skip(skip)
    .limit(limit)
    .lean();
  return clubs.map(toClubDTO);
}

/*
more club service functions
updateClubInfo(clubId, updates, actor)
updateClubImage(clubId, imageUrl, actor)
updateClubOwner()
getClubOwner()
getClubsOwnedBy()
deleteClub() 
*/ 