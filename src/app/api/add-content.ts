import * as sqlite3 from 'sqlite3'; // Import with type for better type safety

export default async function POST(req: any, res: any) {
  // Type the request body for better type checking
  const content: {
    name?: string;
    feedbackSubject?: string;
    feedbackBody?: string;
    keywords?: string[];
    status?: string[];
  } = JSON.parse(req.body);

  try {
    const db = new sqlite3.Database('./my-database.db');

    // Type the prepared statement parameters for improved type safety
    const stmt = await new Promise<sqlite3.Statement>((resolve, reject) => {
      db.prepare(
        'INSERT INTO items (name, feedbackSubject, feedbackBody, keywords, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
        (err: any, statement: sqlite3.Statement | PromiseLike<sqlite3.Statement>) => {
          if (err) {
            reject(err);
            console.error;
            return;
          }
          resolve(statement);
        }
      );
    });

    await stmt.run(
      [
        content?.name,
        String(content?.feedbackSubject),
        String(content?.feedbackBody),
        JSON.stringify(content.keywords),
        JSON.stringify(content.status),
        new Date().toISOString(),
        new Date().toISOString(),
      ],
      (err) => {
        if (err) {
          console.error("Error adding content to SQLite:", err);
          res.status(500).json({ message: 'Error adding content!' });
          return;
        }
      }
    );

    stmt.finalize();
    db.close();

    res.status(200).json({ message: 'Content added successfully!' });
  } catch (error) {
    console.error("Error adding content to SQLite:", error);
    res.status(500).json({ message: 'Error adding content!' });
  }
}
