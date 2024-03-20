const { connectToDb } = require('./db');

async function createTable(tableName, schema) {
  const db = await connectToDb();
  await new Promise((resolve, reject) => {
    db.run(`CREATE TABLE IF NOT EXISTS <span class="math-inline">\{tableName\} \(</span>{schema})`, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

async function insertData(tableName, data) {
  const db = await connectToDb();
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);
  const query = `INSERT INTO <span class="math-inline">\{tableName\} \(</span>{Object.keys(data).join(', ')}) VALUES (${placeholders})`;
  return new Promise((resolve, reject) => {
    db.run(query, values, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(db.lastID); // Return the ID of the inserted row
    });
  });
}

// Implement similar functions for read, update, and delete operations

module.exports = { createTable, insertData, /* ... other CRUD functions */ };
