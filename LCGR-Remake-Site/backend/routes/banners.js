const express = require('express');
const getDb = require('../database/db');
const authenticate = require('../middleware/auth');
const { validateMaxLength, sanitizeHtml, validateUrl, validateInteger, validateBoolean } = require('../middleware/validate');

const router = express.Router();

/**
 * GET /api/banners
 * List all active banners. Optional ?page_section= filter.
 */
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const { page_section } = req.query;

    let query = 'SELECT * FROM banners WHERE is_active = 1';
    const params = [];

    if (page_section) {
      query += ' AND page_section = ?';
      params.push(page_section);
    }

    query += ' ORDER BY display_order ASC';
    const banners = db.prepare(query).all(...params);
    res.json(banners);
  } catch (err) {
    console.error('Get banners error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * GET /api/banners/:id
 * Get a single banner by ID.
 */
router.get('/:id', (req, res) => {
  try {
    const db = getDb();
    const banner = db.prepare('SELECT * FROM banners WHERE id = ?').get(req.params.id);

    if (!banner) {
      return res.status(404).json({ error: 'Banner not found.' });
    }

    res.json(banner);
  } catch (err) {
    console.error('Get banner error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * POST /api/banners
 * Create a new banner. Requires authentication.
 */
router.post('/', authenticate, (req, res) => {
  try {
    const { page_section, image_url, alt_text, link_url, display_order, is_active } = req.body;

    if (!page_section || !image_url) {
      return res.status(400).json({ error: 'page_section and image_url are required.' });
    }

    // Input length validation
    const lengthErrors = [
      validateMaxLength(page_section, 'page_section', 50),
      validateMaxLength(alt_text, 'alt_text', 255),
      validateMaxLength(link_url, 'link_url', 500),
      validateUrl(image_url, 'image_url'),
      validateUrl(link_url, 'link_url'),
      validateInteger(display_order, 'display_order'),
      validateBoolean(is_active, 'is_active'),
    ].filter(Boolean);
    if (lengthErrors.length > 0) {
      return res.status(400).json({ error: lengthErrors[0] });
    }

    const cleanAltText = sanitizeHtml(alt_text);

    const db = getDb();
    const result = db.prepare(`
      INSERT INTO banners (page_section, image_url, alt_text, link_url, display_order, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      page_section,
      image_url,
      cleanAltText || null,
      link_url || null,
      display_order ?? 0,
      is_active ?? 1
    );

    const banner = db.prepare('SELECT * FROM banners WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(banner);
  } catch (err) {
    console.error('Create banner error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * PUT /api/banners/:id
 * Update an existing banner. Requires authentication.
 */
router.put('/:id', authenticate, (req, res) => {
  try {
    const db = getDb();
    const existing = db.prepare('SELECT * FROM banners WHERE id = ?').get(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: 'Banner not found.' });
    }

    const { page_section, image_url, alt_text, link_url, display_order, is_active } = req.body;

    // Input length validation
    const lengthErrors = [
      validateMaxLength(page_section, 'page_section', 50),
      validateMaxLength(alt_text, 'alt_text', 255),
      validateMaxLength(link_url, 'link_url', 500),
      validateUrl(image_url, 'image_url'),
      validateUrl(link_url, 'link_url'),
      validateInteger(display_order, 'display_order'),
      validateBoolean(is_active, 'is_active'),
    ].filter(Boolean);
    if (lengthErrors.length > 0) {
      return res.status(400).json({ error: lengthErrors[0] });
    }

    const cleanAltText = alt_text !== undefined ? sanitizeHtml(alt_text) : existing.alt_text;

    db.prepare(`
      UPDATE banners SET
        page_section = ?,
        image_url = ?,
        alt_text = ?,
        link_url = ?,
        display_order = ?,
        is_active = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      page_section ?? existing.page_section,
      image_url ?? existing.image_url,
      cleanAltText,
      link_url !== undefined ? link_url : existing.link_url,
      display_order ?? existing.display_order,
      is_active !== undefined ? is_active : existing.is_active,
      req.params.id
    );

    const updated = db.prepare('SELECT * FROM banners WHERE id = ?').get(req.params.id);
    res.json(updated);
  } catch (err) {
    console.error('Update banner error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * DELETE /api/banners/:id
 * Delete a banner. Requires authentication.
 */
router.delete('/:id', authenticate, (req, res) => {
  try {
    const db = getDb();
    const existing = db.prepare('SELECT * FROM banners WHERE id = ?').get(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: 'Banner not found.' });
    }

    db.prepare('DELETE FROM banners WHERE id = ?').run(req.params.id);
    res.json({ message: 'Banner deleted successfully.' });
  } catch (err) {
    console.error('Delete banner error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
