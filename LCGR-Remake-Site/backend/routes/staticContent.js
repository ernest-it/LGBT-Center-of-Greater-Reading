const express = require('express');
const getDb = require('../database/db');
const authenticate = require('../middleware/auth');
const { validateMaxLength, validateUrl } = require('../middleware/validate');

const router = express.Router();

/**
 * GET /api/content
 * List all static content entries.
 */
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const content = db.prepare('SELECT * FROM static_content ORDER BY page_name, section_name').all();
    res.json(content);
  } catch (err) {
    console.error('Get content error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * GET /api/content/by-id/:id
 * Get a single content entry by its numeric ID.
 */
router.get('/by-id/:id', (req, res) => {
  try {
    const db = getDb();
    const content = db.prepare('SELECT * FROM static_content WHERE id = ?').get(req.params.id);

    if (!content) {
      return res.status(404).json({ error: 'Content entry not found.' });
    }

    res.json(content);
  } catch (err) {
    console.error('Get content by id error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * GET /api/content/:page_name
 * Get all content sections for a specific page.
 */
router.get('/:page_name', (req, res) => {
  try {
    const db = getDb();
    const content = db.prepare(
      'SELECT * FROM static_content WHERE page_name = ? ORDER BY section_name'
    ).all(req.params.page_name);

    if (content.length === 0) {
      return res.status(404).json({ error: 'No content found for this page.' });
    }

    res.json(content);
  } catch (err) {
    console.error('Get page content error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * GET /api/content/:page_name/:section_name
 * Get a specific content section.
 */
router.get('/:page_name/:section_name', (req, res) => {
  try {
    const db = getDb();
    const content = db.prepare(
      'SELECT * FROM static_content WHERE page_name = ? AND section_name = ?'
    ).get(req.params.page_name, req.params.section_name);

    if (!content) {
      return res.status(404).json({ error: 'Content section not found.' });
    }

    res.json(content);
  } catch (err) {
    console.error('Get section content error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * PUT /api/content/:page_name/:section_name
 * Create or update a content section (upsert). Requires authentication.
 */
router.put('/:page_name/:section_name', authenticate, (req, res) => {
  try {
    const { text_content, image_url } = req.body;
    const { page_name, section_name } = req.params;

    if (text_content === undefined && image_url === undefined) {
      return res.status(400).json({ error: 'text_content or image_url is required.' });
    }

    // Input length validation
    const lengthErrors = [
      validateMaxLength(page_name, 'page_name', 50),
      validateMaxLength(section_name, 'section_name', 100),
      validateMaxLength(text_content, 'text_content', 50000),
      validateUrl(image_url, 'image_url'),
    ].filter(Boolean);
    if (lengthErrors.length > 0) {
      return res.status(400).json({ error: lengthErrors[0] });
    }

    const db = getDb();

    // Check if this entry already exists
    const existing = db.prepare(
      'SELECT * FROM static_content WHERE page_name = ? AND section_name = ?'
    ).get(page_name, section_name);

    if (existing) {
      // Update: only update fields that were explicitly provided
      const updatedText = text_content !== undefined ? text_content : existing.text_content;
      const updatedImage = image_url !== undefined ? (image_url || null) : existing.image_url;
      db.prepare(`
        UPDATE static_content SET
          text_content = ?,
          image_url = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE page_name = ? AND section_name = ?
      `).run(updatedText, updatedImage, page_name, section_name);
    } else {
      db.prepare(`
        INSERT INTO static_content (page_name, section_name, text_content, image_url)
        VALUES (?, ?, ?, ?)
      `).run(page_name, section_name, text_content ?? null, image_url || null);
    }

    const content = db.prepare(
      'SELECT * FROM static_content WHERE page_name = ? AND section_name = ?'
    ).get(page_name, section_name);

    res.json(content);
  } catch (err) {
    console.error('Upsert content error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
