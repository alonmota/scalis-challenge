import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'SCALIS Coding Exercise',
	description: 'SCALIS Coding Exercise',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={inter.className}>
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
}
