const { Router } = require('express');
const { getDb } = require('../db');
const slugify = require('slugify');

const router = Router();

router.get('/', (req, res) => {
  const db = getDb();
  const groups = db.prepare(`
    SELECT g.*, COUNT(m.id) AS medicine_count
    FROM groups g
    LEFT JOIN medicines m ON m.group_id = g.id
    GROUP BY g.id
    ORDER BY g.name
  `).all();
  res.json(groups);
});

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Group name is required' });
  }
  const db = getDb();
  const slug = slugify(name.trim(), { lower: true });
  try {
    const result = db.prepare('INSERT INTO groups (name, slug) VALUES (?, ?)').run(name.trim(), slug);
    res.status(201).json({ id: result.lastInsertRowid, name: name.trim(), slug });
  } catch (e) {
    if (e.message.includes('UNIQUE')) {
      res.status(409).json({ error: 'Group already exists' });
    } else {
      res.status(500).json({ error: e.message });
    }
  }
});

module.exports = router;
