'use client';
import Head from 'next/head';
import { AccountList } from '@/components';

export default function Home() {
	return (
		<div>
			<Head>
				<title>My Banking App</title>
				<meta name="description" content="My Banking App" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>Welcome to My Banking App</h1>
				<AccountList />
			</main>
		</div>
	);
}
