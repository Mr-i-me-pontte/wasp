```javascript
import React from "react";
import TransactionHeader from "./TransactionHeader";
import TransactionTable from "./TransactionTable";
import {transactions} from "./constants";

const TransactionDashboard = () => {
    return (
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
            <div className="container-fluid py-4 px-5">
                <TransactionHeader/>
                <TransactionTable transactions={transactions}/>
            </div>
        </main>
    );
};

export default TransactionDashboard;
```

```javascript
import React, {useState} from 'react';

const TransactionHeader = ({title, subtitle, onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        const {value} = event.target;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="card-header border-bottom pb-0">
            <div className="d-sm-flex align-items-center mb-3">
                <div>
                    <h6 className="font-weight-semibold text-lg mb-0">{title}</h6>
                    <p className="text-sm mb-sm-0 mb-2">{subtitle}</p>
                </div>
                <div className="ms-auto d-flex">
                    <button className="btn btn-sm btn-white mb-0 me-2" type="button">
                        View report
                    </button>
                    <button
                        className="btn btn-sm btn-dark btn-icon d-flex align-items-center mb-0"
                        type="button"
                    >
                        <span className="btn-inner--icon">
                            <svg
                                className="d-block me-2"
                                fill="none"
                                height="16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                            ></svg>
                        </span>
                        <span className="btn-inner--text">Download</span>
                    </button>
                </div>
            </div>
            <div className="pb-3 d-sm-flex align-items-center">
                <div
                    aria-label="Basic radio toggle button group"
                    className="btn-group"
                    role="group"
                >
                    <input
                        autoComplete="off"
                        checked
                        className="btn-check"
                        id="btnradiotable1"
                        name="btnradiotable"
                        type="radio"
                    />
                    <label className="btn btn-white px-3 mb-0" htmlFor="btnradiotable1">
                        All
                    </label>
                    <input
                        autoComplete="off"
                        className="btn-check"
                        id="btnradiotable2"
                        name="btnradiotable"
                        type="radio"
                    />
                    <label className="btn btn-white px-3 mb-0" htmlFor="btnradiotable2">
                        Monitored
                    </label>
                    <input
                        autoComplete="off"
                        className="btn-check"
                        id="btnradiotable3"
                        name="btnradiotable"
                        type="radio"
                    />
                    <label className="btn btn-white px-3 mb-0" htmlFor="btnradiotable3">
                        Unmonitored
                    </label>
                </div>
                <div className="input-group w-sm-25 ms-auto">
                    <span className="input-group-text text-body">
                        <svg
                            fill="none"
                            height="16px"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            width="16px"
                            xmlns="http://www.w3.org/2000/svg"
                        ></svg>
                    </span>
                    <input
                        className="form-control"
                        onChange={handleSearchChange}
                        placeholder="Search"
                        type="text"
                        value={searchTerm}
                    />
                </div>
            </div>
        </div>
    );
};
export default TransactionHeader;
```

```javascript
import React from "react";
import {transactions} from "./constants";

const TransactionRow = ({transaction}) => {
    return (
        <tr>
            <td>
                <div className="d-flex px-2">
                    <div className="avatar avatar-sm rounded-circle bg-gray-100 me-2 my-2">
                        <img
                            alt={transaction.company}
                            className="w-80"
                            src={transaction.logo}
                        />
                    </div>
                    <div className="my-auto">
                        <h6 className="mb-0 text-sm">{transaction.company}</h6>
                    </div>
                </div>
            </td>
            <td>
                <p className="text-sm font-weight-normal mb-0">
                    {transaction.amount}
                </p>
            </td>
            <td>
                <span className="text-sm font-weight-normal">
                    {transaction.date}
                </span>
            </td>
            <td className="align-middle">
                <div className="d-flex">
                    <div className="border px-1 py-1 text-center d-flex align-items-center border-radius-sm my-auto">
                        <img alt={transaction.card} className="w-90 mx-auto" src={transaction.cardLogo}/>
                    </div>
                    <div className="ms-2">
                        <p className="text-dark text-sm mb-0">{transaction.card}</p>
                        <p className="text-secondary text-sm mb-0">
                            {transaction.cardExpiry}
                        </p>
                    </div>
                </div>
            </td>
            <td className="align-middle">
                <a
                    className="text-secondary font-weight-bold text-xs"
                    data-bs-title="Edit user"
                    data-bs-toggle="tooltip"
                    href="javascript:"
                >
                    <svg
                        fill="none"
                        height="14"
                        viewBox="0 0 15 16"
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                    ></svg>
                </a>
            </td>
        </tr>
    );
};

const TransactionTable = (props) => {
    return (
        <div className="table-responsive p-0">
            <table className="table align-items-center justify-content-center mb-0">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-secondary text-xs font-weight-semibold opacity-7">
                            Transaction
                        </th>
                        <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                            Amount
                        </th>
                        <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                            Date
                        </th>
                        <th className="text-secondary text-xs font-weight-semibold opacity-7 ps-2">
                            Account
                        </th>
                        <th className="text-center text-secondary text-xs font-weight-semibold opacity-7"></th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <TransactionRow key={transaction.id} transaction={transaction}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;

```
