const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sales.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the sales database.');
});

db.serialize(() => {
  // Create the sales table
  db.run('CREATE TABLE IF NOT EXISTS sales (id INTEGER PRIMARY KEY AUTOINCREMENT, product_name TEXT NOT NULL, price REAL NOT NULL, payment_type TEXT NOT NULL, payment_status TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
});

module.exports = db;
