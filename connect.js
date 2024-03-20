import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();
// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./collection.db",
  sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

db.serialize(() => {
  // Create the items table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY,
        name TEXT,
        feedbackSubject TEXT,
        feedbackBody TEXT,
        keywords TEXT,
        status TEXT,
        createdAt TEXT,
        updatedAt TEXT
      )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created items table.");

      // Clear the existing data in the products table
      db.run(`DELETE FROM items`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from items");

        // Insert new data into the products table
        const values1 = [
          "akash",
          "Feedback 1",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, enim soluta! Excepturi quo odit voluptatum neque aliquid, deserunt impedit quod.",
          "play,dance,cook",
          "Open",
          "2024-02-22T12:42:17.176Z",
          "nothing null",];
        const insertSql = `INSERT INTO items(name, feedbackSubject, feedbackBody, keywords, status, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?, ?, ?)`;

        db.run(insertSql, values1, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });

        //   Close the database connection after all insertions are done
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log("Closed the database connection.");
        });
      });
    }
  );
});
