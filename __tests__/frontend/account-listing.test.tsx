import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AccountList from '@/components/account-list';

import fetchMock from 'jest-fetch-mock';

describe('AccountList', () => {
	beforeEach(() => {
		// Enable fetch mocking
		fetchMock.enableMocks();
		// Mock the response
		fetchMock.mockResponseOnce(
			JSON.stringify({
				name: 'John Doe',
				checkingBalance: 100,
				savingsBalance: 200,
			}),
		);
	});

	afterEach(() => {
		fetchMock.resetMocks();
	});

	test('renders loading message initially', async () => {
		const { getByText } = render(<AccountList userId="123" />);
		expect(getByText('Loading...')).toBeInTheDocument();
		await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
	});

	test('renders user account details after data fetch', async () => {
		const { getByTestId } = render(<AccountList userId="123" />);
		await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
		expect(getByTestId('user-name-header')).toBeInTheDocument();
		expect(getByTestId('saving-balance')).toBeInTheDocument();
		expect(getByTestId('saving-balance')).toHaveTextContent('Balance: $200');
		expect(getByTestId('checking-balance')).toBeInTheDocument();
		expect(getByTestId('checking-balance')).toHaveTextContent('Balance: $100');
	});

	test('handles deposit to checking account', async () => {
		const { getByTestId } = render(<AccountList userId="123" />);
		await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

		fireEvent.change(getByTestId('checking-transaction-input'), {
			target: { value: '50' },
		});
		fireEvent.click(getByTestId('deposit-checking-button'));

		await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
		expect(fetchMock).toHaveBeenCalledWith('/api/users/123', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ value: 50, type: 'deposit', target: 'checking' }),
		});
	});

	test('handles deposit to savings account', async () => {
		const { getByTestId } = render(<AccountList userId="123" />);
		await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

		fireEvent.change(getByTestId('savings-transaction-input'), {
			target: { value: '50' },
		});
		fireEvent.click(getByTestId('deposit-savings-button'));

		await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
		expect(fetchMock).toHaveBeenCalledWith('/api/users/123', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ value: 50, type: 'deposit', target: 'savings' }),
		});
	});

	test('handles transfer between accounts', async () => {
		const { getByTestId } = render(<AccountList userId="123" />);
		await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

		// Set a transaction amount
		fireEvent.change(getByTestId('checking-transaction-input'), {
			target: { value: '50' },
		});
		fireEvent.click(getByTestId('transfer-to-savings-button'));

		// Ensure the correct fetch request is made
		await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
		expect(fetchMock).toHaveBeenCalledWith('/api/users/123', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ target: 'savings', value: 50, type: 'transfer' }),
		});
	});
});
