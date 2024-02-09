'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const getHash = () =>
	typeof window !== 'undefined'
		? decodeURIComponent(window.location.hash.replace('#', ''))
		: undefined;

export const useUrlHash = () => {
	const [hash, setHash] = useState(getHash());
	const params = useParams();

	useEffect(() => {
		setHash(getHash());
	}, [params]);

	useEffect(() => {
		const handleHashChange = () => {
			setHash(getHash());
		};
		window.addEventListener('hashchange', handleHashChange);
		window.addEventListener('load', handleHashChange);
		return () => {
			window.removeEventListener('hashchange', handleHashChange);
			window.removeEventListener('load', handleHashChange);
		};
	}, []);

	return hash;
};
