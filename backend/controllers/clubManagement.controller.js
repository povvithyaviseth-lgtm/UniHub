// controller/clubManagementController.js
import { createClub as createClubSvc } from '../services/club.service.js';

/**
 * POST /api/clubs/requests
 * Accepts JSON: { name, description?, location?, time?, imageUrl?, ownerId }
 * Creates a club with status 'pending' and returns it.
 */
export async function createClub(req, res) {
  try {
    const { name = '', description = '', location = '', time = '', ownerId, imageUrl = '' } = req.body;

    if (!name.trim()) {
      return res.status(400).json({ error: 'Club name is required' });
    }

    const clubDto = await createClubSvc(
      { name, description, location, time, imageUrl },
      ownerId
    );

    return res.status(201).json({
      ...clubDto,
      message: 'Club created successfully!',
    });
  } catch (err) {
    return handleError(res, err);
  }
}

/* ---------------- helpers ---------------- */

function handleError(res, err) {
  if (err?.code === 11000) {
    return res.status(409).json({ error: 'Club name already exists' });
  }
  if (err?.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  const msg = err?.message || 'Server error';
  const status = /not found|invalid/i.test(msg) ? 404 : 400;
  return res.status(status).json({ error: msg });
}
