const CREATE_DB = `
CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE
);
`;

const COUNT_USERS = `
SELECT COUNT(*) AS count FROM users
`;

const POPULATE_DB = `
INSERT INTO users (name, email)
VALUES 
		('John Doe', 'john@example.com'),
		('Jane Smith', 'jane@example.com')
ON CONFLICT(email) DO NOTHING;
`;

module.exports = {
	CREATE_DB,
	COUNT_USERS,
	POPULATE_DB,
};
