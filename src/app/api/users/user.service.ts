import { openDatabase } from '@/db';

interface User {
	id: number;
	name: string;
	savingsBalance: number;
	checkingBalance: number;
}

export async function getUserById(id: string | string[]): Promise<User> {
	const db = await openDatabase();
	return new Promise((resolve, reject) => {
		db.get('SELECT * FROM users WHERE id = ?', [id], (err, row: User) => {
			if (err) {
				reject(err);
			} else {
				resolve(row);
			}
		});
	});
}

export async function depositFunds(
	userId: string | string[],
	value: number,
): Promise<void> {
	const db = await openDatabase();
	return new Promise((resolve, reject) => {
		db.run(
			'UPDATE users SET checkingBalance = checkingBalance + ? WHERE id = ?',
			[value, userId],
			(err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			},
		);
	});
}

export async function transferFunds(
	userId: string | string[],
	to: string,
	value: number,
): Promise<void> {
	const db = await openDatabase();
	return new Promise((resolve, reject) => {
		db.run(
			`UPDATE users SET ${to}Balance = ${to}Balance + ?, checkingBalance = checkingBalance - ? WHERE id = ?`,
			[value, value, userId],
			(err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			},
		);
	});
}

export async function getUsers() {
	return new Promise<User[]>(async (resolve, reject) => {
		const db = await openDatabase();
		db.all('SELECT * FROM users', (err, rows: User[] | undefined) => {
			if (err) {
				reject(err);
			} else {
				if (rows) {
					resolve(rows);
				} else {
					resolve([]);
				}
			}
		});
	});
}
