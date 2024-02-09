import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { getUsers } from './user.service';

interface User {
	id: number;
	name: string;
}

export async function GET(req: NextApiRequest) {
	try {
		const users = await getUsers();
		return NextResponse.json(users, { status: 200 });
	} catch (error: any) {
		console.error('Failed to fetch users:', error.message);
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
