const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const { CREATE_DB, POPULATE_DB, COUNT_USERS } = require('./db-scripts.js');
const DB_FILE = process.env.DB_FILE;

// Create a new SQLite3 database instance
const db = new sqlite3.Database(DB_FILE);

db.serialize(() => {
	db.run(CREATE_DB, (err) => {
		if (err) {
			console.error('Error creating tables:', err.message);
			return;
		}

		// Check if users table is empty
		db.get(COUNT_USERS, (err, row) => {
			if (err) {
				console.error('Error checking users table:', err.message);
				return;
			}

			// If users table is empty, insert data
			if (row.count === 0) {
				db.run(POPULATE_DB, (err) => {
					if (err) {
						console.error('Error inserting users:', err.message);
					} else {
						console.log('Users inserted successfully.');
					}
				});
			}
		});
		// Close the database connection
		db.close();
	});
});
