const CREATE_DB = `
CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	savingsBalance NUMBER CHECK(savingsBalance >= 0),
  checkingBalance NUMBER CHECK(checkingBalance >= 0)
);
`;

const COUNT_USERS = `
SELECT COUNT(*) AS count FROM users
`;

const POPULATE_DB = `
INSERT INTO users (name, email, savingsBalance, checkingBalance)
VALUES 
		('John Doe', 'john@example.com', 1500.05, 200),
		('Jane Smith', 'jane@example.com', 300.2, 42000.00)
ON CONFLICT(email) DO NOTHING;
`;

module.exports = {
	CREATE_DB,
	COUNT_USERS,
	POPULATE_DB,
};
