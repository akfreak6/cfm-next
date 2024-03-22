import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();

let db;

export function connectToDb() {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    db = new sqlite.Database('/collection.db', (err) => {
      if (err) {
        reject(err);
        return;
      }

      console.log('Connected to SQLite database');
      resolve(db);
    });
  });
}

export async function createTable(tableName, schema) {
  const db = await connectToDb();
  await new Promise((resolve, reject) => {
    db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export async function insertData(tableName, data) {
  const db = await connectToDb();
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);
  const query = `INSERT INTO ${tableName} (${Object.keys(data).join(', ')}) VALUES (${placeholders})`;
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

export async function getData(tableName, whereClause = '') {
  const db = await connectToDb();
  const query = `SELECT * FROM ${tableName} ${whereClause}`;
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

export async function updateData(tableName, data, whereClause) {
  const db = await connectToDb();
  const updates = Object.keys(data).map((key) => `${key} = ?`);
  const values = Object.values(data);
  const query = `UPDATE ${tableName} SET ${updates.join(', ')} WHERE ${whereClause}`;
  return new Promise((resolve, reject) => {
    db.run(query, values, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true); // Indicate successful update
    });
  });
}

export async function deleteData(tableName, whereClause) {
  const db = await connectToDb();
  const query = `DELETE FROM ${tableName} WHERE ${whereClause}`;
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true); // Indicate successful deletion
    });
  });
}

