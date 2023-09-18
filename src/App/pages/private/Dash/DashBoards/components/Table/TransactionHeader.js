import React, { useState } from "react";

const TransactionHeader = ({ title, subtitle, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value);
    };

    const radioButtons = [
        { label: "All", id: "btnradiotable1" },
        { label: "Monitored", id: "btnradiotable2" },
        { label: "Unmonitored", id: "btnradiotable3" },
    ];

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
                    {radioButtons.map((button) => (
                        <React.Fragment key={button.id}>
                            <input
                                autoComplete="off"
                                checked={button.label === "All"}
                                className="btn-check"
                                id={button.id}
                                name="btnradiotable"
                                type="radio"
                            />
                            <label
                                className="btn btn-white px-3 mb-0"
                                htmlFor={button.id}
                            >
                                {button.label}
                            </label>
                        </React.Fragment>
                    ))}
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
