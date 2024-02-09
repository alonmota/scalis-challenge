import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components';
import { APP_DESCRIPTION, APP_NAME } from '@/shared/labels';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: APP_NAME,
	description: APP_DESCRIPTION,
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
