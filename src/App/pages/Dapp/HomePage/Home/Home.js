import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import './styles.scss';
import Hero from "../../components/Hero/Hero";

const Jumbotron = ({children}) => (<div className="Jumbotron"> {children}</div>)

const Main = () => {
    return (
        <div className="homepage-container">
            <Container>
                <Row>
                    <Col>
                        <Jumbotron>
                            <h1 className="text-white">Welcome to DAX</h1>
                            <p className="text-white">
                                This is a simple example of a React-Bootstrap homepage with a trendy and high-tech
                                crypto design.
                            </p>
                            <p>
                                <Button variant="primary">Learn more</Button>
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};


const Home = () => {
    const [cryptoDaxData, setCryptoDaxData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Clitecoin&order=market_cap_desc&per_page=10&page=1&sparkline=false'
            );
            setCryptoDaxData(result.data);
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Jumbotron>
                <Hero/>
                {/*<Container>*/}

                {/*    <h1>Crypto DAX</h1>*/}
                {/*    <p>*/}
                {/*        Here's the current top 10 cryptocurrencies by market capitalization:*/}
                {/*    </p>*/}
                {/*</Container>*/}
            </Jumbotron>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Market Cap</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {cryptoDaxData.map((coin, index) => (
                    <tr key={coin.id}>
                        <td>{index + 1}</td>
                        <td>{coin.name}</td>
                        <td>{coin.symbol}</td>
                        <td>{coin.market_cap}</td>
                        <td>{coin.current_price}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Home;

