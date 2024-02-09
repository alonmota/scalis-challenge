'use client';

import React, { useState } from 'react';
import { Button } from '@/components';

const AccountList = () => {
	const [checkingBalance, setCheckingBalance] = useState(0);
	const [savingsBalance, setSavingsBalance] = useState(0);
	const [transferAmount, setTransferAmount] = useState('');
	const [message, setMessage] = useState('');

	const handleTransfer = (from, to) => {
		if (from === 'checking' && checkingBalance < transferAmount) {
			setMessage('Insufficient funds in checking account');
			return;
		}

		if (from === 'savings' && savingsBalance < transferAmount) {
			setMessage('Insufficient funds in savings account');
			return;
		}

		const amount = parseFloat(transferAmount);
		if (isNaN(amount) || amount <= 0) {
			setMessage('Invalid amount');
			return;
		}

		if (from === 'checking') {
			setCheckingBalance(checkingBalance - amount);
			setSavingsBalance(savingsBalance + amount);
		} else {
			setSavingsBalance(savingsBalance - amount);
			setCheckingBalance(checkingBalance + amount);
		}

		setMessage('Transfer successful');
		setTransferAmount('');
	};

	return (
		<div>
			<h2>Checking Account: ${checkingBalance}</h2>
			<h2>Savings Account: ${savingsBalance}</h2>
			<input
				type="number"
				placeholder="Enter amount"
				value={transferAmount}
				onChange={(e) => setTransferAmount(e.target.value)}
			/>
			<Button onClick={() => handleTransfer('checking', 'savings')}>
				Transfer to Savings
			</Button>
			<Button onClick={() => handleTransfer('savings', 'checking')}>
				Transfer to Checking
			</Button>
			{message && <p>{message}</p>}
		</div>
	);
};

export default AccountList;
