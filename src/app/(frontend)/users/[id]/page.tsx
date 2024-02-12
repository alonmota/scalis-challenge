'use client';
import Head from 'next/head';
import { AccountList } from '@/components';
import { APP_DESCRIPTION, APP_NAME } from '@/shared/labels';

interface UsersParams {
	id: string;
}
export default function Users({ params }: { params: UsersParams }) {
	const { id } = params;

	return (
		<div>
			<Head>
				<title>{APP_NAME}</title>
				<meta name="description" content={APP_DESCRIPTION} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<AccountList userId={id} />
			</main>
		</div>
	);
}
