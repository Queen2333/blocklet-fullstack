const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 设置数据库文件路径
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// 初始化数据库表
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      mobile TEXT,
      countryCode TEXT
    )
  `);
});

module.exports = db;
