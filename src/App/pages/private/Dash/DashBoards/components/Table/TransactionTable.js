import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPen, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import spotify from "../../../../../../assets/img/small-logos/logo-spotify.svg";
import linvision from "../../../../../../assets/img/small-logos/logo-invision.svg";
import jira from "../../../../../../assets/img/small-logos/logo-jira.svg";
import slack from "../../../../../../assets/img/small-logos/logo-slack.svg";
import visa from "../../../../../../assets/img/theme/visa.png";
import mastercard from "../../../../../../assets/img/theme/mastercard.png";

const transactions = [
  {
    id: 1,
    logo: spotify,
    company: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
    cardType: "visa",
    cardLogo: visa,
    cardNumber: "Visa 1234",
    cardExpiry: "Expiry 06/2026",
  },
  {
    id: 2,
    logo: linvision,
    company: "Invision",
    amount: "$5,000",
    date: "Wed 1:00pm",
    cardType: "mastercard",
    cardLogo: mastercard,
    cardNumber: "Mastercard 1234",
    cardExpiry: "Expiry 06/2026",
  },
  {
    id: 3,
    logo: jira,
    company: "Jira",
    amount: "$3,400",
    date: "Mon 7:40pm",
    cardType: "mastercard",
    cardNumber: "Mastercard 1234",
    cardExpiry: "Expiry 06/2026",
    cardLogo: mastercard,
  },
  {
    id: 4,
    logo: slack,
    company: "Slack",
    amount: "$1,000",
    date: "Wed 5:00pm",
    cardType: "visa",
    cardNumber: "Visa 1234",
    cardExpiry: "Expiry 06/2026",
    cardLogo: visa,
  },
];

const DownloadIcon = () => (
  <FontAwesomeIcon icon={faDownload} className="me-2" />
);
const SearchIcon = () => <FontAwesomeIcon icon={faSearch} />;
const EditIcon = () => <FontAwesomeIcon icon={faPen} />;
const TransactionRow = ({ transaction }) => (
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
      <p className="text-sm font-weight-normal mb-0">{transaction.amount}</p>
    </td>
    <td>
      <span className="text-sm font-weight-normal">{transaction.date}</span>
    </td>
    <td className="align-middle">
      <div className="d-flex">
        <div className="border px-1 py-1 text-center d-flex align-items-center border-radius-sm my-auto">
          <img
            alt={transaction.cardType}
            className="w-90 mx-auto"
            src={transaction.cardLogo}
          />
        </div>
        <div className="ms-2">
          <p className="text-dark text-sm mb-0">
            {transaction.cardType} {transaction.cardNumber}
          </p>
          <p className="text-secondary text-sm mb-0">
            Expiry {transaction.cardExpiry}
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
        <EditIcon />
      </a>
    </td>
  </tr>
);

const TransactionTable = () => {
  const [selectedRadio, setSelectedRadio] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  const handleRadioChange = (event) => setSelectedRadio(event.target.value);
  const handleSearchChange = (event) => setSearchValue(event.target.value);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.company.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="card shadow-xs border">
      <div className="card-header border-bottom pb-0">
        <div className="d-sm-flex align-items-center mb-3">
          <div>
            <h6 className="font-weight-semibold text-lg mb-0">
              Recent transactions
            </h6>
            <p className="text-sm mb-sm-0 mb-2">
              These are details about the last transactions
            </p>
          </div>
          <div className="ms-auto d-flex">
            <button className="btn btn-sm btn-white mb-0 me-2" type="button">
              View report
            </button>
            <button
              className="btn btn-sm         btn-dark btn-icon d-flex align-items-center mb-0"
              type="button"
            >
              <span className="btn-inner--icon">
                <DownloadIcon />
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
              checked={selectedRadio === "All"}
              className="btn-check"
              id="btnradiotable1"
              name="btnradiotable"
              type="radio"
              value="All"
              onChange={handleRadioChange}
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
              value="Monitored"
              onChange={handleRadioChange}
            />
            <label
              className="btn btn-white px-3 mb-0"
              htmlFor="btnradiototable2"
            >
              Monitored
            </label>
            <input
              autoComplete="off"
              className="btn-check"
              id="btnradiotable3"
              name="btnradiotable"
              type="radio"
              value="Unmonitored"
              onChange={handleRadioChange}
            />
            <label className="btn btn-white px-3 mb-0" htmlFor="btnradiotable3">
              Unmonitored
            </label>
          </div>
          <div className="input-group w-sm-25 ms-auto">
            <span className="input-group-text text-body">
              <SearchIcon />
            </span>
            <input
              className="form-control"
              placeholder="Search"
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <div className="card-body px-0 py-0">
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
              {filteredTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
