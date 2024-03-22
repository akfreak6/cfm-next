import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { NextRequest, NextResponse } from "next/server";

// Let's initialize it as null initially, and we will assign the actual database instance later.
let db: {
  run(arg0: string, arg1: any[]): unknown; all: (arg0: string) => any; 
} | null = null;

// Define the GET request handler function
export async function GET(req:NextRequest, res:NextResponse) {
  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: "./collection.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  // Perform a database query to retrieve all items from the "items" table
  const items = await db.all("SELECT * FROM items");

  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
export async function POST(req: NextRequest, res: NextResponse) {
  // Check if the database instance is initialized
  if (!db) {
    db = await open({
      filename: "./collection.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    }); // Use the openDB function to establish connection
  }

  // Try parsing the request body as JSON
  try {
    const data = await req.json();
    await db.run("INSERT INTO items (name, feedbackSubject, feedbackBody, keywords, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)", [
      data.name,
      String(data.description),
      String(data.feedbackSubject),
      String(data.feedbackBody),
      JSON.stringify(data.keywords),
      JSON.stringify(data.status),
      data.createdAt.toISOString(),
      data.updatedAt.toISOString()
    ]);

    // Return a success message with status 201 (Created)
    return new Response(JSON.stringify({ message: "Item created successfully" }), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging

    // Return an error message with status 400 (Bad Request)
    return new Response(JSON.stringify({ message: "Error creating item" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
}
export async function openDB() {
  return open({
    filename: '/collection.db',
    driver: sqlite3.Database,
  });
}
