const express = require('express');
const getDb = require('../database/db');
const authenticate = require('../middleware/auth');
const { validateMaxLength } = require('../middleware/validate');

const router = express.Router();

/**
 * GET /api/team
 * List all active team members. Optional ?type=staff|board filter.
 */
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const { type } = req.query;

    let query = 'SELECT * FROM team_members WHERE is_active = 1';
    const params = [];

    if (type && ['staff', 'board'].includes(type)) {
      query += ' AND member_type = ?';
      params.push(type);
    }

    query += ' ORDER BY display_order ASC';
    const members = db.prepare(query).all(...params);
    res.json(members);
  } catch (err) {
    console.error('Get team error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * GET /api/team/:id
 * Get a single team member by ID.
 */
router.get('/:id', (req, res) => {
  try {
    const db = getDb();
    const member = db.prepare('SELECT * FROM team_members WHERE id = ?').get(req.params.id);

    if (!member) {
      return res.status(404).json({ error: 'Team member not found.' });
    }

    res.json(member);
  } catch (err) {
    console.error('Get team member error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * POST /api/team
 * Create a new team member. Requires authentication.
 */
router.post('/', authenticate, (req, res) => {
  try {
    const { name, title, bio, image_url, display_order, is_active, member_type } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'name is required.' });
    }

    if (member_type && !['staff', 'board'].includes(member_type)) {
      return res.status(400).json({ error: 'member_type must be "staff" or "board".' });
    }

    // Input length validation
    const lengthErrors = [
      validateMaxLength(name, 'name', 100),
      validateMaxLength(title, 'title', 100),
      validateMaxLength(bio, 'bio', 5000),
    ].filter(Boolean);
    if (lengthErrors.length > 0) {
      return res.status(400).json({ error: lengthErrors[0] });
    }

    const db = getDb();
    const result = db.prepare(`
      INSERT INTO team_members (name, title, bio, image_url, display_order, is_active, member_type)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      name,
      title || null,
      bio || null,
      image_url || null,
      display_order ?? 0,
      is_active ?? 1,
      member_type || 'staff'
    );

    const member = db.prepare('SELECT * FROM team_members WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(member);
  } catch (err) {
    console.error('Create team member error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * PUT /api/team/:id
 * Update an existing team member. Requires authentication.
 */
router.put('/:id', authenticate, (req, res) => {
  try {
    const db = getDb();
    const existing = db.prepare('SELECT * FROM team_members WHERE id = ?').get(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: 'Team member not found.' });
    }

    const { name, title, bio, image_url, display_order, is_active, member_type } = req.body;

    if (member_type && !['staff', 'board'].includes(member_type)) {
      return res.status(400).json({ error: 'member_type must be "staff" or "board".' });
    }

    // Input length validation
    const lengthErrors = [
      validateMaxLength(name, 'name', 100),
      validateMaxLength(title, 'title', 100),
      validateMaxLength(bio, 'bio', 5000),
    ].filter(Boolean);
    if (lengthErrors.length > 0) {
      return res.status(400).json({ error: lengthErrors[0] });
    }

    db.prepare(`
      UPDATE team_members SET
        name = ?,
        title = ?,
        bio = ?,
        image_url = ?,
        display_order = ?,
        is_active = ?,
        member_type = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      name ?? existing.name,
      title !== undefined ? title : existing.title,
      bio !== undefined ? bio : existing.bio,
      image_url !== undefined ? image_url : existing.image_url,
      display_order ?? existing.display_order,
      is_active !== undefined ? is_active : existing.is_active,
      member_type ?? existing.member_type,
      req.params.id
    );

    const updated = db.prepare('SELECT * FROM team_members WHERE id = ?').get(req.params.id);
    res.json(updated);
  } catch (err) {
    console.error('Update team member error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * DELETE /api/team/:id
 * Delete a team member. Requires authentication.
 */
router.delete('/:id', authenticate, (req, res) => {
  try {
    const db = getDb();
    const existing = db.prepare('SELECT * FROM team_members WHERE id = ?').get(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: 'Team member not found.' });
    }

    db.prepare('DELETE FROM team_members WHERE id = ?').run(req.params.id);
    res.json({ message: 'Team member deleted successfully.' });
  } catch (err) {
    console.error('Delete team member error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
