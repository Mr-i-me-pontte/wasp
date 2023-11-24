import React from "react";
import { Card, Table } from "react-bootstrap";
import {
  Collection,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@aws-amplify/ui-react";
import "./styles.scss";

const InfoRow = ({ rowData, isHeader }) => (
  <TableRow className={"row d-flex"}>
    {Object.values(rowData).map((value, i) => (
      <TableCell
        as={isHeader ? "th" : "td"}
        key={i}
        className={"table-striped-columns col"}
      >
        <div className="cell-content table-striped-columns">{value}</div>
      </TableCell>
    ))}
  </TableRow>
);

const TableComponentWithCollection = ({
  title,
  columns,
  data,
  isSearchable = true
}) => {
  const allData = [columns, ...data];

  const renderHeader = () => (
    <TableHead>
      <InfoRow rowData={columns} isHeader={true} />
    </TableHead>
  );

  return (
    // <Card className="p-3">
    //   <Card.Body>
    //     <Card.Title>{title}</Card.Title>
    <div className="table-responsive">
      <div className="header-container">
        <Table className="table table-striped">
          {!isSearchable && renderHeader()}
        </Table>
      </div>
      <div className="table-body-container">
        <Table className="table table-striped">
          <TableBody>
            <Collection type="list" items={allData} isSearchable={isSearchable}>
              {(rowData, rowIndex) => (
                <InfoRow
                  key={rowIndex}
                  rowData={rowData}
                  isHeader={rowIndex === 0}
                />
              )}
            </Collection>
          </TableBody>
        </Table>
      </div>
    </div>
    // </Card.Body>
    // </Card>
  );
};

const TableComponent = ({ title, columns, data }) => (
  <Card className="p-3">
    <h3>{title}</h3>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, index) => (
          <tr key={index}>
            {Object.values(rowData).map((value, i) => (
              <td key={i}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  </Card>
);

export default TableComponentWithCollection;
