import { NextApiRequest, NextApiResponse } from 'next';
import { CFM, db } from '../../../db/db.model'; // Assuming your `db.model.ts` is in the root directory
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, feedbackSubject, feedbackBody, keywords, status } = req.body;

      // Data validation (optional but recommended)
      if (!name || !feedbackSubject || !feedbackBody || !keywords || !status) {
        return res.status(400).json({ message: 'Missing required fields!' });
      }

      // Create new CFM object
      const newCFM: CFM = {
        name,
        feedbackSubject,
        feedbackBody,
        keywords,
        status,
        createdAt: new Date(), // Add current timestamp
      };

      // Add new entry to the database
      await db.content.add(newCFM);

      // Send success response
      return res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Handle other HTTP methods (GET, PUT, DELETE) if needed
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

export { handler as POST}
