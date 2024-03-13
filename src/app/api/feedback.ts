// ... other imports
import {db} from "./../../../db/db.model"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Process incoming content data from request body
      const contentData = req.body;

      // Store or handle the content data as needed
      // ... (e.g., store in a database, send to a third-party service)

      res.status(200).json({ success: true, message: 'Content added successfully' });
    } catch (error) {
      console.error('Error handling POST request:', error);
      res.status(500).json({ error: 'Failed to add content' });
    }
  } else if (req.method === 'GET') {
    try {
      // Fetch content data from IndexedDB using db.getAll()
      const content = await db.getAll();

      return Response.json(content);
    } catch (error) {
      console.error('Error loading content:', error);
      res.status(500).json({ error: 'Failed to load content' });
    }
  } else {
    res.status(405).end(); // Handle unauthorized methods
  }
}
