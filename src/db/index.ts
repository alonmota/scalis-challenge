import sqlite3 from 'sqlite3';

const DB_FILE = process.env.DB_FILE;

let db: sqlite3.Database | null = null;

// Open the SQLite database connection
export async function openDatabase() {
	if (!DB_FILE) throw new Error('Please provide a DB_FILE path on your .env');
	if (!db) {
		db = new sqlite3.Database(DB_FILE);
	}
	return db;
}

// Close the database connection
export async function closeDatabase() {
	if (db) {
		db.close();
		db = null;
	}
}
