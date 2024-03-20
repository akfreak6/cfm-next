import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { NextRequest, NextResponse } from "next/server";

// Let's initialize it as null initially, and we will assign the actual database instance later.
let db: { all: (arg0: string) => any; } | null = null;

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
