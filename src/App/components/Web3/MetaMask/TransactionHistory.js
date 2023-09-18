import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import withReducer from '../../../utils/Redux';
import { initialState, metamaskReducer } from './reducer';
import { getTransactionHistory } from '../helpers';

const TransactionHistory = ({ state, dispatch }) => {
    const { activeWallet } = state;

    useEffect(() => {
        const fetchTransactions = async () => {
            const history = await getTransactionHistory(activeWallet.address);
            dispatch({ type: 'SET_TRANSACTIONS', payload: history });
        };

        if (activeWallet.address) {
            fetchTransactions();
        }
    }, [activeWallet]);

    return (
        <div>
            <h3>Transaction History</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Recipient</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {state.transactions.map((transaction) => (
                    <tr key={transaction.hash}>
                        <td>{new Date(transaction.timeStamp * 1000).toLocaleString()}</td>
                        <td>{transaction.value}</td>
                        <td>{transaction.to}</td>
                        <td>{transaction.isConfirmed ? 'Confirmed' : 'Pending'}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default withReducer(metamaskReducer, initialState)(TransactionHistory);
