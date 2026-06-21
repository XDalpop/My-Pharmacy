const { Router } = require('express');
const groupsRouter = require('./groups');
const medicinesRouter = require('./medicines');
const searchRouter = require('./search');
const { getDb } = require('../db');

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

  const recent = db.prepare(`
    SELECT m.*, g.name AS group_name, g.slug AS group_slug
    FROM medicines m
    JOIN groups g ON g.id = m.group_id
    ORDER BY m.created_at DESC
    LIMIT 6
  `).all();

  const filter = req.query.group || null;
  let filtered = null;
  if (filter) {
    const group = db.prepare('SELECT * FROM groups WHERE slug = ?').get(filter);
    if (group) {
      filtered = {
        group,
        medicines: db.prepare(`
          SELECT m.*, g.name AS group_name, g.slug AS group_slug
          FROM medicines m
          JOIN groups g ON g.id = m.group_id
          WHERE g.slug = ?
          ORDER BY m.created_at DESC
        `).all(filter)
      };
    }
  }

  res.render('index', { groups, recent, filtered });
});

router.get('/add-medicine', (req, res) => {
  const db = getDb();
  const groups = db.prepare('SELECT * FROM groups ORDER BY name').all();
  res.render('add-medicine', { groups });
});

router.get('/medicine/:id', (req, res) => {
  const db = getDb();
  const medicine = db.prepare(`
    SELECT m.*, g.name AS group_name, g.slug AS group_slug
    FROM medicines m
    JOIN groups g ON g.id = m.group_id
    WHERE m.id = ?
  `).get(req.params.id);

  if (!medicine) return res.status(404).send('Medicine not found');
  res.render('medicine', { medicine });
});

router.use('/api/groups', groupsRouter);
router.use('/api/medicines', medicinesRouter);
router.use('/api/search', searchRouter);

module.exports = router;
