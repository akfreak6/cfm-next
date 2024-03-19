// ... other imports
import { db } from "./../../../db/db.model";
import { type NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

async function POST(response: Response, request: Request) {
	try {
		// Process incoming content data from request body
		const contentData = request.body;

		// Store or handle the content data as needed
		// ... (e.g., store in a database, send to a third-party service)

		NextResponse.json(
			{ success: true, message: "Content added successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error handling POST request:", error);
		NextResponse.json({ error: "Failed to add content" }, { status: 500 });
	}
}
export async function GET(request: Request) {
	{
		try {
			// Fetch content data from IndexedDB using db.getAll()
			const content = await db.getAll();

			return NextResponse.json(content);
		} catch (error) {
			console.error("Error loading content:", error);
			NextResponse.json({ error: "Failed to load content" }, { status: 500 });
		}
	}
}
