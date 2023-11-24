import React from "react";
import Card from "react-bootstrap/Card";
import {
    Collection,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead
} from "@aws-amplify/ui-react";

const InfoRow = ({ rowData, isHeader }) => (
    <TableRow className={"row d-flex"}>
        {Object.values(rowData).map((value, i) => (
            <TableCell as={isHeader ? "th" : "td"} key={i} className={"table-striped-columns col"}>
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
        <Card className="p-3">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <div className="table-responsive">
                    <Table className="table table-striped">
                        {!isSearchable && renderHeader()}
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
            </Card.Body>
        </Card>
    );
};

export default TableComponentWithCollection;
