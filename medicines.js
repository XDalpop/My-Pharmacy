const { Router } = require('express');
const { getDb } = require('../db');

const router = Router();

router.post('/', (req, res) => {
  const {
    name, english_name, who_can_use, treats, contraindications,
    similar_medicines, active_ingredient, dosage, side_effects,
    warnings, notes, group_id
  } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Medicine name is required' });
  }

  const db = getDb();
  const result = db.prepare(`
    INSERT INTO medicines (
      name, english_name, who_can_use, treats, contraindications,
      similar_medicines, active_ingredient, dosage, side_effects,
      warnings, notes, group_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    name.trim(), english_name || null, who_can_use || null, treats || null,
    contraindications || null, similar_medicines || null, active_ingredient || null,
    dosage || null, side_effects || null, warnings || null, notes || null,
    group_id || null
  );

  res.status(201).json({ id: result.lastInsertRowid, name: name.trim() });
});

module.exports = router;
