import Dexie, { Table } from "dexie";
// table inteface
export interface CFM {
	id?: number;
	name: string;
  feedbackSubject: string;
	feedbackBody: string;
	keywords: string[];
	status: string[];
  createdAt?: Date; // timestamp for tracking creation
  updatedAt?: Date; // timestamp for tracking updates
}
export class DB extends Dexie {
	content!: Table<CFM>; // table name student
	constructor() {
		super("myDatabase");
		this.version(1).stores({
			content: "++id, name, feedbackSubject, feedbackBody, keywords, status, createdAt, updatedAt",
		});
	}
}
export const db = new DB();
