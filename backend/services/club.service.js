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

/* ======================================================================= */
/*                           MEMBERSHIP SERVICES                           */
/* ======================================================================= */

/**
 * Join a club (no approval needed).
 * Returns { membership, action }
 *  - action: 'joined' | 'rejoined' | 'already-member'
 *
 * Throws:
 *  - Error('Club not found')
 *  - Error('Club not approved')
 */
export async function joinClubForStudentService(studentId, clubId) {
  const club = await Club.findById(clubId);
  if (!club) {
    throw new Error('Club not found');
  }

  if (club.status !== 'approved') {
    throw new Error('Club not approved');
  }

  let membership = await ClubMembership.findOne({
    student: studentId,
    club: clubId,
  });

  if (membership) {
    if (membership.status === 'active') {
      return { membership, action: 'already-member' };
    }

    // Previously left – reactivate
    membership.status = 'active';
    membership.joinedAt = new Date();
    membership.leftAt = null;
    await membership.save();

    return { membership, action: 'rejoined' };
  }

  // New membership
  membership = await ClubMembership.create({
    student: studentId,
    club: clubId,
    status: 'active',
    joinedAt: new Date(),
  });

  return { membership, action: 'joined' };
}

/**
 * Leave a club (soft delete membership).
 *
 * Returns membership if found.
 * Throws:
 *  - Error('Membership not found')
 */
export async function leaveClubForStudentService(studentId, clubId) {
  const membership = await ClubMembership.findOne({
    student: studentId,
    club: clubId,
    status: 'active',
  });

  if (!membership) {
    throw new Error('Membership not found');
  }

  membership.status = 'left';
  membership.leftAt = new Date();
  await membership.save();

  return membership;
}

/**
 * Get all clubs that student is actively a member of.
 *
 * Returns: Array<Club>
 */
export async function getJoinedClubsForStudentService(studentId) {
  const memberships = await ClubMembership.find({
    student: studentId,
    status: 'active',
  }).populate('club');

  const clubs = memberships.map((m) => m.club).filter(Boolean);
  return clubs;
}