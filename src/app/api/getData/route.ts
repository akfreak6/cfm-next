import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../db/db.model';
import { NextResponse } from 'next/server'
const IDBExportImport = require('indexeddb-export-import');

let exportedJsonString: string | undefined;
db.open().then(function() {
  const idbDatabase = db.backendDB();
  IDBExportImport.exportToJsonString(idbDatabase, (err: any, jsonString: string | undefined) => {
    if (err) {
      console.error('Error exporting database:', err);
    } else {
      exportedJsonString = jsonString;
      console.log('Exported as JSON:', exportedJsonString);
    }
  });
}).catch(console.error);
console.log(exportedJsonString);
const GET = async () => {
  try {
    if (exportedJsonString) {
      const feedback = JSON.parse(exportedJsonString);
      return Response.json(feedback);
    } else {
      const feedbacks = await db.getAll();
      return Response.json(feedbacks);
    }
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return Response.json({ error: 'An error occurred while fetching feedbacks.' });
  }
};

export { GET };
