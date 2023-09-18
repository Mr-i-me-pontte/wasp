import React from "react";
import TransactionHeader from "./TransactionHeader";
import TransactionTable from "./TransactionTable";

const withSearch = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: "",
      };
      this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(event) {
      const { value } = event.target;
      this.setState({ searchTerm: value });
    }

    render() {
      const { searchTerm } = this.state;
      return (
        <WrappedComponent
          transactions={this.props.transactions}
          searchTerm={searchTerm}
          handleSearchChange={this.handleSearchChange}
        />
      );
    }
  };
};

const TransactionDashboard = withSearch(
  ({ transactions, searchTerm, handleSearchChange }) => {
    return (
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <div className="container-fluid py-4 px-5">
          <TransactionHeader
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
          />
          <TransactionTable data={transactions} searchTerm={searchTerm} />
        </div>
      </main>
    );
  }
);

export default TransactionDashboard;
