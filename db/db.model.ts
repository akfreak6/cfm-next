// db.model.ts

import Dexie, { Table } from 'dexie';

// Define the CFM type (adjust as needed)
export interface CFM {
  id?: number;
  name: string;
  feedbackSubject: string;
  feedbackBody: string;
  keywords: string[];
  status: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class DB extends Dexie {
  content!: Table<CFM>; // Table name: content

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      content: '++id, name, feedbackSubject, feedbackBody, keywords, status, createdAt, updatedAt',
    });
  }

  // Implement the getAll method
  async getAll(): Promise<CFM[]> {
    try {
      return await this.content.toArray();
    } catch (error) {
      console.error('Error fetching feedback entries:', error);
      throw error;
    }
  }
}

export const db = new DB();
