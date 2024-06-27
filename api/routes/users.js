const express = require('express');
const router = express.Router();
const db = require('../database');

// 获取所有用户
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).json({ data: null, error: err.message });
      return;
    }
    res.json({
      code: 0,
      data: {
        items: rows,
        total: rows.length,
      },
      message: 'success',
    });
  });
});

// 获取单个用户信息
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ data: null, error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({
      code: 0,
      data: row,
      message: 'success',
    });
  });
});

// 更新用户信息
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, mobile, countryCode } = req.body;

  const sql = `
    UPDATE users
    SET name = ?, email = ?, mobile = ?, countryCode = ?
    WHERE id = ?
  `;

  db.run(sql, [name, email, mobile, countryCode, userId], function (err) {
    if (err) {
      res.status(500).json({ data: null, error: err.message });
      return;
    }
    res.json({
      code: 0,
      data: userId,
      message: 'success',
    });
  });
});

module.exports = router;
