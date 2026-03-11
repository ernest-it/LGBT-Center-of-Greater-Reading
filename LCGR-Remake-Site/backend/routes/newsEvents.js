const express = require('express');
const getDb = require('../database/db');
const authenticate = require('../middleware/auth');
const { validateMaxLength, validateEnum, sanitizeHtml, validateUrl, validateInteger, validateBoolean } = require('../middleware/validate');

const router = express.Router();

/**
 * GET /api/news-events
 * List all active news/events. Optional ?type=news|event filter.
 */
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const { type } = req.query;

    let query = 'SELECT * FROM news_events WHERE is_active = 1';
    const params = [];

    if (type && ['news', 'event'].includes(type)) {
      query += ' AND type = ?';
      params.push(type);
    }

    query += ' ORDER BY date DESC';
    const items = db.prepare(query).all(...params);
    res.json(items);
  } catch (err) {
    console.error('Get news/events error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * GET /api/news-events/:id
 * Get a single news/event by ID.
 */
router.get('/:id', (req, res) => {
  try {
    const db = getDb();
    const item = db.prepare('SELECT * FROM news_events WHERE id = ?').get(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'News/event not found.' });
    }

    res.json(item);
  } catch (err) {
    console.error('Get news/event error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * POST /api/news-events
 * Create a new news/event. Requires authentication.
 */
router.post('/', authenticate, (req, res) => {
  try {
    const { title, description, image_url, date, end_date, type, location, is_featured, is_active } = req.body;

    if (!title || !type) {
      return res.status(400).json({ error: 'title and type are required.' });
    }

    if (!['news', 'event'].includes(type)) {
      return res.status(400).json({ error: 'type must be "news" or "event".' });
    }

    // Input length validation
    const lengthErrors = [
      validateMaxLength(title, 'title', 200),
      validateMaxLength(description, 'description', 5000),
      validateMaxLength(location, 'location', 200),
      validateUrl(image_url, 'image_url'),
      validateBoolean(is_featured, 'is_featured'),
      validateBoolean(is_active, 'is_active'),
    ].filter(Boolean);
    if (lengthErrors.length > 0) {
      return res.status(400).json({ error: lengthErrors[0] });
    }

    const cleanTitle = sanitizeHtml(title);
    const cleanDescription = sanitizeHtml(description);
    const cleanLocation = sanitizeHtml(location);

    const db = getDb();
    const result = db.prepare(`
      INSERT INTO news_events (title, description, image_url, date, end_date, type, location, is_featured, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      cleanTitle,
      cleanDescription || null,
      image_url || null,
      date || null,
      end_date || null,
      type,
      cleanLocation || null,
      is_featured ?? 0,
      is_active ?? 1
    );

    const item = db.prepare('SELECT * FROM news_events WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(item);
  } catch (err) {
    console.error('Create news/event error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * PUT /api/news-events/:id
 * Update an existing news/event. Requires authentication.
 */
router.put('/:id', authenticate, (req, res) => {
  try {
    const db = getDb();
    const existing = db.prepare('SELECT * FROM news_events WHERE id = ?').get(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: 'News/event not found.' });
    }

    const { title, description, image_url, date, end_date, type, location, is_featured, is_active } = req.body;

    if (type && !['news', 'event'].includes(type)) {
      return res.status(400).json({ error: 'type must be "news" or "event".' });
    }

    // Input length validation
    const lengthErrors = [
      validateMaxLength(title, 'title', 200),
      validateMaxLength(description, 'description', 5000),
      validateMaxLength(location, 'location', 200),
      validateUrl(image_url, 'image_url'),
      validateBoolean(is_featured, 'is_featured'),
      validateBoolean(is_active, 'is_active'),
    ].filter(Boolean);
    if (lengthErrors.length > 0) {
      return res.status(400).json({ error: lengthErrors[0] });
    }

    const cleanTitle = title !== undefined ? sanitizeHtml(title) : undefined;
    const cleanDescription = description !== undefined ? sanitizeHtml(description) : undefined;
    const cleanLocation = location !== undefined ? sanitizeHtml(location) : undefined;

    db.prepare(`
      UPDATE news_events SET
        title = ?,
        description = ?,
        image_url = ?,
        date = ?,
        end_date = ?,
        type = ?,
        location = ?,
        is_featured = ?,
        is_active = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      cleanTitle ?? existing.title,
      cleanDescription !== undefined ? cleanDescription : existing.description,
      image_url !== undefined ? image_url : existing.image_url,
      date !== undefined ? date : existing.date,
      end_date !== undefined ? end_date : existing.end_date,
      type ?? existing.type,
      cleanLocation !== undefined ? cleanLocation : existing.location,
      is_featured !== undefined ? is_featured : existing.is_featured,
      is_active !== undefined ? is_active : existing.is_active,
      req.params.id
    );

    const updated = db.prepare('SELECT * FROM news_events WHERE id = ?').get(req.params.id);
    res.json(updated);
  } catch (err) {
    console.error('Update news/event error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * DELETE /api/news-events/:id
 * Delete a news/event. Requires authentication.
 */
router.delete('/:id', authenticate, (req, res) => {
  try {
    const db = getDb();
    const existing = db.prepare('SELECT * FROM news_events WHERE id = ?').get(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: 'News/event not found.' });
    }

    db.prepare('DELETE FROM news_events WHERE id = ?').run(req.params.id);
    res.json({ message: 'News/event deleted successfully.' });
  } catch (err) {
    console.error('Delete news/event error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
