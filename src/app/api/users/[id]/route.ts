import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { getUserById, depositFunds, transferFunds } from '../user.service';

interface GetUserByIdParams {
	params: {
		id: string;
	};
}
export async function GET(req: NextApiRequest, { params }: GetUserByIdParams) {
	const { id } = params;
	try {
		const users = await getUserById(id);
		return NextResponse.json(users, { status: 200 });
	} catch (error: any) {
		console.error('Failed to fetch users:', error.message);
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}

interface UpdateUserByIdParams {
	params: {
		id: string;
	};
}
interface UpdateUserByIdReqBody {
	type: 'deposit' | 'transfer';
	target: 'checking' | 'saving';
	value: number;
}
export async function POST(req: Request, { params }: UpdateUserByIdParams) {
	const { id } = params;
	const { type, target, value }: UpdateUserByIdReqBody = await req.json();
	try {
		if (type === 'deposit') {
			await depositFunds(id, value);
		} else if (type === 'transfer') {
			await transferFunds(id, target, value);
		} else {
			throw new Error('Invalid type');
		}
		const updatedUser = await getUserById(id);
		return NextResponse.json(updatedUser, { status: 200 });
	} catch (error: any) {
		console.error('Error processing request:', error.message);
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}
