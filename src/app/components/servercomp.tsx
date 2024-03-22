// /* eslint-disable import/no-anonymous-default-export */
// import { NextRequest, NextResponse } from "next/server";
// import { openDB } from "../api/route";

// export default async (req: NextRequest, res: NextResponse) => {
//   const { id, name, feedbackSubject, feedbackBody, keywords, status, createdAt, updatedAt } = req.body;
//   try {
//     const db = await openDB();
//     await db.run('UPDATE items SET name = ?, feedbackSubject = ?, feedbackBody = ?, keywords = ?, status = ?, createdAt = ?, updatedAt = ? where id = ?',  id, name, feedbackSubject, feedbackBody, keywords, status, createdAt, updatedAt);
//     res.status(200).json({ message: 'Item updated successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }
