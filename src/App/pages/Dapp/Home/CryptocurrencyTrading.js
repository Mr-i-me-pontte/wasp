import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

function CryptocurrencyTrading() {
    return (
        <div>
            <header>
                <h1 className="text-center">Hello World Dapp Home</h1>
            </header>
            <Container>
                <Row className="mt-5">
                    <Col md={3}>
                        <h2>Token List</h2>
                        <Table striped bordered>
                            <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Value</th>
                                <th>Variation %</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>BTC</td>
                                <td>45000</td>
                                <td>+2.5%</td>
                            </tr>
                            <tr>
                                <td>ETH</td>
                                <td>3000</td>
                                <td>-1.2%</td>
                            </tr>
                            <tr>
                                <td>LTC</td>
                                <td>150</td>
                                <td>+0.8%</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col md={7}>
                        <h2>Graph</h2>
                        {/* Add your TradingView chart here */}
                    </Col>
                    <Col md={2}>
                        <h2>Order Book</h2>
                        <Table striped bordered>
                            <thead>
                            <tr>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>44999</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>45001</td>
                                <td>3</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h2>Order History</h2>
                        <Table striped bordered>
                            <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>45000</td>
                                <td>2</td>
                                <td>Filled</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>44999</td>
                                <td>1</td>
                                <td>Open</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CryptocurrencyTrading;
