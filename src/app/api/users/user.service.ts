import { openDatabase } from '@/db';

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
interface User {
	id: number;
	name: string;
}
