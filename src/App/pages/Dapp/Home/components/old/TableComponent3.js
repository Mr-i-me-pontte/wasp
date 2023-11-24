import React from "react";
import {Card, Row} from "react-bootstrap";
import {Collection,Table, TableRow, TableCell, TableBody } from "@aws-amplify/ui-react";

// InfoCard component to display each row as a card
// const InfoCard = ({ rowData }) => (
//   <Card className="thin-card mb-2">
//     <Row>
//       {Object.values(rowData).map((value, cellIndex) => (
//         <Col key={cellIndex} className="table-cell">
//           {value}
//         </Col>
//       ))}
//     </Row>
//   </Card>
// );
const InfoCard = ({ rowData, rowIndex }) => (
      <TableRow rowData={rowData} rowIndex={rowIndex}>
    {Object.values(rowData).map((value, i) => (
        <td key={i}>{value}</td>
    ))}
      </TableRow>
);

// Main TableComponentWithCollection component
const TableComponentWithCollection = ({ title, columns, data }) => {
  return (
    <Card className="p-3">
      <h3>{title}</h3>
      <Table responsive striped className="table-container">
        <Collection type="list" items={data} isSearchable={true}>
          {(rowData, rowIndex) => <InfoCard key={rowIndex} rowData={rowData} />}
        </Collection>
      </Table>
    </Card>
  );
};

export default TableComponentWithCollection;
