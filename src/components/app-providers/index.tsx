'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/state/store';

export default function AppProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
