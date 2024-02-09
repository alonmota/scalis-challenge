'use client';
import React, { useState, useEffect } from 'react';

const AccountList = () => {
	const [users, setUsers] = useState([]);
	const [message, setMessage] = useState('');

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch('/api/users');
				if (!response.ok) {
					throw new Error('Failed to fetch users');
				}
				const data = await response.json();
				setUsers(data);
			} catch (error) {
				setMessage(error.message);
			}
		};

		fetchUsers();
	}, []);

	return (
		<div>
			<h2>User List</h2>
			{users.length > 0 ? (
				<ul>
					{users.map((user) => (
						<li key={user.id}>{user.name}</li>
					))}
				</ul>
			) : (
				<p>No users found</p>
			)}
			{message && <p>{message}</p>}
		</div>
	);
};

export default AccountList;
