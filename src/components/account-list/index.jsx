'use client';
import React, { useState, useEffect } from 'react';

const AccountList = ({ userId }) => {
	const [userData, setUserData] = useState(null);
	const [checkingTransaction, setCheckingTransaction] = useState('');
	const [savingsTransaction, setSavingsTransaction] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(`/api/users/${userId}`);
				if (!response.ok) {
					throw new Error('Failed to fetch user data');
				}
				const userData = await response.json();
				setUserData(userData);
			} catch (error) {
				setErrorMessage(`Error fetching user data: ${error.message}`);
			}
		};

		fetchUserData();
	}, [userId]);

	const handleDeposit = async (account, value) => {
		try {
			const response = await fetch(`/api/users/${userId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ value, type: 'deposit', target: account }),
			});
			if (!response.ok) {
				throw new Error('Failed to deposit funds');
			}
			const userData = await response.json();
			setUserData(userData);
		} catch (error) {
			setErrorMessage(`Error depositing funds: ${error.message}`);
		}
	};

	const handleTransfer = async (toAccount, value) => {
		try {
			const response = await fetch(`/api/users/${userId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ target: toAccount, value, type: 'transfer' }),
			});
			if (!response.ok) {
				throw new Error('Failed to transfer funds');
			}
			const userData = await response.json();
			setUserData(userData);
		} catch (error) {
			setErrorMessage(`Error transferring funds: ${error.message}`);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-4 text-2xl font-bold">
				{userData ? `${userData.name}'s Account Overview` : 'Loading...'}
			</h1>
			{errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
			{userData && (
				<div className="grid grid-cols-2 gap-4">
					<div className="rounded-lg bg-gray-100 p-4 text-gray-700">
						<h2 className="mb-2 text-lg font-semibold">Checking Account</h2>
						<p>Balance: ${userData.checkingBalance}</p>
						<div className="mt-4">
							<input
								type="text"
								value={checkingTransaction}
								onChange={(e) => setCheckingTransaction(e.target.value)}
								className="w-full rounded-md border border-gray-300 px-3 py-2"
								placeholder="Enter transaction amount"
							/>
							<button
								onClick={() =>
									handleDeposit('checking', parseFloat(checkingTransaction))
								}
								className="mr-2 mt-2 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
							>
								Add Funds
							</button>
							<button
								onClick={() =>
									handleTransfer('savings', parseFloat(checkingTransaction))
								}
								className="mt-2 rounded-md bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600"
							>
								Transfer to Savings
							</button>
						</div>
					</div>
					<div className="rounded-lg bg-gray-100 p-4 text-gray-700">
						<h2 className="mb-2 text-lg font-semibold">Savings Account</h2>
						<p>Balance: ${userData.savingsBalance}</p>
						<div className="mt-4">
							<input
								type="text"
								value={savingsTransaction}
								onChange={(e) => setSavingsTransaction(e.target.value)}
								className="w-full rounded-md border border-gray-300 px-3 py-2"
								placeholder="Enter transaction amount"
							/>
							<button
								onClick={() =>
									handleDeposit('savings', parseFloat(savingsTransaction))
								}
								className="mr-2 mt-2 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
							>
								Add Funds
							</button>
							<button
								onClick={() =>
									handleTransfer('checking', parseFloat(savingsTransaction))
								}
								className="mt-2 rounded-md bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600"
							>
								Transfer to Checking
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AccountList;
