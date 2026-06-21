const { Router } = require('express');
const { getDb } = require('../db');

const router = Router();

router.get('/', (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json([]);

  const db = getDb();
  const results = db.prepare(`
    SELECT m.id, m.name, m.english_name, g.name AS group_name, g.slug AS group_slug
    FROM medicines m
    JOIN groups g ON g.id = m.group_id
    WHERE m.name LIKE ? OR m.english_name LIKE ?
    ORDER BY
      CASE WHEN m.name LIKE ? THEN 0 ELSE 1 END,
      m.name
    LIMIT 20
  `).all(`%${q}%`, `%${q}%`, `${q}%`);

  res.json(results);
});

module.exports = router;
