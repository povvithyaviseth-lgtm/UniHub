// services/membership.service.js
import Club from '../models/club.model.js';
import ClubMembership from '../models/membership.model.js';

/**
 * Join a club (no approval needed).
 * Returns { membership, action }
 *  - action: 'joined' | 'already-member'
 *
 * Throws:
 *  - Error('Club not found')
 *  - Error('Club not approved')
 */
export async function joinClubService(studentId, clubId) {
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
    return { membership, action: 'already-member' };
  }

  // New membership
  membership = await ClubMembership.create({
    student: studentId,
    club: clubId,
    joinedAt: new Date(),
  });

  return { membership, action: 'joined' };
}

/**
 * Leave a club (hard delete membership).
 *
 * Returns membership if found.
 * Throws:
 *  - Error('Membership not found')
 */
export async function leaveClubService(studentId, clubId) {
  const membership = await ClubMembership.findOneAndDelete({
    student: studentId,
    club: clubId,
  });

  if (!membership) {
    throw new Error('Membership not found');
  }

  return membership;
}

/**
 * Get all clubs that student is actively a member of.
 *
 * Returns: Array<Club>
 */
export async function getJoinedClubsService(studentId) {
  const memberships = await ClubMembership.find({
    student: studentId,
  }).populate('club');

  const clubs = memberships.map((m) => m.club).filter(Boolean);
  return clubs;
}

export async function getMembersService(clubId) {
  const club = await Club.findById(clubId);
  if (!club) {
    throw new Error('Club not found');
  }

  const memberships = await ClubMembership.find({
    club: clubId,
  }).populate('student'); // assuming "student" ref is set in schema

  const members = memberships.map((m) => m.student).filter(Boolean);
  return members;
}

export async function kickMemberService(ownerId, clubId, memberId) {
  // 1. Verify club exists
  const club = await Club.findById(clubId);
  if (!club) {
    throw new Error('Club not found');
  }

  // 2. Verify that the caller is the club owner
  // 🔁 If your Club schema uses a different field for owner, change `club.owner` here.
  if (String(club.owner) !== String(ownerId)) {
    throw new Error('Not authorized');
  }

  // 3. Delete membership for that specific student in this club
  const membership = await ClubMembership.findOneAndDelete({
    club: clubId,
    student: memberId,
  });

  if (!membership) {
    throw new Error('Membership not found');
  }

  return membership;
}