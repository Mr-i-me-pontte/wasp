import React from "react";
import { Collection, useTheme } from "@aws-amplify/ui-react";
import {Card, Table} from "react-bootstrap";
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
const CollectionTableComponent = ({ title, columns, data }) => {
    const { tokens } = useTheme();

    return (
        <div className="p-3">
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
                <Collection
                    isSearchable={true}
                    type="grid" // Changed from "grid" to "list"
                    border={`${tokens.borderWidths.medium} solid ${tokens.colors.red[60]}`}
                    padding="5px"
                    gap="20px"
                    items={data}
                >
                    {(rowData, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.values(rowData).map((value, cellIndex) => (
                                <td key={cellIndex}>{value}</td>
                            ))}
                        </tr>
                    )}
                </Collection>
                </tbody>
            </Table>
        </div>
    );
};

export default CollectionTableComponent;
